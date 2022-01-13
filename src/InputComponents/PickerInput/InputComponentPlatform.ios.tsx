import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useCallback, useMemo } from "@huds0n/utilities";

import type { Types } from "../../types";

export function InputComponentPlatform<T = any>({
  onValueChange,
  style,
  value,
  onBlur,
  onFocus,
  contentsColor,
  pickerItemsProps,
  ...rest
}: Types.CustomInputSubComponentProps<T, Types.PickerSpecficProps<T>> & {
  contentsColor: string;
  pickerItemsProps: Types.PickItemProps<T | null>[];
}) {
  const PickerItems = useMemo(() => {
    return pickerItemsProps.map((pickerItemProps) => (
      <Picker.Item
        key={pickerItemProps.label || "_NULL_"}
        {...pickerItemProps}
        color={pickerItemProps.color || contentsColor}
      />
    ));
  }, [pickerItemsProps, contentsColor]);

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
