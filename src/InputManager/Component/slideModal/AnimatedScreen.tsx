import React from 'react';
import { Animated, View } from 'react-native';

import { SlideModalController } from './helpers';
import { InputManagerProps } from '../../types';

export const AnimatedScreen = React.memo(({ children }: InputManagerProps) => {
  const { screenYAnim } = SlideModalController;

  const screenStyle = {
    flex: 1,
    transform: [{ translateY: screenYAnim }],
  };

  return (
    <Animated.View style={screenStyle}>
      <View style={{ flex: 1 }}>{children}</View>
    </Animated.View>
  );
});
