import { TextInput as TextInputRN } from 'react-native';

import { InputField } from '../InputField';
import { TextInput } from '../TextInput';

import { CommonInputProps, Validation } from '../../types';

export type Props = InputField.ExtendProps<TextInput.Props> &
  CommonInputProps<string> & {
    prefix?: string;
  };

export type PrefixProps = Props & { error: Validation.Error };

export type RefType = TextInputRN;

export type Component = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<RefType>
>;
