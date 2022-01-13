"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverlayModal = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@huds0n/components");
const theming_1 = require("@huds0n/theming");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const InputState = (0, tslib_1.__importStar)(require("../../../state"));
const helpers_1 = require("./helpers");
const OverlayModal = ({ inputColors }) => {
    const customInput = InputState.useCustomInput();
    const isDark = (0, theming_1.useIsDarkMode)();
    if (!(customInput === null || customInput === void 0 ? void 0 : customInput.Component))
        return null;
    const { Component, props: componentProps } = customInput;
    const backgroundColor = (inputColors === null || inputColors === void 0 ? void 0 : inputColors.background) || isDark ? theme_1.theme.colors.BLACK : theme_1.theme.colors.WHITE;
    const contentsColor = (inputColors === null || inputColors === void 0 ? void 0 : inputColors.contents) || isDark ? theme_1.theme.colors.WHITE : theme_1.theme.colors.BLACK;
    const customInputStyle = {
        height: "100%",
        width: "100%",
        opacity: helpers_1.inputOpacityAnim,
    };
    const { Modal } = react_native_1.Platform.OS === "web" ? require("./WebModal") : require("react-native");
    return (<Modal animationType="fade" transparent={true} statusBarTranslucent onRequestClose={InputState.dismissInput} visible>
      <react_native_1.Animated.View style={customInputStyle}>
        <components_1.Pressable onPressIn={InputState.dismissInput} style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: (0, utilities_1.addColorTransparency)(theme_1.theme.colors.BLACK, 0.5),
        }}>
          <react_native_1.View style={{
            backgroundColor,
            borderColor: contentsColor,
            borderWidth: react_native_1.StyleSheet.hairlineWidth,
            maxHeight: "75%",
            maxWidth: "75%",
        }}>
            <Component {...componentProps}/>
          </react_native_1.View>
        </components_1.Pressable>
      </react_native_1.Animated.View>
    </Modal>);
};
exports.OverlayModal = OverlayModal;
