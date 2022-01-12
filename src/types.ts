import { TextInputProps as TextInputPropsRN, TextStyle } from "react-native";
import { StyleProp, ViewStyle } from "react-native";

import {
  PickerProps as PickerPropsRN,
  PickerItemProps as PickerItemPropsRN,
} from "@react-native-picker/picker";

import { ComponentTypes } from "@huds0n/components";

export declare namespace Types {
  export type Falsy = false | undefined | null;
  export type OptionalFunction = Function | Falsy;

  export type ValidationError = Falsy | string | true;
  export type ValidationFunction<T> = (value: T) => ValidationError;
  export type Validator<T> =
    | null
    | ValidationFunction<T>
    | ValidationFunction<T>[];

  export type Event<T> = (value: T, error: ValidationError) => any;
  export type OptionalEvent<T> = Event<T> | Falsy;

  export type InputProps<T = any, P extends Object = {}> = {
    autoFocus?: boolean;
    customError?: ValidationError;
    disabled?: boolean;
    disabledStyle?: TextStyle;
    disableSubmit?: boolean;
    downPress?: OptionalFunction;
    errorStyle?: TextStyle;
    isRequired?: ValidationError;
    onBlur?: OptionalEvent<T>;
    onErrorChange?: (error: ValidationError) => any;
    onFocus?: OptionalEvent<T>;
    onSubmitEditing?: OptionalEvent<T>;
    onValueChange?: Event<T>;
    setIsFocused?: (isFocused: boolean) => void;
    style?: TextStyle;
    upPress?: OptionalFunction;
    validator?: Validator<T>;
    value: T;
  } & P;

  export type TextInputProps = InputProps<
    string,
    Omit<
      TextInputPropsRN,
      "editable" | "onBlur" | "onFocus" | "onSubmitEditing"
    >
  >;

  export type CustomInputProps<T, P extends {}> = {
    inputContainerStyle?: ViewStyle;
    outputContainerStyle?: ViewStyle;
  } & Omit<InputProps<T>, "style"> &
    P;

  export type CustomInputSubComponentProps<T, P extends Object> = Omit<
    InputProps<T>,
    "onValueChange" | "style"
  > & {
    closeInput: () => void;
    error: ValidationError;
    openInput: () => void;
    isFocused: boolean;
    onValueChange: (value: T) => void;
  } & P;

  export type CustomInputSubComponent<
    T,
    P extends Object
  > = React.ComponentType<CustomInputSubComponentProps<T, P>>;

  export type CustomInputComponent<
    T,
    P extends Object
  > = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<CustomInputProps<T, P>> &
      React.RefAttributes<InputRefType>
  >;

  export type PickItemProps<T = any> = PickerItemPropsRN<T> & {
    placeholder?: string;
    value: T;
  };

  export type PickerSpecficProps<T> = {
    disabledPlaceholderStyle?: TextStyle;
    errorPlaceholderStyle?: TextStyle;
    nullable?: boolean;
    nullPlaceholderStyle?: TextStyle;
    nullLabel?: string;
    pickerItems: PickItemProps<T>[];
    placeholderStyle?: TextStyle;
  } & Omit<
    PickerPropsRN,
    | "enabled"
    | "onValueChange"
    | "selectedValue"
    | "value"
    | "onFocus"
    | "onBlur"
  >;

  export type PickerProps<T = any> = CustomInputProps<T, PickerSpecficProps<T>>;

  export type DatePickerMinuteInterval =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 10
    | 12
    | 15
    | 20
    | 30;
  export type DatePickerMode = "date" | "time";
  export type DatePickerWebInputFormat = "DD" | "MM" | "YYYY" | "HH" | "mm";

  export type FormatDisplayFn = (
    date: Date,
    locale: string,
    mode: DatePickerMode
  ) => string;

  export type DatePickerSpecficProps = {
    disabledPlaceholderStyle?: TextStyle;
    errorPlaceholderStyle?: TextStyle;
    formatDisplayDate?: FormatDisplayFn;
    locale?: string;
    maximumDate?: Date;
    minimumDate?: Date;
    minuteInterval?: DatePickerMinuteInterval;
    mode?: DatePickerMode;
    nullLabel?: string;
    nullPlaceholderStyle?: TextStyle;
    placeholderStyle?: TextStyle;
    webInputFormat?: DatePickerWebInputFormat;
    invalidDateError?: string;
    value: Date | null;
  };

  export type DatePickerProps = CustomInputProps<
    Date | null,
    DatePickerSpecficProps
  >;

  export type InputWrapperChangingStyle<S extends ViewStyle> = {
    base?: S;
    error?: S;
    focused?: S;
    hasValue?: S;
    custom?: Record<
      string,
      (props: {
        error: ValidationError;
        isFocused: boolean;
        hasValue: boolean;
      }) => S
    >;
  };

  export type InputWrapperAnimatedStyle<S extends ViewStyle> =
    InputWrapperChangingStyle<S> & {
      animate: {
        duration?: number;
        easing?: (value: number) => number;
        useNativeDriver?: boolean;
      };
      baseAnim: S;
      errorAnim?: S;
      focusedAnim?: S;
      hasValueAnim?: S;
      customAnim?: Record<
        string,
        (props: {
          error: ValidationError;
          isFocused: boolean;
          hasValue: boolean;
        }) => S
      >;
    };

  export type InputWrapperStyle<S extends ViewStyle> =
    | S
    | InputWrapperChangingStyle<S>
    | InputWrapperAnimatedStyle<S>;

  export type InputWrapperProps = {
    children: React.ReactNode | React.ReactNode[];
    containerStyle?: InputWrapperStyle<ViewStyle>;
    contentsContainerStyle?: InputWrapperStyle<ViewStyle>;
    contentsWrapperStyle?: InputWrapperStyle<ViewStyle>;
    customState?: string;
    error?: ValidationError;
    isFocused?: boolean;
    message?: string;
    messageContainerStyle?: InputWrapperStyle<ViewStyle>;
    messageStyle?: InputWrapperStyle<TextStyle>;
    messageWrapperStyle?: InputWrapperStyle<ViewStyle>;
    onPress?: () => any;
    title?: string;
    titleContainerStyle?: InputWrapperStyle<TextStyle>;
    titleStyle?: InputWrapperStyle<TextStyle>;
    useNativeDriver?: boolean;
    value?: any;
  };

  export type InputFieldProps = InputWrapperProps & {
    icon?: ComponentTypes.IconProps;
    focus?: () => any;
  };

  export type AccessoryViewStyle = {
    containerStyle?: StyleProp<ViewStyle>;
    iconDismiss?: ComponentTypes.IconProps;
    iconDown?: ComponentTypes.IconProps;
    iconSubmit?: ComponentTypes.IconProps;
    iconUp?: ComponentTypes.IconProps;
  };

  export type InputManagerProps = {
    accessoryView?: AccessoryViewStyle;
    children: React.ReactNode | React.ReactNode[];
    focusedNodePadding?: number;
    inputColors?: { background: string; contents: string };
  };

  export type AccessoryViewProps = {
    downPress: OptionalFunction;
    submitPress: OptionalFunction;
    upPress: OptionalFunction;
  };

  export type UseInputProps<T> = {
    defaultValue: T;
    defaultError?: ValidationError;
    onErrorChange?: (error: ValidationError) => any;
    onValueChange?: (value: T, error: ValidationError) => any;
  };

  export type InputRefType = { focus: () => any };

  export type UseInputResult<
    T = string,
    R extends InputRefType = InputRefType
  > = {
    customError: ValidationError;
    error: ValidationError;
    focus: () => any;
    isModified: boolean;
    isFocused: boolean;
    onErrorChange: (error: ValidationError) => void;
    onValueChange: (value: T, error: ValidationError) => void;
    ref: React.RefObject<R>;
    revert: () => void;
    setCustomError: (error: ValidationError) => void;
    setIsFocused: (isFocused: boolean) => void;
    setValue: (value: T) => void;
    value: T;
    fieldProps: {
      error: ValidationError;
      focus: () => any;
      isFocused: boolean;
      value: T;
    };
  };
}
