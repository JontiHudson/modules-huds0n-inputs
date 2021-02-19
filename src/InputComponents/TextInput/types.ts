import {
  TextInput as TextInputRN,
  TextInputProps as TextInputPropsRN,
} from 'react-native';

import * as Types from '../../types';

export type Props = Omit<
  TextInputPropsRN,
  'editable' | 'onBlur' | 'onFocus' | 'onSubmitEditing'
> &
  Types.CommonInputProps<string>;

export type RefType = TextInputRN;

export type Component = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<RefType>
>;
