import React, { useImperativeHandle } from "react";
import {
  NativeSyntheticEvent,
  TextInput as TextInputRN,
  TextInputKeyPressEventData,
} from "react-native";

import Huds0nError from "@huds0n/error";
import {
  toArray,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "@huds0n/utilities";

import * as InputState from "../../state";

import { handleValueValidation } from "../helpers";
import { TextInput } from "../TextInput";
import { validators } from "../validators";

import { getStyle } from "./helpers";

import type { Types } from "../../types";

export const DateTimeWeb = React.forwardRef<
  Types.InputRefType,
  Types.DatePickerProps
>((props, ref) => {
  const {
    customError,
    invalidDateError = props.mode === "time" ? "Invalid time" : "Invalid date",
    mode = "date",
    webInputFormat = "DD/MM/YYYY",
    value,
    validator,
    minimumDate,
    maximumDate,
  } = props;

  const format = mode === "time" ? "HH:mm" : webInputFormat;
  const delimiter =
    mode === "time" ? ":" : getWebInputDelimiter(webInputFormat);
  const formatComponents =
    mode === "time" ? ["HH", "mm"] : getDateFormat(webInputFormat, delimiter);

  const inputRef = useRef<TextInputRN>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  const [text, setText] = useState("");

  const localError = !value && !!text && invalidDateError;

  const { error, onValueChange } = handleValueValidation({
    ...props,
    customError: customError || localError,
    validator: useMemo(() => {
      const combinedValidation = validator ? [...toArray(validator)] : [];

      if (maximumDate) {
        combinedValidation.push(
          validators.date({
            beforeOrEqual: maximumDate,
            type: props.mode,
          })
        );
      }

      if (minimumDate) {
        combinedValidation.push(
          validators.date({
            after: minimumDate,
            type: props.mode,
          })
        );
      }

      return combinedValidation;
    }, [validator, maximumDate, minimumDate, localError]),
  });

  const updateValue = useCallback(
    (t) => {
      try {
        let newDate: Date;
        const c1 = t.slice(0, 2);
        const c2 = t.slice(3, 5);
        const c3 = t.slice(6, 10);

        let year = 0;
        let monthIndex = 0;
        let day = 1;
        let hours = 0;
        let minutes = 0;

        [c1, c2, c3].forEach((c, i) => {
          const f = formatComponents[i];
          if (f) {
            if (!c) {
              throw "Empty component";
            }
            const n = Number(c);
            switch (formatComponents[i]) {
              case "DD":
                day = n;
                return;
              case "MM":
                monthIndex = n - 1;
                return;
              case "HH":
                hours = n;
                return;
              case "mm":
                minutes = n;
                return;
              case "YYYY":
                if (c.length < 4) {
                  throw "Year too short";
                }
                year = n;
                return;
            }
          }
        });

        if (mode === "date") {
          newDate = new Date(year, monthIndex, day);

          if (newDate.getMonth() !== monthIndex || newDate.getDate() !== day) {
            throw "Invalid date";
          }
        } else {
          newDate = new Date();
          newDate.setHours(hours);
          newDate.setMinutes(minutes);
        }

        onValueChange(newDate);

        return newDate;
      } catch {
        onValueChange(null);
        return null;
      }
    },
    [onValueChange]
  );

  useEffect(
    () => {
      updateValue(text);
    },
    [text],
    { layout: "BEFORE" }
  );

  const updateText = useCallback(
    (v = value) => {
      if (v) {
        setText(
          formatComponents
            .map((f) => {
              if (f === "DD") return v.getDate().toString().padStart(2, "0");
              if (f === "MM")
                return (v.getMonth() + 1).toString().padStart(2, "0");
              if (f === "HH") return v.getHours().toString().padStart(2, "0");
              if (f === "mm") return v.getMinutes().toString().padStart(2, "0");
              return v.getFullYear().toString();
            })
            .reduce((acc, x, i) => {
              return i === 0 ? acc + x : acc + delimiter + x;
            })
        );
      }
    },
    [value]
  );

  const onKeyPress = useCallback(
    ({
      nativeEvent: { key },
    }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (key === "Backspace") {
        setText((t) => {
          return t.slice(0, t[t.length - 1] === delimiter ? -2 : -1);
        });
      }

      if (key === delimiter) {
        setText((t) => {
          const currentLength = t.length;

          if (currentLength === 1 || (mode === "date" && currentLength === 4)) {
            const lastDidget = t.slice(currentLength - 1);
            const rest = t.slice(0, currentLength - 1);

            return rest + "0" + lastDidget + delimiter;
          }
          return t;
        });
      }

      if (key.match(/[0-9]/)) {
        setText((t) => {
          const currentLength = t.length;

          const isMaxLength = currentLength === format.length;
          if (isMaxLength) {
            return t;
          }

          const newText = t + key;
          const newTextSplit = newText.split(delimiter);
          const currentComponent = newTextSplit.length - 1;
          const componentText = newTextSplit[currentComponent];
          const componentNumber = Number(componentText);

          const f = formatComponents[currentComponent];
          if (f === "DD" && componentNumber > 31) return t;
          if (f === "MM" && componentNumber > 12) return t;
          if (f === "HH" && componentNumber > 23) return t;
          if (f === "mm" && componentNumber > 59) return t;

          if (currentLength === 1 || (mode === "date" && currentLength === 4)) {
            return newText + delimiter;
          }
          return newText;
        });
      }
    },
    [updateValue]
  );

  const onSubmitEditing = useCallback(() => {
    if (value) {
      updateText();
      props.onSubmitEditing && props.onSubmitEditing(value, error);
    } else {
      setText("");
    }
  }, [value, updateText, props.onSubmitEditing, error]);

  const isFocused = handleFocusBlur(props, inputRef, error, setText);

  useEffect(
    () => {
      // Keeps contents up to date with value prop when not focused
      if (!isFocused) {
        updateText();
      }
    },
    [value, isFocused],
    { layout: "BEFORE" }
  );

  const style = getStyle(props, error);

  return (
    <TextInput
      ref={inputRef}
      scrollEnabled={false}
      placeholder={format}
      onKeyPress={onKeyPress}
      value={text}
      keyboardType="numeric"
      onSubmitEditing={onSubmitEditing}
      style={style}
    />
  );
});

function getWebInputDelimiter(webInputFormat: string) {
  return useMemo(() => {
    if (webInputFormat.includes("/")) return "/";
    if (webInputFormat.includes("-")) return "-";
    if (webInputFormat.includes(".")) return ".";

    throw new Huds0nError({
      name: "Huds0nError",
      code: "INVALID_WEB_INPUT_DATE_DELIMITER",
      message: `WebInputFormat date components must be separted by either '/', '.', or '-'. e.g. DD-MM-YYYY`,
      severity: "HIGH",
      info: { webInputFormat },
    });
  }, [webInputFormat]);
}

function getDateFormat(
  webInputFormat: string,
  webInputDelimiter: string
): Types.DatePickerWebInputFormat[] {
  return useMemo(() => {
    const formatElement = webInputFormat.split(webInputDelimiter);

    if (formatElement.length !== 3) {
      throw new Huds0nError({
        name: "huds0nInputError",
        code: "INVALID_WEB_INPUT_DATE_FORMAT",
        message: `WebInputFormat date components must be either 'DD', 'MM', or 'YYYY'. e.g. DD-MM-YYYY`,
        severity: "HIGH",
        info: { webInputFormat },
      });
    }

    return formatElement.map((formatElement) => {
      if (formatElement === "DD") return formatElement;
      if (formatElement === "MM") return formatElement;
      if (formatElement === "YYYY") return formatElement;

      throw new Huds0nError({
        name: "huds0nInputError",
        code: "INVALID_WEB_INPUT_DATE_FORMAT",
        message: `WebInputFormat date components must be either 'DD', 'MM', or 'YYYY'. e.g. DD-MM-YYYY`,
        severity: "HIGH",
        info: { webInputFormat },
      });
    });
  }, [webInputDelimiter]);
}

function handleFocusBlur(
  { onBlur, onFocus, setIsFocused, value }: Types.DatePickerProps,
  ref: React.RefObject<TextInputRN>,
  dateError: Types.ValidationError,
  setText: Function
) {
  const isFocused = InputState.useIsFocused(ref);

  useEffect(
    () => {
      if (isFocused) {
        ref.current?.focus();
        onFocus && onFocus(value, dateError);
      } else {
        setText("");
        onBlur && onBlur(value, dateError);
      }
      setIsFocused?.(isFocused);
    },
    [isFocused],
    { skipMounts: true }
  );

  return isFocused;
}
