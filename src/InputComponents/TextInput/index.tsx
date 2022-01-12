import React from "react";
import {
  Platform,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput as TextInputRN,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
} from "react-native";

import { useIsDarkMode } from "@huds0n/theming";
import { useCopyRef, useEffect, useMemo } from "@huds0n/utilities";

import { INPUT_ACCESSORY_VIEW_ID } from "../../InputAccessoryViewIOS";
import * as InputState from "../../state";
import type { Types } from "../../types";

import { handleValueValidation } from "../helpers";

import {
  defaultStyles,
  handleAndroidBlurOnKeyboardHide,
  getSubmitPress,
} from "./helpers";

export const TextInput = React.forwardRef<TextInputRN, Types.TextInputProps>(
  (props, ref) => {
    const {
      clearTextOnFocus,
      disabled,
      disabledStyle,
      disableSubmit,
      downPress,
      errorStyle,
      multiline,
      onBlur,
      onChange,
      onChangeText,
      onFocus,
      onSubmitEditing,
      setIsFocused,
      style,
      upPress,
      ...restProps
    } = props;

    const isDark = useIsDarkMode();
    const textInputRef = useCopyRef(ref);

    const { error, onValueChange } = handleValueValidation(props);

    handleAndroidBlurOnKeyboardHide(textInputRef);

    useEffect(() => {
      if (InputState.isFocused(textInputRef)) {
        InputState.updateAccessoryView({
          downPress,
          upPress,
          submitPress: getSubmitPress(props, error),
        });
      }
    }, [downPress, upPress, onSubmitEditing, error]);

    const handleLifecycle = useMemo(
      () => ({
        onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
          const {
            nativeEvent: { text },
          } = e;

          onChange?.(e);
          onChangeText?.(text);
          onValueChange?.(text);
        },
        onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          InputState.focusTextInput(textInputRef, {
            downPress,
            upPress,
            submitPress: getSubmitPress(props, error),
          });
          clearTextOnFocus && onValueChange("");
          onFocus && onFocus(e.nativeEvent.text, error);
          setIsFocused?.(true);
        },
        onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
          onBlur && onBlur(e.nativeEvent.text, error);
          setIsFocused?.(false);
        },
        onSubmitEditing: (
          e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
        ) => {
          if (multiline) return undefined;

          if (!disableSubmit && !error && onSubmitEditing) {
            onSubmitEditing(e.nativeEvent.text, error);
          } else if (props.downPress) {
            props.downPress();
          }
        },
      }),
      [
        clearTextOnFocus,
        disableSubmit,
        downPress,
        error,
        multiline,
        onChange,
        onFocus,
        onSubmitEditing,
        onValueChange,
      ]
    );

    return (
      <TextInputRN
        ref={textInputRef}
        editable={!disabled}
        multiline={multiline}
        returnKeyType={
          multiline ? undefined : "onSubmitEditing" in props ? "send" : "next"
        }
        keyboardAppearance={isDark ? "dark" : "light"}
        {...restProps}
        {...handleLifecycle}
        style={StyleSheet.flatten([
          defaultStyles.base,
          style,
          !!error && defaultStyles.error,
          !!error && errorStyle,
          disabled && defaultStyles.disabled,
          disabled && disabledStyle,
        ])}
        inputAccessoryViewID={
          !disabled && Platform.OS === "ios"
            ? INPUT_ACCESSORY_VIEW_ID
            : undefined
        }
      />
    );
  }
);
