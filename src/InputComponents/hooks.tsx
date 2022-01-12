import { TextInput } from "react-native";

import { useCallback, useRef, useState } from "@huds0n/utilities";

import { InputManager } from "../InputManager";
import type { Types } from "../types";

function useInput<T, R extends Types.InputRefType = Types.InputRefType>(
  options: Types.UseInputProps<T>
): Types.UseInputResult<T, R> {
  const ref = useRef<R>(null);
  const [customError, setCustomError] = useState<Types.ValidationError>(
    options.defaultError
  );
  const [error, setError] = useState<Types.ValidationError>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(options.defaultValue);

  const revert = useCallback(() => {
    setValue(options.defaultValue);
  });

  const focus = useCallback(() => {
    ref.current?.focus();
  });

  const onErrorChange = useCallback((newError: Types.ValidationError) => {
    setError(newError);
    options.onErrorChange?.(newError);
  });

  const onValueChange = useCallback(
    (newValue: T, error: Types.ValidationError) => {
      setValue(newValue);
      options.onValueChange?.(newValue, error);
    }
  );

  return {
    customError,
    error,
    focus,
    isModified: value !== options.defaultValue,
    isFocused,
    onErrorChange,
    onValueChange,
    ref,
    revert,
    setCustomError,
    setIsFocused,
    setValue,
    value,
    fieldProps: {
      error,
      focus,
      isFocused,
      value,
    },
  };
}

export function useTextInput(
  options?: Partial<Types.UseInputProps<string>>
): Types.UseInputResult<string, TextInput> {
  return useInput({
    defaultValue: "",
    ...options,
  });
}

export function usePickerInput<I>(
  options?: Partial<Types.UseInputProps<I | null>>
): Types.UseInputResult<I | null> {
  return useInput({
    defaultValue: null,
    ...options,
  });
}

export function useDateTimeInput(
  options?: Partial<Types.UseInputProps<Date | null>>
): Types.UseInputResult<Date | null> {
  return useInput({
    defaultValue: null,
    ...options,
  });
}

export function useForm(...args: Types.UseInputResult<any, any>[]) {
  args.forEach((element, i) => {
    // @ts-ignore
    if (i) element.upPress = args[i - 1]?.focus;
    // @ts-ignore
    if (i < args.length - 1) element.downPress = args[i + 1]?.focus;
  });

  const isError = args.some((element) => element.error);
  const isModified = args.some((element) => element.isModified);

  const validChanges = isModified && !isError;

  const valueArray = args.map((element) => element.value);
  const errorArray = args.map((element) => element.error);

  const revertAll = useCallback(() => {
    InputManager.dismiss();
    args.forEach((element) => element.revert());
  });

  return {
    errorArray,
    isError,
    isModified,
    revertAll,
    validChanges,
    valueArray,
  };
}
