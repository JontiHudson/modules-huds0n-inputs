import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Core } from '@huds0n/core';

import { Children } from './Children';
import { Message } from './Message';
import { Title } from './Title';
import { theming } from './theming';
import * as Types from './types';

export namespace InputField {
  export type ExtendProps<P extends {}> = Types.ExtendProps<P>;
  export type Props = Types.Props;
  export type ValidationError = Types.Props['error'];

  export type Component = React.FunctionComponent<Props> & {
    theming: typeof theming;
  };
}

const _InputField = (props: Types.Props) => {
  const {
    borderColor,
    containerStyle,
    contentsStyle,
    error,
    errorColor = Core.colors.ERROR,
    isEmpty,
    isFocused,
  } = props;

  const titleIsMinimised = isFocused || !isEmpty;

  const overrideColor = error ? errorColor : undefined;

  const childrenProps = {
    overrideColor,
    titleIsMinimised,
  };

  return (
    <View
      style={StyleSheet.flatten([
        {
          paddingBottom: Core.spacings.S,
          paddingTop: Core.spacings.M,
        },
        containerStyle,
      ])}
    >
      <View
        style={StyleSheet.flatten([
          {
            borderBottomWidth: 1,
            padding: Core.spacings.XS,
          },
          contentsStyle,
          { borderColor: overrideColor || borderColor },
        ])}
      >
        <View>
          <Title {...childrenProps} {...props} />
          <Children {...childrenProps} {...props} />
        </View>
      </View>
      <Message {...childrenProps} {...props} />
    </View>
  );
};

export const InputField = Object.assign(_InputField, { theming });
