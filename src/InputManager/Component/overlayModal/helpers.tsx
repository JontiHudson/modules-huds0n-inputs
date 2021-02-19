import {
  Animated,
  Easing,
  Keyboard,
  findNodeHandle,
  TextInput,
} from 'react-native';

import { SharedState } from '@huds0n/shared-state';
import { Core } from '@huds0n/core';

import { InputType, OverlayModalControllerType } from '../../types';

class OverlayModalState extends SharedState<OverlayModalControllerType> {
  private _inputOpacityAnim = new Animated.Value(0);

  constructor() {
    super({
      customInputComponent: null,
      customInputState: 'CLOSED',
      focusedNodeId: null,
      focusedNodeType: null,
    });

    this.addKeyboardListeners();
    this.bindMethods();
  }

  get inputOpacityAnim() {
    return this._inputOpacityAnim;
  }

  addKeyboardListeners() {
    Keyboard.addListener('keyboardDidShow', () => {
      const newFocusedTextInput = findNodeHandle(
        TextInput.State.currentlyFocusedInput(),
      );

      if (newFocusedTextInput !== null) {
        this.setFocusedNode(newFocusedTextInput, 'KEYBOARD');
      }
    });

    Keyboard.addListener('keyboardDidHide', () => {
      if (this.state.focusedNodeType === 'KEYBOARD') {
        this.setFocusedNode(null);
      }
    });
  }

  bindMethods() {
    this.dismissInput = this.dismissInput.bind(this);
    this.getFocusedNodeId = this.getFocusedNodeId.bind(this);
    this.setCustomInputComponent = this.setCustomInputComponent.bind(this);
    this.setFocusedNode = this.setFocusedNode.bind(this);
    this.useFocusedNodeId = this.useFocusedNodeId.bind(this);
  }

  getFocusedNodeId() {
    return this.state.focusedNodeId;
  }

  useFocusedNodeId() {
    return this.useState('focusedNodeId')[0].focusedNodeId;
  }

  setFocusedNode(
    focusedNodeId: number | null,
    focusedNodeType: 'CUSTOM' | 'KEYBOARD' | null = null,
  ) {
    this.setState({
      focusedNodeId,
      focusedNodeType,
    });
  }

  dismissInput() {
    this.resetController();
  }

  private resetController(offset = 0) {
    this.setFocusedNode(null);

    this.closeCustomInput();
    Keyboard.dismiss();
  }

  private async closeCustomInput() {
    const { customInputState } = this.state;

    if (customInputState === 'OPEN' || customInputState === 'OPENING') {
      this.setState({ customInputState: 'CLOSING' });
      const finished = await this.animateInput(0);

      if (finished && this.state.customInputState === 'CLOSING') {
        // Unmounts input component once closed

        this.setState({
          customInputComponent: null,
          customInputState: 'CLOSED',
        });
      }
    }
  }

  private closeInput(inputType?: InputType) {
    switch (inputType) {
      case 'CUSTOM':
        this.closeCustomInput();
        break;
      case 'KEYBOARD':
        Keyboard.dismiss();
        break;
      default:
        this.resetController();
    }
  }

  private animateInput(opacity: number) {
    return new Promise<boolean>((resolve) => {
      Animated.timing(this._inputOpacityAnim, {
        easing: Easing.out(Easing.quad),
        toValue: opacity,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished }) => resolve(finished));
    });
  }

  async setCustomInputComponent(customInputComponent: React.ReactElement) {
    this.setState({ customInputComponent, customInputState: 'OPENING' });

    this.closeInput('KEYBOARD');

    const finished = await this.animateInput(1);

    if (finished && this.state.customInputState === 'OPENING') {
      this.setState({ customInputState: 'OPEN' });
    }
  }
}

export const OverlayModalController = new OverlayModalState();

OverlayModalController.addListener(
  'focusedNodeId',
  ({ focusedNodeId, focusedNodeType }) => {
    Core.setState({
      focusedNode: focusedNodeId
        ? { id: focusedNodeId, type: focusedNodeType }
        : null,
    });
  },
);

OverlayModalController.addListener(
  'customInputState',
  ({ customInputState }) => {
    Core.setState({ customInputState });
  },
);

Core.dismissInput = OverlayModalController.dismissInput;
