import { Core } from '@huds0n/core';
import { Keyboard } from 'react-native';

import { useEffect, useState } from '@huds0n/utilities';

export function useInputState() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [customInputOpen, setInputOpen] = useState(false);

  useEffect(
    () => {
      const keyboardShowListener = Keyboard.addListener(
        'keyboardWillShow',
        () => {
          setKeyboardOpen(true);
        },
      );

      const keyboardHideListener = Keyboard.addListener(
        'keyboardWillHide',
        () => {
          setKeyboardOpen(false);
        },
      );

      const removeCustomInputListener = Core.addListener(
        'customInputState',
        ({ customInputState }) => {
          setInputOpen(customInputState !== 'CLOSED');
        },
      );

      return () => {
        keyboardShowListener.remove();
        keyboardHideListener.remove();
        removeCustomInputListener();
      };
    },
    [],
    { layout: 'BEFORE' },
  );

  return {
    customInputOpen,
    inputOpen: keyboardOpen || customInputOpen,
    keyboardOpen,
  };
}
