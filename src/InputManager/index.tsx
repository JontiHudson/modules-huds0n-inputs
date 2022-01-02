import * as InputState from '../state';
import * as Types from '../types';

import { InputManagerComponent } from './Component';

export namespace InputManager {
  export type Props = Types.InputManagerProps;
}

export const InputManager = Object.assign(InputManagerComponent, {
  dismiss: InputState.dismissInput,
  useFocusedId: InputState.useFocusedInput,
  useCustomInput: InputState.useCustomInput,
});
