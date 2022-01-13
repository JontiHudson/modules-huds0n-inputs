"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeInput = void 0;
const react_native_1 = require("react-native");
const ComponentWeb_1 = require("./ComponentWeb");
const CustomInput_1 = require("../CustomInput");
const InputComponentIOS_1 = require("./InputComponentIOS");
const OutputComponent_1 = require("./OutputComponent");
exports.DateTimeInput = react_native_1.Platform.OS === "web"
    ? ComponentWeb_1.DateTimeWeb
    : (0, CustomInput_1.createCustomInput)(OutputComponent_1.OutputComponent, react_native_1.Platform.OS === "ios" ? InputComponentIOS_1.InputComponentIOS : undefined);
