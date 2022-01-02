import React from 'react';
import { StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native';

import {
  onDismount,
  onMount,
  useCallback,
  useEffect,
  useImperativeHandle,
  useNodeId,
} from '@huds0n/utilities';

import * as InputState from '../../state';
import * as Types from '../../types';

import { handleValueValidation } from '../helpers';

export namespace createCustomInput {
  export type SubComponentProps<P extends Object = {}, T = any> = Omit<
    Types.CommonInputProps<T>,
    'onValueChange' | 'style'
  > & {
    closeInput: () => void;
    error: Types.Validation.Error;
    openInput: () => void;
    isFocused: boolean;
    onValueChange: (value: T) => void;
  } & P;

  export type SubComponent<
    P extends Object = {},
    T = any,
  > = React.ComponentType<SubComponentProps<P, T>>;

  export type Props<P extends {}, T = any> = {
    inputContainerStyle?: ViewStyle;
    outputContainerStyle?: ViewStyle;
  } & Omit<Types.CommonInputProps<T>, 'style'> &
    P;

  export type Component<
    P extends Object = {},
    T = any,
  > = React.ForwardRefExoticComponent<
    Props<P, T> & React.RefAttributes<RefType>
  >;

  export type RefType = Types.RefType;

  export type ValidationError = Types.Validation.Error;
  export type ValidationProp<T> = Types.Validation.Prop<T>;
}

export function createCustomInput<P extends Object, T = any>(
  OutputComponent: createCustomInput.SubComponent<P, T>,
  InputComponent?: createCustomInput.SubComponent<P, T>,
): createCustomInput.Component<P, T> {
  // @ts-ignore
  return React.forwardRef((props, ref) => {
    const {
      autoFocus,
      downPress,
      upPress,
      disabled,
      disabledStyle,
      onBlur,
      onFocus,
      outputContainerStyle,
      value,
    } = props;

    const { error, onValueChange } = handleValueValidation(props);

    const [viewNodeRef, viewRef] = useNodeId<View>();
    const isFocused = InputState.useIsFocused(viewNodeRef);

    const putInputComponent = useCallback(() => {
      InputState.updateCustomInput(
        viewNodeRef,
        {
          Component: InputComponent,
          props: {
            closeInput: InputState.dismissInput,
            openInput: openInput,
            isFocused: isFocused,
            ...props,
            error: error,
            onValueChange: onValueChange,
          },
        },
        { downPress, upPress, submitPress: null },
      );
    }, [...Object.values(props), isFocused, error, onValueChange]);

    function openInput() {
      if (disabled) {
        return null;
      }
      putInputComponent();

      return value;
    }

    // Handle lifecycle

    useEffect(() => {
      if (isFocused) {
        putInputComponent();
      }
    }, [putInputComponent]);

    onMount(() => {
      autoFocus && openInput();
    });

    onDismount(() => {
      if (viewNodeRef.current === InputState.currentlyFocusedInput()?.id) {
        InputState.dismissInput();
      }
    });

    useEffect(
      () => {
        if (isFocused) {
          onFocus && onFocus?.(value, error);
        } else {
          onBlur && onBlur?.(value, error);
        }
      },
      [isFocused],
      { skipMounts: true },
    );

    useImperativeHandle(ref, () => ({ focus: openInput }), [openInput]);

    return (
      <TouchableOpacity
        // @ts-ignore
        ref={viewRef}
        style={StyleSheet.flatten([
          outputContainerStyle,
          disabled && disabledStyle,
        ])}
        onPress={openInput}
        // Doesn't change color
        activeOpacity={1}
      >
        {
          <OutputComponent
            closeInput={InputState.dismissInput}
            openInput={openInput}
            isFocused={isFocused}
            {...props}
            error={error}
            onValueChange={onValueChange}
          />
        }
      </TouchableOpacity>
    );
  });
}
