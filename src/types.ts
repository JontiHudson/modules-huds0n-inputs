import { TextStyle } from 'react-native';
import { StyleProp, ViewStyle } from 'react-native';

import { Icon } from '@huds0n/components';

export type Falsy = false | undefined | null;
export type OptionalFunction = Function | Falsy;

export type Event<T> = (value: T, error: Validation.Error) => any;
export type OptionalEvent<T> = Event<T> | Falsy;

export type RefType = { focus: () => any };

export namespace Validation {
  export type Error = Falsy | string | true;

  export type Function<T> = (value: T) => Error;
  export type Prop<T> = null | Function<T> | Function<T>[];
}

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
  onValueChange?: Event<T>;
  style?: TextStyle;
  upPress?: OptionalFunction;
  validation?: Validation.Prop<T>;
  value: T;
};

export type AccessoryViewProps = {
  containerStyle?: StyleProp<ViewStyle>;
  iconDismiss?: Icon.Props;
  iconDown?: Icon.Props;
  iconSubmit?: Icon.Props;
  iconUp?: Icon.Props;
};

export type InputManagerProps = {
  accessoryView?: AccessoryViewProps;
  children: React.ReactNode | React.ReactNode[];
  focusedNodePadding?: number;
  inputColors?: { background: string; contents: string };
};

export type AccessoryViewMethods = {
  downPress: OptionalFunction;
  submitPress: OptionalFunction;
  upPress: OptionalFunction;
};

export type FocusedInput = {
  id: number | string;
  type: 'KEYBOARD' | 'CUSTOM';
};

export type CustomInput<P = any> = {
  Component?: React.ComponentType<P>;
  props: P;
};

export type InputState = {
  accessoryView: AccessoryViewMethods;
  customInput: CustomInput | null;
  focusedInput: FocusedInput | null;
};
