import React from 'react';
import { View } from 'react-native';

import { Core } from '@huds0n/core';

import { Validation } from '../../types';

import { handleFieldInputAware } from '../helpers';
import { InputField } from '../InputField';
import { TextInput } from '../TextInput';

import { Prefix } from './Prefix';

import { theming } from './theming';
import * as Types from './types';

export namespace TextField {
  export type Props = Types.Props;

  export type RefType = Types.RefType;

  export type ValidationError = Validation.Error;
  export type ValidationProp<T> = Validation.Prop<T>;

  export type Component = Types.Component & { theming: typeof theming };
}

const _TextField = React.forwardRef<TextField.RefType, TextField.Props>(
  (props, ref) => {
    const { prefix, value, ...restProps } = props;

    const { fieldProps, inputProps } = handleFieldInputAware(props);

    return (
      <InputField isEmpty={!value} {...restProps} {...fieldProps}>
        <View style={{ flexDirection: 'row' }}>
          <Prefix {...props} error={fieldProps.error} />
          <View style={{ flex: 1 }}>
            <TextInput
              ref={ref}
              scrollEnabled={false}
              underlineColorAndroid={Core.colors.TRANSPARENT}
              {...restProps}
              {...inputProps}
              value={value}
              {...(!fieldProps.isFocused && { placeholder: undefined })}
            />
          </View>
        </View>
      </InputField>
    );
  },
);

export const TextField: TextField.Component = Object.assign(_TextField, {
  theming,
});
