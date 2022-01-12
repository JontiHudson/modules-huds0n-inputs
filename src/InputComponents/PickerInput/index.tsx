import { createCustomInput } from "../CustomInput";
import { InputComponent } from "./InputComponent";
import { OutputComponent } from "./OutputComponent";
import type { Types } from "../../types";

export const PickerInput = createCustomInput<
  any,
  Types.PickerSpecficProps<any>
>(OutputComponent, InputComponent);

export * from "./helpers";
