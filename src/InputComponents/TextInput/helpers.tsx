import React from 'react';
import {
  findNodeHandle,
  Platform,
  TextInput as TextInputRN,
} from 'react-native';

import { getNodeId, useEffect, useMemo } from '@huds0n/utilities';

import { Validation } from '../../types';
import { Props } from './types';

const InputController =
  Platform.OS === 'ios'
    ? require('../../InputManager/Component/slideModal/helpers')
        .SlideModalController
    : require('../../InputManager/Component/overlayModal/helpers')
        .OverlayModalController;

export function handleInputAccessoryView(
  props: Props,
  ref: React.RefObject<TextInputRN>,
  error: Validation.Error,
) {
  const { downPress, onSubmitEditing, upPress, value } = props;

  const textInputId = getNodeId(ref);

  const focusedNodeId = InputController.useFocusedNodeId();
  const isFocused = textInputId === focusedNodeId;

  const submitPress = useMemo(() => {
    if (!error && onSubmitEditing) {
      return () => {
        onSubmitEditing(value, error);
      };
    }
    return undefined;
  }, [error, onSubmitEditing, value]);

  useEffect(() => {
    if (isFocused) {
      const { InputAccessoryState } = require('../../InputAccessoryViewIOS');

      InputAccessoryState.setState({
        upPress,
        submitPress,
        downPress,
      });
    }
  }, [isFocused, downPress, upPress, submitPress]);
}

export function handleAndroidBlurOnKeyboardHide(
  ref: React.RefObject<TextInputRN>,
) {
  const textInputId = getNodeId(ref);

  const focusedNodeId = InputController.useFocusedNodeId();
  const isFocused = textInputId === focusedNodeId;

  useEffect(() => {
    if (
      !isFocused &&
      textInputId === findNodeHandle(TextInputRN.State.currentlyFocusedInput())
    ) {
      ref.current?.blur();
    }
  }, [isFocused]);
}
