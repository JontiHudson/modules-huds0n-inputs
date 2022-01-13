"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputAccessoryView = exports.INPUT_ACCESSORY_VIEW_ID = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theming_1 = require("@huds0n/theming");
const theme_1 = require("@huds0n/theming/src/theme");
const screen_manager_1 = require("@huds0n/screen-manager");
const AccessoryView_1 = require("./AccessoryView");
exports.INPUT_ACCESSORY_VIEW_ID = "HUDS0N_ACCESSORY_VIEW";
exports.InputAccessoryView = react_1.default.memo((props) => {
    (0, theming_1.useIsDarkMode)();
    const { deviceWidth, screenMarginLeft } = screen_manager_1.ScreenManager.useDimensions();
    const keyboardColor = theme_1.theme.colors.KEYBOARD;
    return (<react_native_1.InputAccessoryView nativeID={exports.INPUT_ACCESSORY_VIEW_ID}>
        <react_native_1.View style={{
            position: "absolute",
            height: 200,
            width: deviceWidth,
            marginLeft: -screenMarginLeft,
            backgroundColor: react_native_1.StyleSheet.flatten(props.accessoryView?.containerStyle)
                ?.backgroundColor || keyboardColor,
        }}/>
        <AccessoryView_1.AccessoryView {...props}/>
      </react_native_1.InputAccessoryView>);
});
