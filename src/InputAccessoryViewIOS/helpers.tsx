import { SharedState } from '@huds0n/shared-state';

import { OptionalFunction } from '../types';

export const INPUT_ACCESSORY_VIEW_ID = '_accessoryViewId';

export type State = {
  downPress: OptionalFunction;
  submitPress: OptionalFunction;
  upPress: OptionalFunction;
};

export const InputAccessoryState = new SharedState<State>({
  downPress: undefined,
  submitPress: undefined,
  upPress: undefined,
});
