import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '@huds0n/theming/src/theme';

import { Children } from './Children';
import { Message } from './Message';
import { Title } from './Title';

import * as Types from './types';

export namespace InputField {
  export type ExtendProps<P extends {}> = Types.ExtendProps<P>;
  export type Props = Types.Props;
  export type ValidationError = Types.Props['error'];

  export type Component = React.FunctionComponent<Props>;
}

export const InputField = (props: Types.Props) => {
  const {
    borderColor = theme.colors.BORDER,
    containerStyle,
    contentsStyle,
    error,
    errorColor = theme.colors.ERROR,
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
          paddingBottom: theme.spacings.S,
          paddingTop: theme.spacings.M,
          maxWidth: theme.dimensions.INPUT_WIDTH,
          width: '100%',
        },
        containerStyle,
      ])}
    >
      <View
        style={StyleSheet.flatten([
          {
            borderBottomWidth: 1,
            padding: theme.spacings.XS,
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
