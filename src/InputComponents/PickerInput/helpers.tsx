import { theme } from "@huds0n/theming/src/theme";

import type { Types } from "../../types";

export const pickerItemsYN: Types.PickItemProps<boolean>[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export const defaultStyles = {
  base: {
    get color() {
      return theme.colors.TEXT;
    },
    fontSize: theme.fontSizes.BODY,
  },
  disabled: {
    get color() {
      return theme.colors.DISABLED;
    },
  },
  error: {
    get color() {
      return theme.colors.ERROR;
    },
  },
  null: {
    get color() {
      return theme.colors.GREY;
    },
  },
};
