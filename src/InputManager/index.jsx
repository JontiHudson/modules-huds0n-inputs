"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputManager = void 0;
const tslib_1 = require("tslib");
const InputState = (0, tslib_1.__importStar)(require("../state"));
const Component_1 = require("./Component");
exports.InputManager = Object.assign(Component_1.InputManagerComponent, {
    dismiss: InputState.dismissInput,
    useFocusedId: InputState.useFocusedInput,
    useCustomInput: InputState.useCustomInput,
});
