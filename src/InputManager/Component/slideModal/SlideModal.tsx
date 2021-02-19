import React, { useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

import { Core } from '@huds0n/core';
import { ScreenManager } from '@huds0n/screen-manager';
import { useEffect } from '@huds0n/utilities';

import { AccessoryView } from '../../../InputAccessoryViewIOS/AccessoryView';
import * as Types from '../../types';
import { SlideModalController } from './helpers';

export const SlideModal = (props: Types.InputManagerProps) => {
  const [{ customInputComponent }] = SlideModalController.useState(
    'customInputComponent',
  );
  const {
    deviceWidth,
    screenMarginLeft,
    screenMarginRight,
  } = ScreenManager.useDimensions();

  Core.useState('darkMode');

  const wrapperRef = useRef<View>(null);

  useEffect(
    () => {
      if (customInputComponent) {
        wrapperRef.current?.measure((x, y, width, height) => {
          SlideModalController.handleCustomInputChange(height);
        });
      }
    },
    [customInputComponent],
    { layout: 'END' },
  );

  const { keyboardColor } = Core.getInputColors();

  const customInputStyle = {
    flex: 1,
    transform: [{ translateY: SlideModalController.inputYAnim }],
  };

  return (
    <View style={{ position: 'absolute', top: '100%' }}>
      <Animated.View style={customInputStyle}>
        {customInputComponent && (
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
              {customInputComponent}
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
