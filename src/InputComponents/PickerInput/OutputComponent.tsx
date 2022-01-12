import React from "react";
import { StyleSheet, Text } from "react-native";

import { defaultStyles } from "./helpers";
import type { Types } from "../../types";

export function OutputComponent<T = any>({
  disabled,
  disabledPlaceholderStyle,
  error,
  errorPlaceholderStyle,
  nullPlaceholderStyle,
  nullLabel = "- Please Select -",
  placeholderStyle,
  pickerItems,
  value,
}: Types.CustomInputSubComponentProps<T, Types.PickerSpecficProps<T>>) {
  const currentItem = pickerItems.find((item) => item.value === value);
  const isNull = value === null;

  return (
    <Text
      style={StyleSheet.flatten([
        defaultStyles.base,
        placeholderStyle,
        !!currentItem?.color && { color: currentItem?.color },
        isNull && defaultStyles.null,
        isNull && nullPlaceholderStyle,
        !!error && defaultStyles.error,
        !!error && errorPlaceholderStyle,
        disabled && defaultStyles.disabled,
        disabled && disabledPlaceholderStyle,
      ])}
    >
      {currentItem?.placeholder || currentItem?.label || nullLabel}
    </Text>
  );
}
