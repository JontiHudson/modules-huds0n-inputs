import React from "react";
import { View } from "react-native";

import { AnimatedView } from "@huds0n/animations";
import { Icon } from "@huds0n/components";
import { theme } from "@huds0n/theming/src/theme";

import type { Types } from "../../types";

import { getHasValue } from "./helpers";
import { InputWrapper } from "./InputWrapper";

const { colors, dimensions, fontSizes, spacings } = theme;

const ANIMATION_DURATION = 300;
const TITLE_ANIMATE_SCALE = 0.7;

export function InputField(props: Types.InputFieldProps) {
  return (
    <InputWrapper
      onPress={!props.isFocused ? props.focus : undefined}
      containerStyle={{
        marginTop: spacings.M,
        paddingBottom: spacings.L,
        maxWidth: dimensions.INPUT_WIDTH,
        width: "100%",
      }}
      contentsContainerStyle={{
        base: {
          borderRadius: spacings.M,
          borderWidth: 1,
          flexDirection: "row",
          padding: spacings.M,
        },
        baseAnim: { borderColor: colors.BORDER },
        focusedAnim: { borderColor: colors.PRIMARY },
        animate: { duration: ANIMATION_DURATION },
      }}
      titleContainerStyle={{
        position: "absolute",
        padding: spacings.M,
      }}
      titleStyle={{
        base: {
          color: colors.TEXT,
          fontSize: fontSizes.BODY,
          top: 0,
          left: 0,
          width: dimensions.INPUT_WIDTH,
        },
        baseAnim: {
          opacity: 0.6,
          transform: [
            { translateY: 0 },
            { translateX: props.icon ? 24 : 0 },
            { scale: 1 },
          ],
        },
        focusedAnim: {
          opacity: 1,
          transform: [
            { translateY: -34 },
            {
              translateX:
                -dimensions.INPUT_WIDTH * (1 - TITLE_ANIMATE_SCALE) * 0.5,
            },
            { scale: TITLE_ANIMATE_SCALE },
          ],
        },
        hasValueAnim: {
          opacity: 1,
          transform: [
            { translateY: -34 },
            {
              translateX:
                -dimensions.INPUT_WIDTH * (1 - TITLE_ANIMATE_SCALE) * 0.5,
            },
            { scale: TITLE_ANIMATE_SCALE },
          ],
        },
        animate: { duration: ANIMATION_DURATION, useNativeDriver: true },
      }}
      messageContainerStyle={{
        baseAnim: {
          transform: [{ translateY: -20 }],
        },
        hasValueAnim: {
          transform: [{ translateY: 0 }],
        },
        animate: { duration: ANIMATION_DURATION, useNativeDriver: true },
      }}
      messageWrapperStyle={{
        alignItems: "flex-end",
        bottom: 0,
        height: 20,
        justifyContent: "flex-end",
        overflow: "hidden",
        position: "absolute",
        width: "100%",
      }}
      messageStyle={{
        baseAnim: { color: colors.TEXT },
        errorAnim: { color: colors.ERROR },
        animate: { duration: ANIMATION_DURATION },
      }}
      {...props}
    >
      {props.icon && (
        <>
          <Icon
            {...props.icon}
            color={props.error ? colors.ERROR : colors.TEXT}
          />
          <View style={{ width: spacings.M }} />
        </>
      )}

      <AnimatedView
        animate={{
          to: { opacity: props.isFocused || getHasValue(props.value) ? 1 : 0 },
          duration: ANIMATION_DURATION,
        }}
        style={{ flex: 1 }}
        useNativeDriver
      >
        {props.children}
      </AnimatedView>
    </InputWrapper>
  );
}
