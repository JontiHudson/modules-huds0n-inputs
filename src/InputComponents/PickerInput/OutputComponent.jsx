"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const helpers_1 = require("./helpers");
function OutputComponent({ disabled, disabledPlaceholderStyle, error, errorPlaceholderStyle, nullPlaceholderStyle, nullLabel = "- Please Select -", placeholderStyle, pickerItems, value, }) {
    const currentItem = pickerItems.find((item) => item.value === value);
    const isNull = value === null;
    return (<react_native_1.Text style={react_native_1.StyleSheet.flatten([
            helpers_1.defaultStyles.base,
            placeholderStyle,
            !!currentItem?.color && { color: currentItem?.color },
            isNull && helpers_1.defaultStyles.null,
            isNull && nullPlaceholderStyle,
            !!error && helpers_1.defaultStyles.error,
            !!error && errorPlaceholderStyle,
            disabled && helpers_1.defaultStyles.disabled,
            disabled && disabledPlaceholderStyle,
        ])}>
      {currentItem?.placeholder || currentItem?.label || nullLabel}
    </react_native_1.Text>);
}
exports.OutputComponent = OutputComponent;
