"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryView = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theming_1 = require("@huds0n/theming");
const theme_1 = require("@huds0n/theming/src/theme");
const screen_manager_1 = require("@huds0n/screen-manager");
const Contents_1 = require("./Contents");
exports.AccessoryView = react_1.default.memo((props) => {
    const { deviceWidth, screenMarginLeft, screenMarginRight } = screen_manager_1.ScreenManager.useDimensions();
    (0, theming_1.useIsDarkMode)();
    const keyboardColor = theme_1.theme.colors.KEYBOARD;
    return (<react_native_1.View style={react_native_1.StyleSheet.flatten([
            {
                backgroundColor: keyboardColor,
                borderTopWidth: react_native_1.StyleSheet.hairlineWidth,
                marginLeft: -screenMarginLeft,
                paddingLeft: screenMarginLeft,
                paddingRight: screenMarginRight,
                width: deviceWidth,
            },
            props.accessoryView?.containerStyle,
        ])}>
      <Contents_1.Contents {...props}/>
    </react_native_1.View>);
});
