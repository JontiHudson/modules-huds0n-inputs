import React from 'react';
import { View } from 'react-native';

import * as Types from '../../types';

import { OverlayModal } from './overlayModal/OverlayModal';

export const InputManagerComponent = React.memo(
  (props: Types.InputManagerProps) => {
    const { children } = props;

    return (
      <View style={{ flex: 1 }}>
        {children}
        <OverlayModal {...props} />
      </View>
    );
  },
);
