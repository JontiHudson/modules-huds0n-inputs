import {
  TextStyle,
  PickerProps as PickerPropsRN,
  PickerItemProps as PickerItemPropsRN,
} from 'react-native';

import { createCustomInput } from '../CustomInput';

import * as Types from '../../types';

export type ItemProps<T = any> = PickerItemPropsRN & {
  placeholder?: string;
  value: T;
};

export type SpecficProps<T = any> = {
  disabledPlaceholderStyle?: TextStyle;
  errorPlaceholderStyle?: TextStyle;
  nullable?: boolean;
  nullPlaceholderStyle?: TextStyle;
  nullLabel?: string;
  pickerItems: ItemProps<T>[];
  placeholderStyle?: TextStyle;
} & Omit<
  PickerPropsRN,
  'enabled' | 'onValueChange' | 'selectedValue' | 'value'
>;

export type Props<T = any> = createCustomInput.Props<SpecficProps<T>, T>;

export type SubComponent<T = any> = createCustomInput.SubComponentProps<
  SpecficProps<T>,
  T
>;

export type RefType = Types.RefType;

export type Component<T = any> = React.ForwardRefExoticComponent<
  Props<T> & React.RefAttributes<RefType>
>;
