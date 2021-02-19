import React from 'react';
import { StyleSheet, View, ScaleYTransform } from 'react-native';

import { Core } from '@huds0n/core';
import { useCallback } from '@huds0n/utilities';
import { Icon } from '@huds0n/components';

import { SlideModalController } from '../InputManager/Component/slideModal/helpers';
import * as Types from '../InputManager/types';
import { InputAccessoryState } from './helpers';

export const Contents = React.memo(
  ({
    accessoryView: {
      iconDismiss = defaultIcons.dismiss,
      iconDown = defaultIcons.down,
      iconSubmit = defaultIcons.submit,
      iconUp = defaultIcons.up,
    } = {},
  }: Types.InputManagerProps) => {
    Core.useState('darkMode');

    const { keyboardColor, contentsColor } = Core.getInputColors();

    const [{ downPress, submitPress, upPress }] = InputAccessoryState.useState([
      'downPress',
      'submitPress',
      'upPress',
    ]);

    const handleDownPress = useCallback(() => downPress && downPress(), [
      downPress,
    ]);
    const handleSubmitPress = useCallback(() => {
      SlideModalController.dismissInput();
      submitPress && submitPress();
    }, [submitPress]);
    const handleUpPress = useCallback(() => upPress && upPress(), [upPress]);

    const SecondIcon =
      submitPress && !downPress ? (
        <Icon
          color={contentsColor}
          disabled={!submitPress}
          onPress={handleSubmitPress}
          {...iconSubmit}
        />
      ) : (
        <Icon
          color={contentsColor}
          disabled={!downPress}
          onPress={handleDownPress}
          {...iconDown}
        />
      );

    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: keyboardColor,
          borderColor: contentsColor,
          borderTopWidth: StyleSheet.hairlineWidth,
          flexDirection: 'row',
          paddingHorizontal: Core.spacings.M,
          paddingVertical: Core.spacings.S,
          width: '100%',
        }}
      >
        <Icon
          color={contentsColor}
          disabled={!upPress}
          onPress={handleUpPress}
          {...iconUp}
        />
        <View style={{ width: 5 }} />
        {SecondIcon}
        <View style={{ flex: 1 }} />
        <Icon
          color={contentsColor}
          onPress={SlideModalController.dismissInput}
          {...iconDismiss}
        />
      </View>
    );
  },
);

const defaultIcons = {
  dismiss: {
    name: 'keyboard-close',
    set: 'MaterialCommunityIcons',
    size: 26,
    containerStyle: { transform: [{ scaleY: 0.8 }] as ScaleYTransform[] },
  },
  down: {
    name: 'chevron-down',
    set: 'Feather',
    size: 36,
    containerStyle: { margin: -5 },
  },
  up: {
    name: 'chevron-up',
    set: 'Feather',
    size: 36,
    containerStyle: { margin: -5 },
  },
  submit: {
    name: 'send',
    set: 'Feather',
    size: 20,
  },
} as const;
