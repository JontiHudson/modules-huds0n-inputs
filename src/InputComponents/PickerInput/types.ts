import { TextStyle } from "react-native";
import {
  PickerProps as PickerPropsRN,
  PickerItemProps as PickerItemPropsRN,
} from "@react-native-picker/picker";

import { createCustomInput } from "../CustomInput";

import * as Types from "../../types";

export type ItemProps<T = any> = PickerItemPropsRN<T> & {
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
  "enabled" | "onValueChange" | "selectedValue" | "value" | "onFocus" | "onBlur"
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
