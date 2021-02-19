import React from 'react';
import { View } from 'react-native';

import { OverlayModal } from './overlayModal/OverlayModal';
import { OverlayModalController } from './overlayModal/helpers';
import { InputManagerProps } from '../types';

export const InputManagerComponent = React.memo((props: InputManagerProps) => {
  const { children } = props;

  return (
    <View style={{ flex: 1 }}>
      {children}
      <OverlayModal />
    </View>
  );
});

export const dismissInput = OverlayModalController.dismissInput;
