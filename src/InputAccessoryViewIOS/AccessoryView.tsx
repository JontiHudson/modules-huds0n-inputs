import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useIsDarkMode } from '@huds0n/theming';
import { theme } from '@huds0n/theming/src/theme';
import { ScreenManager } from '@huds0n/screen-manager';

import * as Types from '../types';

import { Contents } from './Contents';

export const AccessoryView = React.memo((props: Types.InputManagerProps) => {
  const { deviceWidth, screenMarginLeft, screenMarginRight } =
    ScreenManager.useDimensions();

  useIsDarkMode();

  const keyboardColor = theme.colors.KEYBOARD;

  return (
    <View
      style={StyleSheet.flatten([
        {
          backgroundColor: keyboardColor,
          borderTopWidth: StyleSheet.hairlineWidth,
          marginLeft: -screenMarginLeft,
          paddingLeft: screenMarginLeft,
          paddingRight: screenMarginRight,
          width: deviceWidth,
        },
        props.accessoryView?.containerStyle,
      ])}
    >
      <Contents {...props} />
    </View>
  );
});
