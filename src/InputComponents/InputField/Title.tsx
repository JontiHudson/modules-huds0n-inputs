import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { theme } from '@huds0n/theming/src/theme';

import { useEffect, useLayout, useMemo, useRef } from '@huds0n/utilities';

import { SubComponentProps } from './types';

// Accurate scaling is calulated from fontsize difference

const MIN_TITLE_SIZE = 14;
const DEFAULT_MAX_TITLE_SIZE = 20;

const MIN_OPACITY = 0.4;

export function Title(props: SubComponentProps) {
  const {
    isFocused,
    isRequired,
    overrideColor,
    title,
    titleHighlightColor = theme.colors.PRIMARY,
    titleIsMinimised,
    titleStyle,
    useNativeDriver = true,
  } = props;

  const opacityAnim = useRef(new Animated.Value(isFocused ? 1 : MIN_OPACITY));
  const scaleAnim = useRef(new Animated.Value(1));
  const translateXAnim = useRef(new Animated.Value(0));
  const translateYAnim = useRef(new Animated.Value(0));

  const [{ width }, onLayout] = useLayout();

  const fontSize = titleStyle?.fontSize || DEFAULT_MAX_TITLE_SIZE;
  const titleScale = MIN_TITLE_SIZE / fontSize;

  const minTranslateYOffset = useMemo(() => {
    return {
      x: -(width / titleScale - width) * 0.5,
      y: -fontSize - theme.spacings.S * 2,
    };
  }, [fontSize, width]);

  useEffect(async () => {
    Animated.parallel([
      Animated.spring(opacityAnim.current, {
        toValue: titleIsMinimised ? 1 : MIN_OPACITY,
        useNativeDriver,
      }),
      Animated.spring(scaleAnim.current, {
        toValue: titleIsMinimised ? titleScale : 1,
        useNativeDriver,
      }),
      Animated.spring(translateXAnim.current, {
        toValue: titleIsMinimised ? minTranslateYOffset.x : 0,
        useNativeDriver,
      }),
      Animated.spring(translateYAnim.current, {
        toValue: titleIsMinimised ? minTranslateYOffset.y : 0,
        useNativeDriver,
      }),
    ]).start();
  }, [minTranslateYOffset, titleIsMinimised]);

  const color =
    overrideColor || (isFocused ? titleHighlightColor : titleStyle?.color);

  const formattedTitle = (title || '?') + (isRequired ? '*' : '');

  const TitleText = (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={StyleSheet.flatten([
        defaultStyles.base,
        titleStyle,
        !!color && { color },
      ])}
    >
      {formattedTitle}
    </Text>
  );

  const styleAnim = {
    opacity: opacityAnim.current,
    transform: [
      { scale: scaleAnim.current },
      { translateX: translateXAnim.current },
      { translateY: translateYAnim.current },
    ],
  };

  return (
    <View
      onLayout={onLayout}
      style={{
        position: 'absolute',
        height: '100%',
      }}
    >
      <Animated.View style={styleAnim}>{TitleText}</Animated.View>
    </View>
  );
}

export const defaultStyles = {
  base: {
    get color() {
      return theme.colors.TEXT;
    },
    fontSize: theme.fontSizes.BODY,
  },
};
