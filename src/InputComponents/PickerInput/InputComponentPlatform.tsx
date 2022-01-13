import React from "react";
import { Platform, ScrollView, Text, View } from "react-native";

import { Pressable } from "@huds0n/components";
import { theme } from "@huds0n/theming/src/theme";
import { useCallback } from "@huds0n/utilities";

import { InputManager } from "../../InputManager";
import type { Types } from "../../types";

export function InputComponentPlatform<T = any>({
  onValueChange,
  contentsColor,
  pickerItemsProps,
}: Types.CustomInputSubComponentProps<T, Types.PickerSpecficProps<T>> & {
  contentsColor: string;
  pickerItemsProps: Types.PickItemProps<T | null>[];
}) {
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
      <ScrollView>{pickerItemsProps.map(renderItem)}</ScrollView>
    </View>
  ) : (
    <ScrollView>{pickerItemsProps.map(renderItem)}</ScrollView>
  );
}
