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

import { Core } from '@huds0n/core';
import { useCopyRef, useMemo } from '@huds0n/utilities';

import { Validation } from '../../types';

import { handleValueValidation } from '../helpers';

import {
  handleAndroidBlurOnKeyboardHide,
  handleInputAccessoryView,
} from './helpers';
import { theming } from './theming';
import * as Types from './types';

export namespace TextInput {
  export type Props = Types.Props;
  export type RefType = Types.RefType;

  export type ValidationError = Validation.Error;
  export type ValidationProp<T> = Validation.Prop<T>;

  export type Component = Types.Component & { theming: typeof theming };
}

const _TextInput = React.forwardRef<TextInput.RefType, TextInput.Props>(
  (props, ref) => {
    const {
      clearTextOnFocus,
      disabled,
      disabledStyle = { color: 'lightgray' },
      disableSubmit,
      downPress,
      errorStyle = { color: Core.colors.ERROR },
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

    const [{ darkMode }] = Core.useState('darkMode');

    const textInputRef = useCopyRef(ref);

    const { error, onValueChange } = handleValueValidation(props);

    Platform.OS === 'android' && handleAndroidBlurOnKeyboardHide(textInputRef);
    Platform.OS === 'ios' &&
      handleInputAccessoryView(props, textInputRef, error);

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
        keyboardAppearance={darkMode ? 'dark' : 'light'}
        {...restProps}
        {...handleLifecycle}
        style={StyleSheet.flatten([
          {
            color: Core.colors.TEXT,
            paddingTop: 0,
            fontSize: Core.fontSizes.BODY,
          },
          style,
          !!error && errorStyle,
          disabled && disabledStyle,
        ])}
        inputAccessoryViewID={
          !disabled && Platform.OS === 'ios'
            ? require('../../InputAccessoryViewIOS').INPUT_ACCESSORY_VIEW_ID
            : undefined
        }
      />
    );
  },
);

export const TextInput: TextInput.Component = Object.assign(_TextInput, {
  theming,
});
