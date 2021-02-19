import { TextStyle, ViewStyle } from 'react-native';

import { Validation } from '../../types';

export type Props = {
  borderColor?: string;
  children: React.ReactNode | React.ReactNode[];
  containerStyle?: ViewStyle;
  contentsStyle?: ViewStyle;
  error?: Validation.Error;
  errorColor?: string;
  isEmpty?: boolean;
  isFocused?: boolean;
  message?: string;
  messageStyle?: TextStyle;
  isRequired?: boolean;
  title?: string;
  titleHighlightColor?: string;
  titleStyle?: TextStyle;
  useNativeDriver?: boolean;
};

export type SubComponentProps = Props & {
  titleIsMinimised: boolean;
  overrideColor?: string;
};

export type ExtendProps<P extends {}> = Omit<
  Props,
  'error' | 'isFocused' | 'children'
> &
  Omit<P, 'disabledStyle' | 'style'>;

export type Component = React.FunctionComponent<Props>;
