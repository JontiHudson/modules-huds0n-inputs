import React from 'react';
import { Animated, Modal, StyleSheet, View } from 'react-native';

import { Pressable } from '@huds0n/components';
import { Core } from '@huds0n/core';
import { addColorTransparency } from '@huds0n/utilities';

import { OverlayModalController } from './helpers';

export const OverlayModal = () => {
  const [{ customInputComponent }] = OverlayModalController.useState(
    'customInputComponent',
  );

  Core.useState('darkMode');

  const { backgroundColor, contentsColor } = Core.getInputColors();

  const customInputStyle = {
    flex: 1,
    opacity: OverlayModalController.inputOpacityAnim,
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      // @ts-ignore
      statusBarTranslucent
      visible={!!customInputComponent}
    >
      <Animated.View style={customInputStyle}>
        <Pressable
          onPress={OverlayModalController.dismissInput}
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: addColorTransparency(Core.colors.BLACK, 0.25),
          }}
        >
          {customInputComponent && (
            <View
              style={{
                backgroundColor,
                borderColor: contentsColor,
                borderWidth: StyleSheet.hairlineWidth,
                maxHeight: '75%',
                maxWidth: '75%',
              }}
            >
              {customInputComponent}
            </View>
          )}
        </Pressable>
      </Animated.View>
    </Modal>
  );
};
