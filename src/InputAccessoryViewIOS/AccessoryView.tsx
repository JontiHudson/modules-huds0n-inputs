import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Core } from '@huds0n/core';
import { ScreenManager } from '@huds0n/screen-manager';

import * as Types from '../InputManager/types';

import { Contents } from './Contents';

export const AccessoryView = React.memo((props: Types.InputManagerProps) => {
  const {
    deviceWidth,
    screenMarginLeft,
    screenMarginRight,
  } = ScreenManager.useDimensions();

  Core.useState('darkMode');

  const { keyboardColor } = Core.getInputColors();

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
