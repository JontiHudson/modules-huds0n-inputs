import * as InputState from "../state";

import { InputManagerComponent } from "./Component";

export const InputManager = Object.assign(InputManagerComponent, {
  dismiss: InputState.dismissInput,
  useFocusedId: InputState.useFocusedInput,
  useCustomInput: InputState.useCustomInput,
});
