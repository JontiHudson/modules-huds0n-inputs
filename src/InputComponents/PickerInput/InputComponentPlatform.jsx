"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponentPlatform = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@huds0n/components");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const InputManager_1 = require("../../InputManager");
function InputComponentPlatform({ onValueChange, contentsColor, pickerItemsProps, }) {
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
      <react_native_1.ScrollView>{pickerItemsProps.map(renderItem)}</react_native_1.ScrollView>
    </react_native_1.View>) : (<react_native_1.ScrollView>{pickerItemsProps.map(renderItem)}</react_native_1.ScrollView>);
}
exports.InputComponentPlatform = InputComponentPlatform;
