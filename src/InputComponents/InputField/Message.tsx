import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { Core } from '@huds0n/core';

import {
  useAnimatedValue,
  useEffect,
  useLayout,
  useState,
} from '@huds0n/utilities';

import { SubComponentProps } from './types';

export function Message({
  error,
  message,
  messageStyle,
  overrideColor,
  useNativeDriver = true,
}: SubComponentProps) {
  const text = (typeof error === 'string' && error) || message;

  const [displayText, setDisplayText] = useState(text);

  const translateY = useAnimatedValue(0);

  const [{ height = 0 } = {}, onLayout] = useLayout();

  useEffect(() => {
    text && setDisplayText(text);

    height &&
      Animated.spring(translateY, {
        toValue: text ? 0 : -height * 1.5,
        useNativeDriver,
      }).start();
  }, [height, text]);

  const style = {
    transform: [{ translateY }],
  };

  return (
    <View
      style={{
        alignItems: 'flex-end',
        paddingTop: Core.spacings.XS,
        overflow: 'hidden',
      }}
    >
      <Animated.View style={style}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          onLayout={onLayout}
          style={StyleSheet.flatten([
            { fontSize: Core.fontSizes.NOTE, fontWeight: '300' },
            messageStyle,
            { color: overrideColor },
          ])}
        >
          {displayText || ' '}
        </Text>
      </Animated.View>
    </View>
  );
}
