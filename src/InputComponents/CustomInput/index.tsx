import React from 'react';
import { Platform, Keyboard, StyleSheet, ViewStyle } from 'react-native';

import { View } from '@huds0n/components';
import {
  onDismount,
  onMount,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useNodeId,
} from '@huds0n/utilities';

import { InputManager } from '../../InputManager';
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
    T = any
  > = React.ComponentType<SubComponentProps<P, T>>;

  export type Props<P extends {}, T = any> = {
    inputContainerStyle?: ViewStyle;
    outputContainerStyle?: ViewStyle;
  } & Omit<Types.CommonInputProps<T>, 'style'> &
    P;

  export type Component<
    P extends Object = {},
    T = any
  > = React.ForwardRefExoticComponent<
    Props<P, T> & React.RefAttributes<RefType>
  >;

  export type RefType = Types.RefType;

  export type ValidationError = Types.Validation.Error;
  export type ValidationProp<T> = Types.Validation.Prop<T>;
}

const InputController =
  Platform.OS === 'ios'
    ? require('../../InputManager/Component/slideModal/helpers')
        .SlideModalController
    : require('../../InputManager/Component/overlayModal/helpers')
        .OverlayModalController;

export function createCustomInput<P extends Object, T = any>(
  OutputComponent: createCustomInput.SubComponent<P, T>,
  InputComponent?: createCustomInput.SubComponent<P, T>,
): createCustomInput.Component<P, T> {
  // @ts-ignore
  return React.forwardRef((props, ref) => {
    const {
      autoFocus,
      disabled,
      disabledStyle,
      inputContainerStyle,
      onBlur,
      onFocus,
      outputContainerStyle,
      value,
    } = props;

    const { error, onValueChange } = handleValueValidation(props);

    const [viewNodeRef, viewRef] = useNodeId();
    const focusedNodeId = InputController.useFocusedNodeId();
    const isFocused = viewNodeRef.current === focusedNodeId;

    const openInput = getInputClose(props, viewNodeRef.current);

    const effectDependancyHandle = useMemo(() => [Symbol('dependancyRef')], [
      isFocused,
      ...Object.values(props),
    ]);

    useEffect(() => {
      isFocused &&
        InputComponent &&
        InputController.setCustomInputComponent(
          <InputComponent
            closeInput={InputManager.dismiss}
            openInput={openInput}
            inputContainerStyle={inputContainerStyle}
            isFocused={isFocused}
            {...props}
            error={error}
            onValueChange={onValueChange}
          />,
        );
    }, effectDependancyHandle);

    // Handle lifecycle

    onMount(() => {
      autoFocus && openInput();
    });

    onDismount(() => {
      if (viewNodeRef.current === InputController.getFocusedNodeId()) {
        InputManager.dismiss();
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

    handleIOSInputAccessory(props, isFocused, error);

    useImperativeHandle(ref, () => ({ focus: openInput }), [openInput]);

    return (
      <View
        ref={viewRef}
        style={StyleSheet.flatten([
          outputContainerStyle,
          disabled && disabledStyle,
        ])}
        onPressThrough={openInput}
      >
        {
          <OutputComponent
            closeInput={InputManager.dismiss}
            openInput={openInput}
            isFocused={isFocused}
            {...props}
            error={error}
            onValueChange={onValueChange}
          />
        }
      </View>
    );
  });
}

function getInputClose<P extends Object>(
  { disabled, value }: createCustomInput.Props<P>,
  inputNodeId: number | undefined,
) {
  return useCallback(() => {
    if (disabled) {
      return null;
    }

    Keyboard.dismiss();
    InputController.setFocusedNode(inputNodeId, 'CUSTOM');

    return value;
  }, [disabled, value, inputNodeId]);
}

function handleIOSInputAccessory<P extends Object>(
  {
    disableSubmit,
    downPress,
    onSubmitEditing,
    upPress,
    value,
  }: createCustomInput.Props<P>,
  isFocused: boolean,
  error: createCustomInput.ValidationError,
) {
  if (Platform.OS === 'ios') {
    useEffect(
      () => {
        const { InputAccessoryState } = require('../../InputAccessoryViewIOS');

        if (isFocused) {
          InputAccessoryState.setState({
            upPress,
            submitPress:
              !disableSubmit && onSubmitEditing
                ? () => onSubmitEditing?.(value, error)
                : undefined,
            downPress,
          });
        }
      },
      [
        disableSubmit,
        downPress,
        error,
        isFocused,
        onSubmitEditing,
        upPress,
        value,
      ],
      { layout: 'AFTER' },
    );
  }
}
