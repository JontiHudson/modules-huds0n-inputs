import React from "react";
import { Platform, TextInput as TextInputRN } from "react-native";

import { getNodeId, useEffect } from "@huds0n/utilities";
import { theme } from "@huds0n/theming/src/theme";

import * as InputState from "../../state";
import type { Types } from "../../types";

export function getSubmitPress(
  props: Types.TextInputProps,
  error: Types.ValidationError
) {
  const { onSubmitEditing, value } = props;

  if (!error && onSubmitEditing) {
    return () => {
      onSubmitEditing(value, error);
    };
  }
  return undefined;
}

export function handleAndroidBlurOnKeyboardHide(
  ref: React.RefObject<TextInputRN>
) {
  if (Platform.OS === "android") {
    const textInputId = getNodeId(ref.current, true);
    const focusedInput = InputState.useFocusedInput();

    useEffect(
      () => {
        if (
          !focusedInput &&
          textInputId ===
            getNodeId(TextInputRN.State.currentlyFocusedInput(), true)
        ) {
          ref.current?.blur();
        }
      },
      [focusedInput],
      { layout: "BEFORE" }
    );
  }
}

export const defaultStyles = {
  base: {
    get color() {
      return theme.colors.TEXT;
    },
    paddingTop: 0,
    fontSize: theme.fontSizes.BODY,
    ...(Platform.OS === "web" && {
      outlineStyle: "none",
    }),
  },
  disabled: {
    get color() {
      return theme.colors.DISABLED;
    },
  },
  error: {
    get color() {
      return theme.colors.ERROR;
    },
  },
};
