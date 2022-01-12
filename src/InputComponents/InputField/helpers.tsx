import { Text, TextStyle, View, ViewStyle } from "react-native";

import { AnimatedText, AnimatedView } from "@huds0n/animations";

import type { Types } from "../../types";

function isAnimatedStyle<S extends ViewStyle>(
  style: Types.InputWrapperStyle<S>
): style is Types.InputWrapperAnimatedStyle<S> {
  return !!(style as Types.InputWrapperAnimatedStyle<S>).animate;
}

function isChangingStyle<S extends ViewStyle>(
  style: Types.InputWrapperStyle<S>
): style is Types.InputWrapperChangingStyle<S> {
  return (
    !isAnimatedStyle(style) &&
    !!(style as Types.InputWrapperChangingStyle<S>).base
  );
}

export function getHasValue(value: any) {
  return value !== null && value !== undefined && value !== "";
}

export const InputSubcomponent = (props: {
  children: any;
  customState?: string;
  error?: Types.ValidationError;
  isFocused?: boolean;
  onPress?: () => any;
  style?: Types.InputWrapperStyle<TextStyle>;
  type: "TEXT" | "VIEW";
  value?: any;
}) => {
  const {
    children,
    customState,
    error = false,
    isFocused = false,
    onPress,
    style = {},
    value,
    type,
  } = props;

  const AnimatedComponent = type === "TEXT" ? AnimatedText : AnimatedView;
  const Component = type === "TEXT" ? Text : View;

  const hasValue = getHasValue(value);

  if (isAnimatedStyle(style)) {
    const componentStyle = {
      ...style.base,
      ...style.baseAnim,
      ...(hasValue && style.hasValue),
      ...(error && style.error),
      ...(isFocused && style.focused),
      ...(customState &&
        style.custom?.[customState] &&
        style.custom?.[customState]({
          error,
          hasValue,
          isFocused,
        })),
    };

    const componentAnim = {
      ...style.baseAnim,
      ...(hasValue && style.hasValueAnim),
      ...(error && style.errorAnim),
      ...(isFocused && style.focusedAnim),
      ...(customState &&
        style.customAnim?.[customState] &&
        style.customAnim?.[customState]({
          error,
          hasValue,
          isFocused,
        })),
    };

    return (
      <AnimatedComponent
        {...(onPress && {
          onStartShouldSetResponder: () => true,
          onResponderStart: () => onPress(),
        })}
        animate={{
          to: componentAnim,
          duration: style.animate.duration,
          easing: style.animate.easing,
        }}
        style={componentStyle}
        useNativeDriver={style.animate.useNativeDriver}
      >
        {children}
      </AnimatedComponent>
    );
  }

  if (isChangingStyle(style)) {
    return (
      // @ts-ignore
      <Component
        {...(onPress && {
          onStartShouldSetResponder: () => true,
          onResponderStart: () => onPress(),
        })}
        style={{
          ...style.base,
          ...(hasValue && style.hasValue),
          ...(error && style.error),
          ...(isFocused && style.focused),
          ...(customState &&
            style.custom?.[customState] &&
            style.custom?.[customState]({
              error,
              hasValue,
              isFocused,
            })),
        }}
      >
        {children}
      </Component>
    );
  }

  return (
    // @ts-ignore
    <Component
      {...(onPress && {
        onStartShouldSetResponder: () => true,
        onResponderStart: () => onPress(),
      })}
      style={style}
    >
      {children}
    </Component>
  );
};
