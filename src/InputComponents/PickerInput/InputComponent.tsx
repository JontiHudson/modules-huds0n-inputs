import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Pressable } from "@huds0n/components";
import { useIsDarkMode } from "@huds0n/theming";
import { theme } from "@huds0n/theming/src/theme";
import { useCallback, useMemo } from "@huds0n/utilities";

import { InputManager } from "../../InputManager";
import type { Types } from "../../types";

import { InputComponentPlatform } from "./InputComponentPlatform";

export function InputComponent<T = any>(
  props: Types.CustomInputSubComponentProps<T, Types.PickerSpecficProps<T>>
) {
  const {
    nullable = true,
    nullPlaceholderStyle,
    nullLabel = "- Please Select -",
    pickerItems,
  } = props;

  const isDark = useIsDarkMode();

  const contentsColor = isDark ? theme.colors.WHITE : theme.colors.BLACK;

  const pickerItemsProps = useMemo(
    (): Types.PickItemProps<T | null>[] =>
      nullable
        ? [
            {
              color: (nullPlaceholderStyle?.color as string) || "gray",
              label: nullLabel || "",
              value: null,
            },
            ...pickerItems,
          ]
        : pickerItems,
    [nullable, nullPlaceholderStyle?.color, nullLabel, pickerItems]
  );

  return (
    <InputComponentPlatform
      {...props}
      contentsColor={contentsColor}
      pickerItemsProps={pickerItemsProps}
    />
  );
}
