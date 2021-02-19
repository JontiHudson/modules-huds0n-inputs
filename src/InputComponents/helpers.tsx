import { useCallback, useEffect, useState } from '@huds0n/utilities';

import { CommonInputProps, Validation } from '../types';

export namespace getValidationError {
  export type Validation<T> = Validation.Prop<T>;
  export type Error = Validation.Error;
}

export function getValidationError<T = any>(
  value: T,
  validation: getValidationError.Validation<T>,
): getValidationError.Error {
  if (!validation) {
    return false;
  }

  if (Array.isArray(validation)) {
    for (const validator of validation) {
      const error = validator(value);

      if (error) {
        return error;
      }
    }

    return false;
  }

  return validation(value);
}

export function handleValueValidation<T = any>(props: CommonInputProps<T>) {
  const { customError, onValueChange, value, validation } = props;
  const [error, setError] = useState<Validation.Error>(undefined);

  useEffect(
    () => {
      setError(handleValidation(props, value));
    },
    [customError, value, validation],
    { layout: 'BEFORE' },
  );

  const _onValueChange = useCallback(
    (newValue: T) => {
      const newError = handleValidation(props, newValue);
      setError(newError);
      onValueChange && onValueChange?.(newValue, newError);
    },
    [onValueChange],
  );

  return { error, onValueChange: _onValueChange };
}

function handleValidation<T = any>(
  { customError, isRequired, onErrorChange, validation }: CommonInputProps<T>,
  value: T,
): Validation.Error {
  if (customError) {
    onErrorChange?.(customError);
    return customError;
  }

  // @ts-ignore
  const nullish = value === null || value === undefined || value === '';

  if (nullish && isRequired) {
    onErrorChange?.(isRequired);
    return typeof isRequired === 'string' ? isRequired : 'Required';
  }

  if (nullish || !validation) {
    onErrorChange?.(undefined);
    return;
  }

  const validationError = getValidationError(value, validation);

  onErrorChange?.(validationError);
  return validationError;
}

export function handleFieldInputAware<T = any>(props: CommonInputProps) {
  const [error, setError] = useState<Validation.Error>(undefined);
  const [isFocused, setFocused] = useState(false);

  const onErrorChange = useCallback(
    (newError: Validation.Error) => {
      setError(newError);
      props.onErrorChange && props.onErrorChange?.(newError);
    },
    [props.onErrorChange],
  );

  const onBlur = useCallback(
    (value: T, error: Validation.Error) => {
      setFocused(false);
      props.onBlur && props.onBlur?.(value, error);
    },
    [props.onBlur],
  );

  const onFocus = useCallback(
    (value: T, error: Validation.Error) => {
      setFocused(true);
      props.onFocus && props.onFocus?.(value, error);
    },
    [props.onFocus],
  );

  return {
    fieldProps: { error, isFocused },
    inputProps: { onErrorChange, onBlur, onFocus },
  };
}
