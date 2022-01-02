import React from 'react';
import { View } from 'react-native';

import { theme } from '@huds0n/theming/src/theme';

import { Validation } from '../../types';

import { handleFieldInputAware } from '../helpers';
import { InputField } from '../InputField';
import { TextInput } from '../TextInput';

import { Prefix } from './Prefix';
import * as Types from './types';

export namespace TextField {
  export type Props = Types.Props;

  export type RefType = Types.RefType;

  export type ValidationError = Validation.Error;
  export type ValidationProp<T> = Validation.Prop<T>;

  export type Component = Types.Component;
}

export const TextField: TextField.Component = React.forwardRef<
  TextField.RefType,
  TextField.Props
>((props, ref) => {
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
            underlineColorAndroid={theme.colors.TRANSPARENT}
            {...restProps}
            {...inputProps}
            value={value}
            {...(!fieldProps.isFocused && { placeholder: undefined })}
          />
        </View>
      </View>
    </InputField>
  );
});
