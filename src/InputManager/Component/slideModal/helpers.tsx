import {
  Animated,
  Easing,
  findNodeHandle,
  Keyboard,
  TextInput,
  View,
} from "react-native";

import { measureNodeAsync } from "@huds0n/utilities";

import * as InputState from "../../../state";

const ANIMATION_DURATION = 250;

let _focusedNodePadding = 0;
let _screenRef: React.RefObject<View> | null = null;

export function initialise(
  focusedNodePadding: number,
  screenRef: React.RefObject<View>
) {
  _focusedNodePadding = focusedNodePadding;
  _screenRef = screenRef;
}

export const inputYAnim = new Animated.Value(0);
export const screenYAnim = new Animated.Value(0);
let _screenYCurrent = 0;

Keyboard.addListener("keyboardWillChangeFrame", async (keyboardChangeEvent) => {
  const {
    endCoordinates: { screenY },
  } = keyboardChangeEvent;

  if (TextInput.State.currentlyFocusedInput()) {
    await _moveScreen(screenY);
  }
});

// Keyboard.addListener('keyboardDidHide', () => {
//   if (!InputState.currentCustomInput()) {
//     InputState.dismissInput();
//   }
// });

InputState.addInputListener(({ focusedInput }) => {
  if (focusedInput === null) {
    _animateInput(0);
    _animateScreen(0);
  } else if (focusedInput.type === "KEYBOARD") {
    _animateInput(0);
  }
}, "focusedInput");

async function getPositionAsync(nodeId: number | string) {
  const { height, pageY } = await measureNodeAsync(nodeId);

  return { top: pageY, bottom: pageY + height };
}

function _animateInput(translateY: number) {
  return new Promise<boolean>((resolve) => {
    Animated.timing(inputYAnim, {
      easing: Easing.out(Easing.quad),
      toValue: translateY,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(({ finished }) => {
      resolve(finished);
      if (translateY === 0) {
        InputState.hideCustomInput();
      }
    });
  });
}

function _animateScreen(translateY: number) {
  // Fixes bug where screen sometimes doesn't move down after input closure
  const toValue = !!InputState.currentlyFocusedInput() ? translateY : 0;

  return new Promise<boolean>((resolve) => {
    Animated.timing(screenYAnim, {
      easing: Easing.out(Easing.quad),
      toValue,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(({ finished }) => {
      resolve(finished);

      if (finished) {
        _screenYCurrent = toValue;
      }
    });
  });
}

async function _moveScreen(inputTop: number) {
  const focusedInput = InputState.currentlyFocusedInput();

  const screenId = _screenRef && findNodeHandle(_screenRef.current);

  if (!focusedInput || !screenId) {
    return null;
  }

  const focusedPosition = await getPositionAsync(focusedInput.id);
  const containerPosition = await getPositionAsync(screenId);

  // containerPosition bottom can be measured as NaN during rotate
  if (isNaN(containerPosition.bottom)) {
    return null;
  }

  const inputRelativeToFocus =
    inputTop - focusedPosition.bottom - _focusedNodePadding;

  const newTranslation = _screenYCurrent + inputRelativeToFocus;

  // Stops screen ever being translated below the top edge
  if (newTranslation > 0) {
    return _animateScreen(0);
  }

  const maxTranslation = inputTop - containerPosition.bottom;

  // Stops screen ever being translated too high
  if (newTranslation < maxTranslation || _screenYCurrent < maxTranslation) {
    return _animateScreen(maxTranslation);
  }

  return _animateScreen(newTranslation);
}

export async function handleCustomInputChange(height: number) {
  if (_screenRef) {
    const { height: screenHeight, pageY: topOffset } = await measureNodeAsync(
      _screenRef.current
    );
    _moveScreen(screenHeight + topOffset - height);
    await _animateInput(-height);
  }
}
