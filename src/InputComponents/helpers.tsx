import { useCallback, useEffect, useState } from "@huds0n/utilities";

import type { Types } from "../types";

export function getValidatorError<T = any>(
  value: T,
  validator: Types.Validator<T>
): Types.ValidationError {
  if (!validator) {
    return false;
  }

  if (Array.isArray(validator)) {
    for (const v of validator) {
      const error = v(value);

      if (error) {
        return error;
      }
    }

    return false;
  }

  return validator(value);
}

export function handleValueValidation<T = any>(props: Types.InputProps<T>) {
  const { customError, onValueChange, value, validator } = props;
  const [error, setError] = useState<Types.ValidationError>(undefined);

  useEffect(
    () => {
      setError(handleValidation(props, value));
    },
    [customError, value, validator],
    { layout: "BEFORE" }
  );

  const _onValueChange = useCallback(
    (newValue: T) => {
      const newError = handleValidation(props, newValue);
      setError(newError || customError);
      onValueChange && onValueChange?.(newValue, newError || customError);
    },
    [onValueChange, customError]
  );

  return { error, onValueChange: _onValueChange };
}

function handleValidation<T = any>(
  { customError, isRequired, onErrorChange, validator }: Types.InputProps<T>,
  value: T
): Types.ValidationError {
  if (customError) {
    onErrorChange?.(customError);
    return customError;
  }

  // @ts-ignore
  const nullish = value === null || value === undefined || value === "";

  if (nullish && isRequired) {
    onErrorChange?.(isRequired);
    return typeof isRequired === "string" ? isRequired : "Required";
  }

  if (nullish || !validator) {
    onErrorChange?.(undefined);
    return;
  }

  const validationError = getValidatorError(value, validator);

  onErrorChange?.(validationError);
  return validationError;
}

export function handleFieldInputAware<T = any>(props: Types.InputProps<T>) {
  const [error, setError] = useState<Types.ValidationError>(undefined);
  const [isFocused, setFocused] = useState(false);

  const onErrorChange = useCallback(
    (newError: Types.ValidationError) => {
      setError(newError);
      props.onErrorChange && props.onErrorChange?.(newError);
    },
    [props.onErrorChange]
  );

  const onBlur = useCallback(
    (value: T, error: Types.ValidationError) => {
      setFocused(false);
      props.onBlur && props.onBlur?.(value, error);
    },
    [props.onBlur]
  );

  const onFocus = useCallback(
    (value: T, error: Types.ValidationError) => {
      setFocused(true);
      props.onFocus && props.onFocus?.(value, error);
    },
    [props.onFocus]
  );

  return {
    fieldProps: { error, isFocused },
    inputProps: { onErrorChange, onBlur, onFocus },
  };
}
