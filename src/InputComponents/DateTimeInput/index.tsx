import { Platform } from 'react-native';

import { DateTimeWeb } from './ComponentWeb';
import { createCustomInput } from '../CustomInput';
import { InputComponentIOS } from './InputComponentIOS';
import { OutputComponent } from './OutputComponent';

import { Validation } from '../../types';

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
  >;
}

export const DateTimeInput: DateTimeInput.Component =
  Platform.OS === 'web'
    ? DateTimeWeb
    : createCustomInput(
        OutputComponent,
        Platform.OS === 'ios' ? InputComponentIOS : undefined,
      );
