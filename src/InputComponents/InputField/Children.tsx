import React from 'react';
import { Animated } from 'react-native';

import { useAnimatedValue, useEffect } from '@huds0n/utilities';

import { SubComponentProps } from './types';

export function Children(props: SubComponentProps) {
  const { children, titleIsMinimised, useNativeDriver = true } = props;

  const opacity = useAnimatedValue(0);

  useEffect(() => {
    Animated.spring(opacity, {
      toValue: titleIsMinimised ? 1 : 0,
      useNativeDriver,
    }).start();
  }, [titleIsMinimised]);

  const style = { opacity };

  return <Animated.View style={style}>{children}</Animated.View>;
}
