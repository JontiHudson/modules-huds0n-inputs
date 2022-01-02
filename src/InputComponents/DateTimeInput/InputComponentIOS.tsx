import React from 'react';
import { Dimensions, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useIsDarkMode } from '@huds0n/theming';
import { useCallback, useEffect } from '@huds0n/utilities';

import * as Types from './types';

export const InputComponentIOS: Types.SubComponent = (props) => {
  const { isFocused, minimumDate, maximumDate, mode, onValueChange, value } =
    props;

  useIsDarkMode();

  const handleChange = useCallback(
    (event: any, value?: Date) => {
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

  useEffect(
    () => {
      if (isFocused && !value) {
        const now = new Date();

        const startValue =
          minimumDate ||
          new Date(
            mode === 'date' ? now.setHours(0, 0, 0, 0) : now.setSeconds(0, 0),
          );

        onValueChange(startValue);
      }
    },
    [isFocused && !value],
    { layout: 'BEFORE' },
  );

  useEffect(
    () => {
      const beforeMinDate =
        value && minimumDate && minimumDate.valueOf() > value.valueOf();
      const afterMaxDate =
        value && maximumDate && value.valueOf() > maximumDate.valueOf();

      if (beforeMinDate || afterMaxDate) {
        onValueChange(null);
      }
    },
    [minimumDate, maximumDate],
    { skipMounts: true },
  );

  return (
    <View style={{ maxHeight: Dimensions.get('window').height }}>
      <DateTimePicker
        {...props}
        display="spinner"
        onChange={handleChange}
        value={value || minimumDate || new Date()}
      />
    </View>
  );
};
