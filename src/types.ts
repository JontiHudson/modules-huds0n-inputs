import { TextStyle } from 'react-native';

export type Falsy = false | undefined | null;
export type OptionalFunction = Function | Falsy;

export namespace Validation {
  export type Error = Falsy | string | true;

  export type Function<T> = (value: T) => Error;
  export type Prop<T> = null | Function<T> | Function<T>[];
}

export type Event<T> = (value: T, error: Validation.Error) => any;

export type RefType = { focus: () => any };

type OptionalEvent<T> = Event<T> | undefined | false;

export type CommonInputProps<T = any> = {
  autoFocus?: boolean;
  customError?: Validation.Error;
  disabled?: boolean;
  disabledStyle?: TextStyle;
  disableSubmit?: boolean;
  downPress?: OptionalFunction;
  errorStyle?: TextStyle;
  isRequired?: Validation.Error;
  onBlur?: OptionalEvent<T>;
  onErrorChange?: (error: Validation.Error) => any;
  onFocus?: OptionalEvent<T>;
  onSubmitEditing?: OptionalEvent<T>;
  onValueChange: Event<T>;
  style?: TextStyle;
  upPress?: OptionalFunction;
  validation?: Validation.Prop<T>;
  value: T;
};
