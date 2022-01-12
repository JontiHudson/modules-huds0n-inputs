import { TextStyle, StyleSheet } from "react-native";

import { defaultStyles } from "../PickerInput/helpers";

import type { Types } from "../../types";

export function defaultFormatDisplayDate(
  date: Date,
  locale: string,
  mode: Types.DatePickerMode
) {
  if (mode === "date") {
    return date.toLocaleDateString();
  }
  return date.toLocaleTimeString();
}

export function getStyle(
  {
    placeholderStyle,
    nullPlaceholderStyle,
    errorPlaceholderStyle,
    disabledPlaceholderStyle,
    disabled,
    value,
  }: Types.DatePickerProps,
  error: Types.ValidationError
) {
  const isNull = value === null;

  return StyleSheet.flatten([
    defaultStyles.base,
    placeholderStyle,
    isNull && defaultStyles.null,
    isNull && nullPlaceholderStyle,
    !!error && defaultStyles.error,
    !!error && errorPlaceholderStyle,
    disabled && defaultStyles.disabled,
    disabled && disabledPlaceholderStyle,
  ]) as TextStyle;
}

export const DEFAULT_LOCALE = "en-GB";
export const DEFAULT_MODE = "date";
