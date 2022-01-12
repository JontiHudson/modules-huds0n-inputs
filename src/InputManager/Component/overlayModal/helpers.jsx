"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputOpacityAnim = void 0;
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const InputState = (0, tslib_1.__importStar)(require("../../../state"));
exports.inputOpacityAnim = new react_native_1.Animated.Value(0);
react_native_1.Keyboard.addListener("keyboardDidHide", async () => {
    let listener = null;
    const isChangeFocus = await new Promise((resolve) => {
        listener = react_native_1.Keyboard.addListener("keyboardDidShow", () => {
            resolve(true);
        });
        setTimeout(() => {
            resolve(false);
        }, 500);
    }).finally(() => {
        if (listener)
            listener.remove();
    });
    if (!isChangeFocus && !InputState.currentCustomInput()) {
        InputState.dismissInput();
    }
});
InputState.addInputListener(async ({ focusedInput, customInput }) => {
    if (customInput) {
        _animateInput((focusedInput === null || focusedInput === void 0 ? void 0 : focusedInput.type) === "CUSTOM" ? 1 : 0);
    }
}, "focusedInput");
function _animateInput(opacity) {
    react_native_1.Animated.timing(exports.inputOpacityAnim, {
        easing: react_native_1.Easing.out(react_native_1.Easing.quad),
        toValue: opacity,
        duration: 250,
        useNativeDriver: true,
    }).start(({ finished }) => {
        if (opacity === 0 &&
            finished &&
            InputState.currentlyFocusedInput() === null) {
            InputState.hideCustomInput();
        }
    });
}
