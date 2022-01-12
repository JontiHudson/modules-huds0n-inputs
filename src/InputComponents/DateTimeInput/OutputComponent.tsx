import React from "react";
import { Platform, Text } from "react-native";

import {
  defaultFormatDisplayDate,
  DEFAULT_LOCALE,
  DEFAULT_MODE,
  getStyle,
} from "./helpers";
import { InputComponentAndroid } from "./InputComponentAndroid";
import type { Types } from "../../types";

export function OutputComponent(
  props: Types.CustomInputSubComponentProps<
    Date | null,
    Types.DatePickerSpecficProps
  >
) {
  const {
    error,
    formatDisplayDate = defaultFormatDisplayDate,
    isFocused,
    locale = DEFAULT_LOCALE,
    mode = DEFAULT_MODE,
    nullLabel = "- Please Select -",
    value,
  } = props;

  return (
    <>
      <Text style={getStyle(props, error)}>
        {value ? formatDisplayDate(value, locale, mode) : nullLabel}
      </Text>
      {isFocused && Platform.OS === "android" && (
        <InputComponentAndroid {...props} />
      )}
    </>
  );
}
