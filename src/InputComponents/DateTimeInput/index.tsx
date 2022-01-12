import { Platform } from "react-native";

import { DateTimeWeb } from "./ComponentWeb";
import { createCustomInput } from "../CustomInput";
import { InputComponentIOS } from "./InputComponentIOS";
import { OutputComponent } from "./OutputComponent";

import type { Types } from "../../types";

export const DateTimeInput: Types.CustomInputComponent<
  Date | null,
  Types.DatePickerProps
> =
  Platform.OS === "web"
    ? DateTimeWeb
    : createCustomInput<Date | null, Types.DatePickerProps>(
        OutputComponent,
        Platform.OS === "ios" ? InputComponentIOS : undefined
      );
