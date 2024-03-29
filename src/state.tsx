import React from "react";
import { Keyboard, TextInput } from "react-native";

import { getNodeId } from "@huds0n/utilities";
import { huds0nState } from "@huds0n/utilities/src/_core";
import { SharedState } from "@huds0n/shared-state";

import type { Types } from "./types";

type FocusedInput = {
  id: number | string;
  type: "KEYBOARD" | "CUSTOM";
};

type CustomInput<P = any> = {
  Component?: React.ComponentType<P>;
  props: P;
};

type InputState = {
  accessoryView: Types.AccessoryViewProps;
  customInput: CustomInput | null;
  focusedInput: FocusedInput | null;
};

const _internalState = new SharedState<InputState>({
  customInput: null,
  focusedInput: null,
  accessoryView: { downPress: null, upPress: null, submitPress: null },
});

export function currentlyFocusedInput() {
  return _internalState.state.focusedInput;
}

export function currentCustomInput() {
  return _internalState.state.customInput;
}

export function isFocused(ref: React.MutableRefObject<any>) {
  return (
    !!ref.current &&
    _internalState.state.focusedInput?.id === getNodeId(ref.current)
  );
}

export function focusTextInput(
  ref: React.RefObject<TextInput>,
  accessoryView: Types.AccessoryViewProps
) {
  _internalState.setState({
    focusedInput: { id: getNodeId(ref.current), type: "KEYBOARD" },
    ...(accessoryView && { accessoryView }),
  });
}

export function updateCustomInput(
  ref: React.MutableRefObject<number | string | undefined>,
  customInput: CustomInput,
  accessoryView: Types.AccessoryViewProps
) {
  if (ref.current) {
    Keyboard.dismiss();
    _internalState.setState({
      focusedInput: { id: ref.current, type: "CUSTOM" },
      customInput,
      ...(accessoryView && { accessoryView }),
    });
  }
}

export function hideCustomInput() {
  _internalState.setState({ customInput: null });
}

export function rerenderCustomInput() {}

export function updateAccessoryView(accessoryView: Types.AccessoryViewProps) {
  _internalState.setState({ accessoryView });
}

export function dismissInput() {
  Keyboard.dismiss();

  _internalState.setState({
    focusedInput: null,
  });
}

export function useFocusedInput() {
  return _internalState.useProp("focusedInput")[0];
}

export function useIsFocused(ref: React.MutableRefObject<any>) {
  const focusedInput = useFocusedInput();
  return !!ref.current && focusedInput?.id === getNodeId(ref.current);
}

export function useCustomInput() {
  return _internalState.useProp("customInput")[0];
}

export function useAccessoryView() {
  return _internalState.useProp("accessoryView")[0];
}

export const addInputListener = _internalState.addListener;

huds0nState.setState({
  dismissInput,
});

_internalState.addListener(
  ({ focusedInput, customInput }) => {
    huds0nState.setState({
      focusedId: focusedInput?.id || null,
      isCustomInputOpen: !!customInput,
    });
  },
  ["focusedInput", "customInput"]
);
