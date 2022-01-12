"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const helpers_1 = require("./helpers");
const InputComponentAndroid_1 = require("./InputComponentAndroid");
function OutputComponent(props) {
    const { error, formatDisplayDate = helpers_1.defaultFormatDisplayDate, isFocused, locale = helpers_1.DEFAULT_LOCALE, mode = helpers_1.DEFAULT_MODE, nullLabel = "- Please Select -", value, } = props;
    return (<>
      <react_native_1.Text style={(0, helpers_1.getStyle)(props, error)}>
        {value ? formatDisplayDate(value, locale, mode) : nullLabel}
      </react_native_1.Text>
      {isFocused && react_native_1.Platform.OS === "android" && (<InputComponentAndroid_1.InputComponentAndroid {...props}/>)}
    </>);
}
exports.OutputComponent = OutputComponent;
