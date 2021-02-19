import { createCustomInput } from '../CustomInput';
import { InputComponent } from './InputComponent';
import { OutputComponent } from './OutputComponent';

import { Validation } from '../../types';

import { theming } from './theming';
import * as Types from './types';

export namespace PickerInput {
  export type ItemProps<T> = Types.ItemProps<T>[];
  export type Props<T> = Types.Props<T>;

  export type RefType = Types.RefType;

  export type ValidationError = Validation.Error;
  export type ValidationProp<T> = Validation.Prop<T>;

  export type Component = Types.Component & { theming: typeof theming };
}

export const PickerInput: PickerInput.Component = Object.assign(
  createCustomInput<Types.SpecficProps<any>, any>(
    OutputComponent,
    InputComponent,
  ),
  { theming },
);

export * from './helpers';
