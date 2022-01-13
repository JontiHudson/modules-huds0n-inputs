"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const theming_1 = require("@huds0n/theming");
const utilities_1 = require("@huds0n/utilities");
const InputAccessoryViewIOS_1 = require("../../InputAccessoryViewIOS");
const InputState = (0, tslib_1.__importStar)(require("../../state"));
const helpers_1 = require("../helpers");
const helpers_2 = require("./helpers");
exports.TextInput = react_1.default.forwardRef((props, ref) => {
    const { clearTextOnFocus, disabled, disabledStyle, disableSubmit, downPress, errorStyle, multiline, onBlur, onChange, onChangeText, onFocus, onSubmitEditing, setIsFocused, style, upPress } = props, restProps = (0, tslib_1.__rest)(props, ["clearTextOnFocus", "disabled", "disabledStyle", "disableSubmit", "downPress", "errorStyle", "multiline", "onBlur", "onChange", "onChangeText", "onFocus", "onSubmitEditing", "setIsFocused", "style", "upPress"]);
    const isDark = (0, theming_1.useIsDarkMode)();
    const textInputRef = (0, utilities_1.useCopyRef)(ref);
    const { error, onValueChange } = (0, helpers_1.handleValueValidation)(props);
    (0, helpers_2.handleAndroidBlurOnKeyboardHide)(textInputRef);
    (0, utilities_1.useEffect)(() => {
        if (InputState.isFocused(textInputRef)) {
            InputState.updateAccessoryView({
                downPress,
                upPress,
                submitPress: (0, helpers_2.getSubmitPress)(props, error),
            });
        }
    }, [downPress, upPress, onSubmitEditing, error]);
    const handleLifecycle = (0, utilities_1.useMemo)(() => ({
        onChange: (e) => {
            const { nativeEvent: { text }, } = e;
            onChange === null || onChange === void 0 ? void 0 : onChange(e);
            onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText(text);
            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(text);
        },
        onFocus: (e) => {
            InputState.focusTextInput(textInputRef, {
                downPress,
                upPress,
                submitPress: (0, helpers_2.getSubmitPress)(props, error),
            });
            clearTextOnFocus && onValueChange("");
            onFocus && onFocus(e.nativeEvent.text, error);
            setIsFocused === null || setIsFocused === void 0 ? void 0 : setIsFocused(true);
        },
        onBlur: (e) => {
            onBlur && onBlur(e.nativeEvent.text, error);
            setIsFocused === null || setIsFocused === void 0 ? void 0 : setIsFocused(false);
        },
        onSubmitEditing: (e) => {
            if (multiline)
                return undefined;
            if (!disableSubmit && !error && onSubmitEditing) {
                onSubmitEditing(e.nativeEvent.text, error);
            }
            else if (props.downPress) {
                props.downPress();
            }
        },
    }), [
        clearTextOnFocus,
        disableSubmit,
        downPress,
        error,
        multiline,
        onChange,
        onFocus,
        onSubmitEditing,
        onValueChange,
    ]);
    return (<react_native_1.TextInput ref={textInputRef} editable={!disabled} multiline={multiline} returnKeyType={multiline ? undefined : "onSubmitEditing" in props ? "send" : "next"} keyboardAppearance={isDark ? "dark" : "light"} {...restProps} {...handleLifecycle} style={react_native_1.StyleSheet.flatten([
            helpers_2.defaultStyles.base,
            style,
            !!error && helpers_2.defaultStyles.error,
            !!error && errorStyle,
            disabled && helpers_2.defaultStyles.disabled,
            disabled && disabledStyle,
        ])} inputAccessoryViewID={!disabled && react_native_1.Platform.OS === "ios"
            ? InputAccessoryViewIOS_1.INPUT_ACCESSORY_VIEW_ID
            : undefined}/>);
});
