import React from 'react';
import {
  InputAccessoryView as InputAccessoryViewRN,
  StyleSheet,
  View,
} from 'react-native';

import { useIsDarkMode } from '@huds0n/theming';
import { theme } from '@huds0n/theming/src/theme';
import { ScreenManager } from '@huds0n/screen-manager';

import * as Types from '../types';

import { AccessoryView } from './AccessoryView';

export const INPUT_ACCESSORY_VIEW_ID = 'HUDS0N_ACCESSORY_VIEW';

export const InputAccessoryView = React.memo(
  (props: Types.InputManagerProps) => {
    useIsDarkMode();
    const { deviceWidth, screenMarginLeft } = ScreenManager.useDimensions();

    const keyboardColor = theme.colors.KEYBOARD;

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
