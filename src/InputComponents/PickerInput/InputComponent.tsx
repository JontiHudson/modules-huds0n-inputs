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

export function InputComponent<T = any>({
  onValueChange,
  nullable = true,
  nullPlaceholderStyle,
  nullLabel = "- Please Select -",
  pickerItems,
  style,
  value,
  onBlur,
  onFocus,
  ...rest
}: Types.CustomInputSubComponentProps<T, Types.PickerSpecficProps<T>>) {
  const isDark = useIsDarkMode();

  const contentsColor = isDark ? theme.colors.WHITE : theme.colors.BLACK;

  const _pickerItems = useMemo(
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

  if (Platform.OS === "ios") {
    const PickerItems = useMemo(() => {
      return _pickerItems.map((pickerItem) => (
        <Picker.Item
          key={pickerItem.label || "_NULL_"}
          {...pickerItem}
          color={pickerItem.color || contentsColor}
        />
      ));
    }, [_pickerItems, contentsColor]);

    return (
      <View
        style={StyleSheet.flatten([
          { maxHeight: Dimensions.get("window").height },
        ])}
      >
        <Picker selectedValue={value} onValueChange={onValueChange} {...rest}>
          {PickerItems}
        </Picker>
      </View>
    );
  }

  const renderItem = useCallback(
    (item, index) => (
      <Pressable
        feedback="fade"
        key={index.toString()}
        style={{ padding: theme.spacings.M }}
        onPress={() => {
          onValueChange(item.value);
          InputManager.dismiss();
        }}
      >
        <Text
          style={{
            color: item.color || contentsColor,
            fontSize: theme.fontSizes.LABEL,
          }}
        >
          {item.label}
        </Text>
      </Pressable>
    ),
    [onValueChange, contentsColor]
  );

  return Platform.OS === "android" ? (
    <View>
      <ScrollView>{_pickerItems.map(renderItem)}</ScrollView>
    </View>
  ) : (
    <ScrollView>{_pickerItems.map(renderItem)}</ScrollView>
  );
}
