import React from 'react';
import {
  InputAccessoryView as InputAccessoryViewRN,
  StyleSheet,
  View,
} from 'react-native';

import { Core } from '@huds0n/core';
import { ScreenManager } from '@huds0n/screen-manager';

import * as Types from '../InputManager/types';

import { AccessoryView } from './AccessoryView';
import { INPUT_ACCESSORY_VIEW_ID } from './helpers';

export const InputAccessoryView = React.memo(
  (props: Types.InputManagerProps) => {
    Core.useState('darkMode');
    const { deviceWidth, screenMarginLeft } = ScreenManager.useDimensions();

    const { keyboardColor } = Core.getInputColors();

    return (
      <InputAccessoryViewRN nativeID={INPUT_ACCESSORY_VIEW_ID}>
        <View
          style={{
            position: 'absolute',
            height: 200,
            width: deviceWidth,
            marginLeft: -screenMarginLeft,
            backgroundColor:
              StyleSheet.flatten(props.accessoryView?.containerStyle)
                ?.backgroundColor || keyboardColor,
          }}
        />
        <AccessoryView {...props} />
      </InputAccessoryViewRN>
    );
  },
);

export * from './helpers';
