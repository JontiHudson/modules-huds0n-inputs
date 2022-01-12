"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStyles = exports.handleAndroidBlurOnKeyboardHide = exports.getSubmitPress = void 0;
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const theme_1 = require("@huds0n/theming/src/theme");
const InputState = (0, tslib_1.__importStar)(require("../../state"));
function getSubmitPress(props, error) {
    const { onSubmitEditing, value } = props;
    if (!error && onSubmitEditing) {
        return () => {
            onSubmitEditing(value, error);
        };
    }
    return undefined;
}
exports.getSubmitPress = getSubmitPress;
function handleAndroidBlurOnKeyboardHide(ref) {
    if (react_native_1.Platform.OS === "android") {
        const textInputId = (0, utilities_1.getNodeId)(ref.current, true);
        const focusedInput = InputState.useFocusedInput();
        (0, utilities_1.useEffect)(() => {
            var _a;
            if (!focusedInput &&
                textInputId ===
                    (0, utilities_1.getNodeId)(react_native_1.TextInput.State.currentlyFocusedInput(), true)) {
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.blur();
            }
        }, [focusedInput], { layout: "BEFORE" });
    }
}
exports.handleAndroidBlurOnKeyboardHide = handleAndroidBlurOnKeyboardHide;
exports.defaultStyles = {
    base: {
        get color() {
            return theme_1.theme.colors.TEXT;
        },
        paddingTop: 0,
        fontSize: theme_1.theme.fontSizes.BODY,
        ...(react_native_1.Platform.OS === "web" && {
            outlineStyle: "none",
        }),
    },
    disabled: {
        get color() {
            return theme_1.theme.colors.DISABLED;
        },
    },
    error: {
        get color() {
            return theme_1.theme.colors.ERROR;
        },
    },
};
