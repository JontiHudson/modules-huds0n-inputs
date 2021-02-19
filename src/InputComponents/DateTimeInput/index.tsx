import { Platform } from 'react-native';

import { createCustomInput } from '../CustomInput';
import { InputComponentIOS } from './InputComponentIOS';
import { OutputComponent } from './OutputComponent';

import { Validation } from '../../types';

import { theming } from './theming';
import * as Types from './types';

export namespace DateTimeInput {
  export type FormatDisplayFn = Types.FormatDisplayFn;
  export type MinuteInterval = Types.MinuteInterval;
  export type Mode = Types.Mode;
  export type Props = Types.Props;
  export type Value = Types.Value;

  export type RefType = Types.RefType;

  export type ValidationError = Validation.Error;
  export type ValidationProp<T> = Validation.Prop<T>;

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<RefType>
  > & { theming: typeof theming };
}

export const DateTimeInput: DateTimeInput.Component = Object.assign(
  createCustomInput(
    OutputComponent,
    Platform.OS === 'ios' ? InputComponentIOS : undefined,
  ),
  { theming },
);
