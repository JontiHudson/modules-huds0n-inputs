import React, { useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

import { useIsDarkMode } from '@huds0n/theming';
import { theme } from '@huds0n/theming/src/theme';
import { ScreenManager } from '@huds0n/screen-manager';
import { useEffect } from '@huds0n/utilities';

import { AccessoryView } from '../../../InputAccessoryViewIOS/AccessoryView';
import * as InputState from '../../../state';
import * as Types from '../../../types';
import { inputYAnim, handleCustomInputChange } from './helpers';

export const SlideModal = (props: Types.InputManagerProps) => {
  const currentInput = InputState.useCustomInput();

  const { deviceWidth, screenMarginLeft, screenMarginRight } =
    ScreenManager.useDimensions();

  useIsDarkMode();

  const wrapperRef = useRef<View>(null);

  useEffect(
    () => {
      if (currentInput) {
        wrapperRef.current?.measure((x, y, width, height) => {
          handleCustomInputChange(height);
        });
      }
    },
    [currentInput],
    { layout: 'END' },
  );

  if (!currentInput) return null;

  const { Component, props: componentProps } = currentInput;

  const keyboardColor = theme.colors.KEYBOARD;

  const customInputStyle = {
    flex: 1,
    transform: [{ translateY: inputYAnim }],
  };

  return (
    <View style={{ position: 'absolute', top: '100%' }}>
      <Animated.View style={customInputStyle}>
        {Component && (
          <View
            ref={wrapperRef}
            style={{
              backgroundColor: keyboardColor,
              marginLeft: -screenMarginLeft,
              paddingLeft: screenMarginLeft,
              paddingRight: screenMarginRight,
              width: deviceWidth,
            }}
          >
            <AccessoryView {...props} />
            <View style={{ backgroundColor: keyboardColor }}>
              <Component {...componentProps} />
            </View>
          </View>
        )}
        <View
          style={{
            backgroundColor: keyboardColor,
            height: Dimensions.get('screen').height,
          }}
        />
      </Animated.View>
    </View>
  );
};
