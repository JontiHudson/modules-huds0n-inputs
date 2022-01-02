import React from 'react';
import {
  Platform,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput as TextInputRN,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
} from 'react-native';

import { useIsDarkMode } from '@huds0n/theming';
import { useCopyRef, useEffect, useMemo } from '@huds0n/utilities';

import { INPUT_ACCESSORY_VIEW_ID } from '../../InputAccessoryViewIOS';
import * as InputState from '../../state';
import { Validation } from '../../types';

import { handleValueValidation } from '../helpers';

import {
  defaultStyles,
  handleAndroidBlurOnKeyboardHide,
  getSubmitPress,
} from './helpers';
import * as Types from './types';

export namespace TextInput {
  export type Props = Types.Props;
  export type RefType = Types.RefType;

  export type ValidationError = Validation.Error;
  export type ValidationProp<T> = Validation.Prop<T>;

  export type Component = Types.Component;
}

export const TextInput: TextInput.Component = React.forwardRef<
  TextInput.RefType,
  TextInput.Props
>((props, ref) => {
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
        clearTextOnFocus && onValueChange('');
        onFocus && onFocus(e.nativeEvent.text, error);
      },
      onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur && onBlur(e.nativeEvent.text, error);
      },
      onSubmitEditing: (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
      ) => {
        if (multiline) return undefined;

        (!disableSubmit &&
          !error &&
          onSubmitEditing &&
          onSubmitEditing(e.nativeEvent.text, error)) ||
          (downPress && downPress());
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
    ],
  );

  return (
    <TextInputRN
      ref={textInputRef}
      editable={!disabled}
      multiline={multiline}
      returnKeyType={
        multiline ? undefined : 'onSubmitEditing' in props ? 'send' : 'next'
      }
      keyboardAppearance={isDark ? 'dark' : 'light'}
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
        !disabled && Platform.OS === 'ios' ? INPUT_ACCESSORY_VIEW_ID : undefined
      }
    />
  );
});
