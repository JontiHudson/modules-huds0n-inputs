"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponentPlatform = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const picker_1 = require("@react-native-picker/picker");
const utilities_1 = require("@huds0n/utilities");
function InputComponentPlatform({ onValueChange, style, value, onBlur, onFocus, contentsColor, pickerItemsProps, ...rest }) {
    const PickerItems = (0, utilities_1.useMemo)(() => {
        return pickerItemsProps.map((pickerItemProps) => (<picker_1.Picker.Item key={pickerItemProps.label || "_NULL_"} {...pickerItemProps} color={pickerItemProps.color || contentsColor}/>));
    }, [pickerItemsProps, contentsColor]);
    return (<react_native_1.View style={react_native_1.StyleSheet.flatten([
            { maxHeight: react_native_1.Dimensions.get("window").height },
        ])}>
      <picker_1.Picker selectedValue={value} onValueChange={onValueChange} {...rest}>
        {PickerItems}
      </picker_1.Picker>
    </react_native_1.View>);
}
exports.InputComponentPlatform = InputComponentPlatform;
