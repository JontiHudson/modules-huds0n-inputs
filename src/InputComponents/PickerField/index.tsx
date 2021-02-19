import React from 'react';

import { InputField } from '../InputField';
import { PickerInput } from '../PickerInput';
import { handleFieldInputAware } from '../helpers';

import * as Types from '../../types';

import { theming } from './theming';

export namespace PickerField {
  export type Props<T = any> = InputField.ExtendProps<PickerInput.Props<T>> & {
    minimiseTitleOnNull?: boolean;
  };

  export type RefType = Types.RefType;

  export type ItemProps<T> = PickerInput.ItemProps<T>[];

  export type ValidationError = Types.Validation.Error;
  export type ValidationProp<T> = Types.Validation.Prop<T>;

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<RefType>
  > & { theming: typeof theming };
}

const _PickerField = React.forwardRef<PickerField.RefType, PickerField.Props>(
  (props, ref) => {
    const {
      minimiseTitleOnNull,
      value = props.value ?? null,
      ...restProps
    } = props;

    const { fieldProps, inputProps } = handleFieldInputAware(props);

    return (
      <InputField
        {...restProps}
        isEmpty={!minimiseTitleOnNull && value === null}
        {...fieldProps}
      >
        <PickerInput ref={ref} {...props} {...inputProps} />
      </InputField>
    );
  },
);

export const PickerField: PickerField.Component = Object.assign(_PickerField, {
  theming,
});
