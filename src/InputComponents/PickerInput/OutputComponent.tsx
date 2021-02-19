import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import { Core } from '@huds0n/core';

import { SubComponent } from './types';

export function OutputComponent<ItemT = any>({
  disabled,
  disabledPlaceholderStyle = { color: Core.colors.DISABLED },
  error,
  errorPlaceholderStyle = { color: Core.colors.ERROR },
  nullPlaceholderStyle = { color: 'gray' },
  nullLabel = '- Please Select -',
  placeholderStyle,
  pickerItems,
  value,
}: SubComponent<ItemT>) {
  const currentItem = pickerItems.find((item) => item.value === value);

  return (
    <Text
      style={
        StyleSheet.flatten([
          { color: Core.colors.TEXT, fontSize: Core.fontSizes.BODY },
          placeholderStyle,
          currentItem?.color && { color: currentItem?.color },
          value === null && nullPlaceholderStyle,
          !!error && errorPlaceholderStyle,
          disabled && disabledPlaceholderStyle,
        ]) as TextStyle
      }
    >
      {currentItem?.placeholder || currentItem?.label || nullLabel}
    </Text>
  );
}
