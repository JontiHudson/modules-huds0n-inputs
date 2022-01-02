import React from 'react';
import { Animated, View } from 'react-native';

import { InputManagerProps } from '../../../types';
import { screenYAnim } from './helpers';

export const AnimatedScreen = React.memo(({ children }: InputManagerProps) => {
  const screenStyle = {
    flex: 1,
    transform: [{ translateY: screenYAnim }],
  };

  return <Animated.View style={screenStyle}>{children}</Animated.View>;
});
