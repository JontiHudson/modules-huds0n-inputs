import { TextInput } from 'react-native';

import { useCallback, useRef, useState } from '@huds0n/utilities';

import { InputManager } from '../InputManager';
import { RefType, Validation } from '../types';

namespace Hooks {
  export type Options<T> = {
    defaultValue: T;
    defaultError?: Validation.Error;
    onErrorChange?: (error: Validation.Error) => any;
    onValueChange?: (value: T, error: Validation.Error) => any;
  };

  export type Result<T = string, R extends RefType = RefType> = {
    customError: Validation.Error;
    error: Validation.Error;
    focus: () => any;
    isModified: boolean;
    onErrorChange: (error: Validation.Error) => void;
    onValueChange: (value: T, error: Validation.Error) => void;
    ref: React.RefObject<R>;
    revert: () => void;
    setCustomError: (error: Validation.Error) => void;
    setValue: (value: T) => void;
    value: T;
  };
}

function useInput<T, R extends RefType = RefType>(
  options: Hooks.Options<T>,
): Hooks.Result<T, R> {
  const ref = useRef<R>(null);
  const [customError, setCustomError] = useState<Validation.Error>(
    options.defaultError,
  );
  const [error, setError] = useState<Validation.Error>(undefined);
  const [value, setValue] = useState(options.defaultValue);

  const revert = useCallback(() => {
    setValue(options.defaultValue);
  });

  const focus = useCallback(() => {
    ref.current?.focus();
  });

  const onErrorChange = useCallback((newError: Validation.Error) => {
    setError(newError);
    options.onErrorChange?.(newError);
  });

  const onValueChange = useCallback((newValue: T, error: Validation.Error) => {
    setValue(newValue);
    options.onValueChange?.(newValue, error);
  });

  return {
    customError,
    error,
    focus,
    isModified: value !== options.defaultValue,
    onErrorChange,
    onValueChange,
    ref,
    revert,
    setCustomError,
    setValue,
    value,
  };
}

export namespace useTextInput {
  export type Options = Partial<Hooks.Options<string>>;
  export type Result = Hooks.Result<string, TextInput>;
}

export function useTextInput(
  options?: useTextInput.Options,
): useTextInput.Result {
  return useInput({
    defaultValue: '',
    ...options,
  });
}

export namespace usePickerInput {
  export type Options<I> = Partial<Hooks.Options<I | null>>;
  export type Result<I> = Hooks.Result<I | null, RefType>;
}

export function usePickerInput<I>(
  options?: usePickerInput.Options<I>,
): usePickerInput.Result<I> {
  return useInput({
    defaultValue: null,
    ...options,
  });
}

export namespace useDateTimeInput {
  export type Options = Partial<Hooks.Options<Date | null>>;
  export type Result = Hooks.Result<Date | null, RefType>;
}

export function useDateTimeInput(
  options?: useDateTimeInput.Options,
): useDateTimeInput.Result {
  return useInput({
    defaultValue: null,
    ...options,
  });
}

export function useForm(...args: Hooks.Result<any, any>[]) {
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
