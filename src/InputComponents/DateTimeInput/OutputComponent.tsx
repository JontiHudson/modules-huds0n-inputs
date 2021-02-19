import React from 'react';
import { Platform, StyleSheet, Text, TextStyle } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Core } from '@huds0n/core';
import { onMount, useCallback } from '@huds0n/utilities';

import * as Types from './types';

export const OutputComponent: Types.SubComponent = (props) => {
  const {
    closeInput,
    disabled,
    disabledPlaceholderStyle = { color: Core.colors.DISABLED },
    error,
    errorPlaceholderStyle = { color: Core.colors.ERROR },
    formatDisplayDate = defaultFormatDisplayDate,
    isFocused,
    locale = 'en-GB',
    minimumDate,
    mode = 'date',
    nullLabel = '- Please Select -',
    nullPlaceholderStyle = { color: 'gray' },
    onValueChange,
    placeholderStyle,
    value,
  } = props;

  const handleChange = useCallback(
    (event: any, value?: Date) => {
      closeInput();
      value &&
        onValueChange &&
        onValueChange(
          new Date(
            mode === 'date'
              ? value.setHours(0, 0, 0, 0)
              : value.setSeconds(0, 0),
          ),
        );
    },
    [mode, onValueChange, value],
  );

  return (
    <>
      <Text
        style={
          StyleSheet.flatten([
            { color: Core.colors.TEXT, fontSize: Core.fontSizes.BODY },
            placeholderStyle,
            !value && nullPlaceholderStyle,
            !!error && errorPlaceholderStyle,
            disabled && disabledPlaceholderStyle,
          ]) as TextStyle
        }
      >
        {value ? formatDisplayDate(value, locale, mode) : nullLabel}
      </Text>
      {isFocused && Platform.OS === 'android' && (
        <DateTimePicker
          display={mode === 'date' ? 'calendar' : 'spinner'}
          {...props}
          onChange={handleChange}
          value={
            value ||
            minimumDate ||
            new Date(
              mode === 'date'
                ? new Date().setHours(0, 0, 0, 0)
                : new Date().setHours(0, 0, 0, 0),
            )
          }
        />
      )}
    </>
  );
};

function defaultFormatDisplayDate(
  date: Date,
  locale: string,
  mode: Types.Mode,
) {
  if (mode === 'date') {
    return date.toLocaleDateString();
  }
  return date.toLocaleTimeString();
}
