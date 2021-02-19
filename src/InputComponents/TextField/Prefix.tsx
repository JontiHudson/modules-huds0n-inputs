import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PrefixProps } from './types';

export function Prefix({
  disabled,
  disabledStyle,
  error,
  errorStyle,
  prefix,
  style,
  ...rest
}: PrefixProps) {
  if (!prefix) return null;

  return (
    <View>
      <Text
        {...rest}
        style={StyleSheet.flatten([
          style,
          !!error && errorStyle,
          disabled && disabledStyle,
        ])}
      >
        {prefix + ' '}
      </Text>
    </View>
  );
}
