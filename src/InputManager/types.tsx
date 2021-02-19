import { StyleProp, ViewStyle } from 'react-native';

import { Icon } from '@huds0n/components';

export type AccessoryViewProps = {
  containerStyle?: StyleProp<ViewStyle>;
  iconDismiss?: Icon.Props;
  iconDown?: Icon.Props;
  iconSubmit?: Icon.Props;
  iconUp?: Icon.Props;
};

export type InputManagerProps = {
  accessoryView?: AccessoryViewProps;
  children: React.ReactNode | React.ReactNode[];
  focusedNodePadding?: number;
};

export type InputState = 'CHANGING' | 'CLOSED' | 'CLOSING' | 'OPEN' | 'OPENING';
export type InputType = 'KEYBOARD' | 'CUSTOM';
export type PositionType = { top: number; bottom: number };

export type OverlayModalControllerType = {
  customInputComponent: null | React.ReactElement;
  customInputState: InputState;
  focusedNodeId: number | null;
  focusedNodeType: InputType | null;
};

export type SlideModalControllerType = OverlayModalControllerType & {
  inputHeight: number;
};
