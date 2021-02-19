import React from 'react';

import * as Types from '../../types';

import { DateTimeInput } from '../DateTimeInput';
import { handleFieldInputAware } from '../helpers';
import { InputField } from '../InputField';

import { theming } from './theming';

export namespace DateTimeField {
  export type Props = InputField.ExtendProps<DateTimeInput.Props> & {
    minimiseTitleOnNull?: boolean;
  };

  export type FormatDisplayFn = DateTimeInput.FormatDisplayFn;
  export type MinuteInterval = DateTimeInput.MinuteInterval;
  export type Mode = DateTimeInput.Mode;
  export type Value = DateTimeInput.Value;

  export type RefType = Types.RefType;

  export type ValidationError = Types.Validation.Error;
  export type ValidationProp<T> = Types.Validation.Prop<T>;

  export type Component = React.ForwardRefExoticComponent<
    Props & React.RefAttributes<RefType>
  > & { theming: typeof theming };
}

const _DateTimeField = React.forwardRef<
  DateTimeField.RefType,
  DateTimeField.Props
>((props, ref) => {
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
      <DateTimeInput ref={ref} {...props} {...inputProps} />
    </InputField>
  );
});

export const DateTimeField: DateTimeField.Component = Object.assign(
  _DateTimeField,
  { theming },
);
