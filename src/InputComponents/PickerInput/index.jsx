"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickerInput = void 0;
const tslib_1 = require("tslib");
const CustomInput_1 = require("../CustomInput");
const InputComponent_1 = require("./InputComponent");
const OutputComponent_1 = require("./OutputComponent");
exports.PickerInput = (0, CustomInput_1.createCustomInput)(OutputComponent_1.OutputComponent, InputComponent_1.InputComponent);
(0, tslib_1.__exportStar)(require("./helpers"), exports);
