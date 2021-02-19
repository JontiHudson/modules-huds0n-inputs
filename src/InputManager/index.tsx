import { Core } from '@huds0n/core';

import { InputManagerComponent, dismissInput } from './Component';
import { useInputState } from './helpers';
import * as Types from './types';

export namespace InputManager {
  export type Props = Types.InputManagerProps;
}

export const InputManager = Object.assign(InputManagerComponent, {
  dismiss: dismissInput,
  setDarkMode: Core.setDarkMode,
  useInputState,
});
