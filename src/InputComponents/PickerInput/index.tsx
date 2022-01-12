import { createCustomInput } from "../CustomInput";
import { InputComponent } from "./InputComponent";
import { OutputComponent } from "./OutputComponent";
import type { Types } from "../../types";

export const PickerInput = createCustomInput<
  unknown,
  Types.PickerSpecficProps<unknown>
>(OutputComponent, InputComponent);

export * from "./helpers";
