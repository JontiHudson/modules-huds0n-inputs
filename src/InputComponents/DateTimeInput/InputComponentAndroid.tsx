import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";

import { useCallback } from "@huds0n/utilities";

import type { Types } from "../../types";

export function InputComponentAndroid(
  props: Types.CustomInputSubComponentProps<
    Date | null,
    Types.DatePickerSpecficProps
  >
) {
  const {
    closeInput,
    minimumDate,
    mode = "date",
    onValueChange,
    value,
  } = props;

  const handleChange = useCallback(
    (event: any, value?: Date) => {
      closeInput();
      value &&
        onValueChange &&
        onValueChange(
          new Date(
            mode === "date"
              ? value.setHours(0, 0, 0, 0)
              : value.setSeconds(0, 0)
          )
        );
    },
    [mode, onValueChange, value]
  );

  return (
    <DateTimePicker
      display={mode === "date" ? "calendar" : "spinner"}
      {...props}
      onChange={handleChange}
      value={
        value ||
        minimumDate ||
        new Date(
          mode === "date"
            ? new Date().setHours(0, 0, 0, 0)
            : new Date().setHours(0, 0, 0, 0)
        )
      }
    />
  );
}
