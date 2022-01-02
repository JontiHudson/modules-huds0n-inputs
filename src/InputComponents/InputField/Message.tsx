import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { theme } from '@huds0n/theming/src/theme';

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

  const [{ height, isInitialized }, onLayout] = useLayout();

  useEffect(() => {
    text && setDisplayText(text);

    height &&
      Animated.spring(translateY, {
        toValue: text ? 0 : -height * 1.5,
        useNativeDriver,
      }).start();
  }, [height, isInitialized, text]);

  const style = {
    transform: [{ translateY }],
  };

  const textStyle = StyleSheet.flatten([
    defaultStyles.base,
    messageStyle,
    !!overrideColor && { color: overrideColor },
  ]);

  return (
    <View
      style={{
        alignItems: 'flex-end',
        marginTop: theme.spacings.XS,
        height: textStyle.fontSize,
      }}
    >
      <View style={{ overflow: 'hidden' }}>
        <Animated.View style={style}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            onLayout={onLayout}
            style={textStyle}
          >
            {displayText}
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

export const defaultStyles = {
  base: {
    get color() {
      return theme.colors.TEXT;
    },
    fontSize: theme.fontSizes.NOTE,
    fontWeight: '300' as '300',
  },
};
