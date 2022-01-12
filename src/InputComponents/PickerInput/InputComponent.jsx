"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const picker_1 = require("@react-native-picker/picker");
const components_1 = require("@huds0n/components");
const theming_1 = require("@huds0n/theming");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const InputManager_1 = require("../../InputManager");
function InputComponent({ onValueChange, nullable = true, nullPlaceholderStyle, nullLabel = "- Please Select -", pickerItems, style, value, onBlur, onFocus, ...rest }) {
    const isDark = (0, theming_1.useIsDarkMode)();
    const contentsColor = isDark ? theme_1.theme.colors.WHITE : theme_1.theme.colors.BLACK;
    const _pickerItems = (0, utilities_1.useMemo)(() => nullable
        ? [
            {
                color: (nullPlaceholderStyle === null || nullPlaceholderStyle === void 0 ? void 0 : nullPlaceholderStyle.color) || "gray",
                label: nullLabel || "",
                value: null,
            },
            ...pickerItems,
        ]
        : pickerItems, [nullable, nullPlaceholderStyle === null || nullPlaceholderStyle === void 0 ? void 0 : nullPlaceholderStyle.color, nullLabel, pickerItems]);
    if (react_native_1.Platform.OS === "ios") {
        const PickerItems = (0, utilities_1.useMemo)(() => {
            return _pickerItems.map((pickerItem) => (<picker_1.Picker.Item key={pickerItem.label || "_NULL_"} {...pickerItem} color={pickerItem.color || contentsColor}/>));
        }, [_pickerItems, contentsColor]);
        return (<react_native_1.View style={react_native_1.StyleSheet.flatten([
                { maxHeight: react_native_1.Dimensions.get("window").height },
            ])}>
        <picker_1.Picker selectedValue={value} onValueChange={onValueChange} {...rest}>
          {PickerItems}
        </picker_1.Picker>
      </react_native_1.View>);
    }
    const renderItem = (0, utilities_1.useCallback)((item, index) => (<components_1.Pressable feedback="fade" key={index.toString()} style={{ padding: theme_1.theme.spacings.M }} onPress={() => {
            onValueChange(item.value);
            InputManager_1.InputManager.dismiss();
        }}>
        <react_native_1.Text style={{
            color: item.color || contentsColor,
            fontSize: theme_1.theme.fontSizes.LABEL,
        }}>
          {item.label}
        </react_native_1.Text>
      </components_1.Pressable>), [onValueChange, contentsColor]);
    return react_native_1.Platform.OS === "android" ? (<react_native_1.View>
      <react_native_1.ScrollView>{_pickerItems.map(renderItem)}</react_native_1.ScrollView>
    </react_native_1.View>) : (<react_native_1.ScrollView>{_pickerItems.map(renderItem)}</react_native_1.ScrollView>);
}
exports.InputComponent = InputComponent;
