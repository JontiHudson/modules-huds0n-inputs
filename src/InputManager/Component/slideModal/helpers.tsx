import {
  Animated,
  Dimensions,
  Easing,
  findNodeHandle,
  Keyboard,
  KeyboardEvent,
  TextInput,
} from 'react-native';

import { SharedState } from '@huds0n/shared-state';
import { Core } from '@huds0n/core';
import { measureNodeAsync } from '@huds0n/utilities';

import { InputType, SlideModalControllerType } from '../../types';

class SlideModalState extends SharedState<SlideModalControllerType> {
  private _focusedNodePadding = 0;
  private _inputYAnim = new Animated.Value(0);
  private _screenNodeId = null as null | number;
  private _screenYAnim = new Animated.Value(0);
  private _screenYCurrent = 0;

  private static async getPositionAsync(nodeId: number) {
    const { height, pageY } = await measureNodeAsync(nodeId);

    return { top: pageY, bottom: pageY + height };
  }

  private static keyboardIsClosing({ endCoordinates }: KeyboardEvent) {
    const { height, width } = Dimensions.get('window');

    if (
      (endCoordinates.width === width && endCoordinates.screenY === height) ||
      (endCoordinates.width === height && endCoordinates.screenY === width)
    ) {
      return true;
    }
    return false;
  }

  constructor() {
    super({
      customInputComponent: null,
      customInputState: 'CLOSED',
      focusedNodeId: null,
      focusedNodeType: null,
      inputHeight: 0,
    });

    this.addKeyboardListeners();
    this.bindMethods();
  }

  get inputYAnim() {
    return this._inputYAnim;
  }

  get screenYAnim() {
    return this._screenYAnim;
  }

  set focusedNodePadding(value: number) {
    this._focusedNodePadding = value;
  }

  set screenNodeId(value: number) {
    this._screenNodeId = value;
  }

  addKeyboardListeners() {
    Keyboard.addListener(
      'keyboardWillChangeFrame',
      async (keyboardChangeEvent) => {
        const {
          endCoordinates: { screenY },
          // @ts-ignore
          isEventFromThisApp,
        } = keyboardChangeEvent;

        if (
          isEventFromThisApp &&
          !SlideModalState.keyboardIsClosing(keyboardChangeEvent)
        ) {
          const newFocusedTextInput = findNodeHandle(
            TextInput.State.currentlyFocusedInput(),
          );

          if (newFocusedTextInput !== null) {
            this.closeInput('CUSTOM');

            this.setFocusedNode(newFocusedTextInput, 'KEYBOARD');

            await this.moveScreen(screenY);
          }
        }
      },
    );

    Keyboard.addListener('keyboardDidHide', () => {
      if (this.state.focusedNodeType === 'KEYBOARD') {
        this.setFocusedNode(null);
        this.animateScreen(0);
      }
    });
  }

  bindMethods() {
    this.dismissInput = this.dismissInput.bind(this);
    this.getFocusedNodeId = this.getFocusedNodeId.bind(this);
    this.handleCustomInputChange = this.handleCustomInputChange.bind(this);
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

    // Prevents stutter when one input is focusing to another
    requestAnimationFrame(() => {
      if (!this.state.focusedNodeId) {
        this.animateScreen(offset);
      }
    });
  }

  private async closeCustomInput() {
    requestAnimationFrame(async () => {
      const { customInputState, focusedNodeType } = this.state;

      if (focusedNodeType !== 'CUSTOM' && customInputState !== 'CLOSED') {
        this.setState({ inputHeight: 0, customInputState: 'CLOSING' });

        const finished = await this.animateInput(0);

        if (finished && this.state.customInputState === 'CLOSING') {
          // Unmounts input component once closed

          this.setState({
            customInputComponent: null,
            customInputState: 'CLOSED',
          });
        }
      }
    });
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

  private animateInput(translateY: number) {
    return new Promise<boolean>((resolve) => {
      Animated.timing(this._inputYAnim, {
        easing: Easing.out(Easing.quad),
        toValue: translateY,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished }) => resolve(finished));
    });
  }

  private animateScreen(translateY: number) {
    // Fixes bug where screen sometimes doesn't move down after input closure
    const toValue = this.getFocusedNodeId() !== null ? translateY : 0;

    return new Promise<boolean>((resolve) => {
      Animated.timing(this._screenYAnim, {
        easing: Easing.out(Easing.quad),
        toValue,
        duration: 250,
        useNativeDriver: true,
      }).start(({ finished }) => {
        resolve(finished);

        if (finished) {
          this._screenYCurrent = toValue;
        }
      });
    });
  }

  private async moveScreen(inputTop: number) {
    const { focusedNodeId } = this.state;

    if (!focusedNodeId || !this._screenNodeId) {
      return null;
    }

    const focusedPosition = await SlideModalState.getPositionAsync(
      focusedNodeId,
    );
    const containerPosition = await SlideModalState.getPositionAsync(
      this._screenNodeId,
    );

    // containerPosition bottom can be measured as NaN during rotate
    if (isNaN(containerPosition.bottom)) {
      return null;
    }

    const inputRelativeToFocus =
      inputTop - focusedPosition.bottom - this._focusedNodePadding;

    const newTranslation = this._screenYCurrent + inputRelativeToFocus;

    // Stops screen ever being translated below the top edge
    if (newTranslation > 0) {
      return this.animateScreen(0);
    }

    const maxTranslation = inputTop - containerPosition.bottom;

    // Stops screen ever being translated too high
    if (
      newTranslation < maxTranslation ||
      this._screenYCurrent < maxTranslation
    ) {
      return this.animateScreen(maxTranslation);
    }

    return this.animateScreen(newTranslation);
  }

  async handleCustomInputChange(inputHeight: number) {
    const { focusedNodeId, focusedNodeType } = this.state;

    if (!inputHeight) {
      this.closeCustomInput();
    } else if (
      this._screenNodeId &&
      focusedNodeId &&
      focusedNodeType === 'CUSTOM'
    ) {
      this.setState({
        inputHeight,
        customInputState: 'CHANGING',
      });

      const containerPosition = await SlideModalState.getPositionAsync(
        this._screenNodeId,
      );

      const inputTop = containerPosition.bottom - inputHeight;

      this.moveScreen(inputTop);
      const finished = await this.animateInput(-inputHeight);

      finished &&
        this.setState({
          customInputState: 'OPEN',
        });
    }
  }

  setCustomInputComponent(customInputComponent: React.ReactElement) {
    this.setState({ customInputComponent });

    this.closeInput('KEYBOARD');
  }
}

export const SlideModalController = new SlideModalState();

SlideModalController.addListener(
  'focusedNodeId',
  ({ focusedNodeId, focusedNodeType }) => {
    Core.setState({
      focusedNode: focusedNodeId
        ? { id: focusedNodeId, type: focusedNodeType }
        : null,
    });
  },
);

SlideModalController.addListener('customInputState', ({ customInputState }) => {
  Core.setState({ customInputState });
});

Core.dismissInput = SlideModalController.dismissInput;
