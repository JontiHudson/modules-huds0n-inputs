import React from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';

import { Pressable } from '@huds0n/components';
import { useIsDarkMode } from '@huds0n/theming';
import { theme } from '@huds0n/theming/src/theme';
import { addColorTransparency } from '@huds0n/utilities';

import * as InputState from '../../../state';
import * as Types from '../../../types';

import { inputOpacityAnim } from './helpers';

export const OverlayModal = ({ inputColors }: Types.InputManagerProps) => {
  const customInput = InputState.useCustomInput();
  const isDark = useIsDarkMode();

  if (!customInput?.Component) return null;

  const { Component, props: componentProps } = customInput;

  const backgroundColor =
    inputColors?.background || isDark ? theme.colors.BLACK : theme.colors.WHITE;

  const contentsColor =
    inputColors?.contents || isDark ? theme.colors.WHITE : theme.colors.BLACK;

  const customInputStyle = {
    height: '100%',
    width: '100%',
    opacity: inputOpacityAnim,
  };

  const { Modal } =
    Platform.OS === 'web' ? require('./WebModal') : require('react-native');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      // @ts-ignore
      statusBarTranslucent
      onRequestClose={InputState.dismissInput}
      visible
    >
      <Animated.View style={customInputStyle}>
        <Pressable
          onPressIn={InputState.dismissInput}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: addColorTransparency(theme.colors.BLACK, 0.5),
          }}
        >
          <View
            style={{
              backgroundColor,
              borderColor: contentsColor,
              borderWidth: StyleSheet.hairlineWidth,
              maxHeight: '75%',
              maxWidth: '75%',
            }}
          >
            <Component {...componentProps} />
          </View>
        </Pressable>
      </Animated.View>
    </Modal>
  );
};
