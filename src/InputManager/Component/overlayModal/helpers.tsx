import { Animated, Easing, EmitterSubscription, Keyboard } from "react-native";

import * as InputState from "../../../state";

export const inputOpacityAnim = new Animated.Value(0);

Keyboard.addListener("keyboardDidHide", async () => {
  // On android return key will hide then show keyboard when focusing the new input. THe following prevents input focus being dismissed on changing focus
  let listener: EmitterSubscription | null = null;
  const isChangeFocus = await new Promise<boolean>((resolve) => {
    listener = Keyboard.addListener("keyboardDidShow", () => {
      resolve(true);
    });

    setTimeout(() => {
      resolve(false);
    }, 500);
  }).finally(() => {
    if (listener) listener.remove();
  });

  if (!isChangeFocus && !InputState.currentCustomInput()) {
    InputState.dismissInput();
  }
});

InputState.addInputListener(async ({ focusedInput, customInput }) => {
  if (customInput) {
    _animateInput(focusedInput?.type === "CUSTOM" ? 1 : 0);
  }
}, "focusedInput");

function _animateInput(opacity: number) {
  Animated.timing(inputOpacityAnim, {
    easing: Easing.out(Easing.quad),
    toValue: opacity,
    duration: 250,
    useNativeDriver: true,
  }).start(({ finished }) => {
    if (
      opacity === 0 &&
      finished &&
      InputState.currentlyFocusedInput() === null
    ) {
      InputState.hideCustomInput();
    }
  });
}
