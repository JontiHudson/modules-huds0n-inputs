import React from "react";
import { StyleSheet, View, ScaleYTransform } from "react-native";

import { useIsDarkMode } from "@huds0n/theming";
import { theme } from "@huds0n/theming/src/theme";
import { useCallback } from "@huds0n/utilities";
import { Icon } from "@huds0n/components";

import * as InputState from "../state";
import type { Types } from "../types";

export const Contents = React.memo(
  ({
    accessoryView: {
      iconDismiss = defaultIcons.dismiss,
      iconDown = defaultIcons.down,
      iconSubmit = defaultIcons.submit,
      iconUp = defaultIcons.up,
    } = {},
    inputColors,
  }: Types.InputManagerProps) => {
    const isDark = useIsDarkMode();

    const keyboardColor = theme.colors.KEYBOARD;
    const contentsColor =
      inputColors?.contents || isDark ? theme.colors.WHITE : theme.colors.BLACK;

    // Recent input is used so appearance of accessory view remains constants during closing when focusedInput is set to null
    const { downPress, submitPress, upPress } = InputState.useAccessoryView();

    const handleDownPress = useCallback(
      () => downPress && downPress(),
      [downPress]
    );

    const handleSubmitPress = useCallback(() => {
      InputState.dismissInput();
      submitPress && submitPress();
    }, [submitPress]);
    const handleUpPress = useCallback(() => upPress && upPress(), [upPress]);

    const SecondIcon =
      submitPress && !downPress ? (
        <Icon
          color={contentsColor}
          disabled={!submitPress}
          onPress={handleSubmitPress}
          {...iconSubmit}
        />
      ) : (
        <Icon
          color={contentsColor}
          disabled={!downPress}
          onPress={handleDownPress}
          {...iconDown}
        />
      );

    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: keyboardColor,
          borderColor: contentsColor,
          borderTopWidth: StyleSheet.hairlineWidth,
          flexDirection: "row",
          paddingHorizontal: theme.spacings.M,
          paddingVertical: theme.spacings.S,
          width: "100%",
        }}
      >
        <Icon
          color={contentsColor}
          disabled={!upPress}
          onPress={handleUpPress}
          {...iconUp}
        />
        <View style={{ width: 5 }} />
        {SecondIcon}
        <View style={{ flex: 1 }} />
        <Icon
          color={contentsColor}
          onPress={InputState.dismissInput}
          {...iconDismiss}
        />
      </View>
    );
  }
);

const defaultIcons = {
  dismiss: {
    name: "keyboard-close",
    set: "MaterialCommunityIcons",
    size: 26,
    containerStyle: { transform: [{ scaleY: 0.8 }] as ScaleYTransform[] },
  },
  down: {
    name: "chevron-down",
    set: "Feather",
    size: 36,
    containerStyle: { margin: -5 },
  },
  up: {
    name: "chevron-up",
    set: "Feather",
    size: 36,
    containerStyle: { margin: -5 },
  },
  submit: {
    name: "send",
    set: "Feather",
    size: 20,
  },
} as const;
