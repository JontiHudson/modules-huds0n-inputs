"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contents = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theming_1 = require("@huds0n/theming");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const components_1 = require("@huds0n/components");
const InputState = (0, tslib_1.__importStar)(require("../state"));
exports.Contents = react_1.default.memo(({ accessoryView: { iconDismiss = defaultIcons.dismiss, iconDown = defaultIcons.down, iconSubmit = defaultIcons.submit, iconUp = defaultIcons.up, } = {}, inputColors, }) => {
    const isDark = (0, theming_1.useIsDarkMode)();
    const keyboardColor = theme_1.theme.colors.KEYBOARD;
    const contentsColor = (inputColors === null || inputColors === void 0 ? void 0 : inputColors.contents) || isDark ? theme_1.theme.colors.WHITE : theme_1.theme.colors.BLACK;
    const { downPress, submitPress, upPress } = InputState.useAccessoryView();
    const handleDownPress = (0, utilities_1.useCallback)(() => downPress && downPress(), [downPress]);
    const handleSubmitPress = (0, utilities_1.useCallback)(() => {
        InputState.dismissInput();
        submitPress && submitPress();
    }, [submitPress]);
    const handleUpPress = (0, utilities_1.useCallback)(() => upPress && upPress(), [upPress]);
    const SecondIcon = submitPress && !downPress ? (<components_1.Icon color={contentsColor} disabled={!submitPress} onPress={handleSubmitPress} {...iconSubmit}/>) : (<components_1.Icon color={contentsColor} disabled={!downPress} onPress={handleDownPress} {...iconDown}/>);
    return (<react_native_1.View style={{
            alignItems: "center",
            backgroundColor: keyboardColor,
            borderColor: contentsColor,
            borderTopWidth: react_native_1.StyleSheet.hairlineWidth,
            flexDirection: "row",
            paddingHorizontal: theme_1.theme.spacings.M,
            paddingVertical: theme_1.theme.spacings.S,
            width: "100%",
        }}>
        <components_1.Icon color={contentsColor} disabled={!upPress} onPress={handleUpPress} {...iconUp}/>
        <react_native_1.View style={{ width: 5 }}/>
        {SecondIcon}
        <react_native_1.View style={{ flex: 1 }}/>
        <components_1.Icon color={contentsColor} onPress={InputState.dismissInput} {...iconDismiss}/>
      </react_native_1.View>);
});
const defaultIcons = {
    dismiss: {
        name: "keyboard-close",
        set: "MaterialCommunityIcons",
        size: 26,
        containerStyle: { transform: [{ scaleY: 0.8 }] },
    },
    down: {
        name: "chevron-down",
        set: "Feather",
        size: 36,
        containerStyle: { margin: -5 },
    },
    up: {
        name: "chevron-up",
        set: "Feather",
        size: 36,
        containerStyle: { margin: -5 },
    },
    submit: {
        name: "send",
        set: "Feather",
        size: 20,
    },
};
