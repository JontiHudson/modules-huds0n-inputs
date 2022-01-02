import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { defaultStyles } from '../TextInput/helpers';

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
          defaultStyles.base,
          style,
          !!error && defaultStyles.error,
          !!error && errorStyle,
          disabled && defaultStyles.disabled,
          disabled && disabledStyle,
        ])}
      >
        {prefix + ' '}
      </Text>
    </View>
  );
}
