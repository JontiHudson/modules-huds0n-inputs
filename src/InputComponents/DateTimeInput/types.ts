import { TextStyle } from 'react-native';

import * as Types from '../../types';

import { createCustomInput } from '../CustomInput';

export type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
export type Mode = 'date' | 'time';
export type Value = Date | null;
export type WebInputFormat = string;
export type WebInputFormatComponent = 'DD' | 'MM' | 'YYYY' | 'HH' | 'mm';

export type FormatDisplayFn = (
  date: Date,
  locale: string,
  mode: Mode,
) => string;

export type SpecficProps = {
  disabledPlaceholderStyle?: TextStyle;
  errorPlaceholderStyle?: TextStyle;
  formatDisplayDate?: FormatDisplayFn;
  locale?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  minuteInterval?: MinuteInterval;
  mode?: Mode;
  nullLabel?: string;
  nullPlaceholderStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  webInputFormat?: WebInputFormat;
  invalidDateError?: string;
  value: Value;
};

export type SubComponent = createCustomInput.SubComponent<SpecficProps, Value>;

export type Props = createCustomInput.Props<SpecficProps, Value>;

export type RefType = Types.RefType;

export type Component = React.ForwardRefExoticComponent<
  Props & React.RefAttributes<RefType>
>;
