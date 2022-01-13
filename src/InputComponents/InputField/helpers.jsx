"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSubcomponent = exports.getHasValue = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const animations_1 = require("@huds0n/animations");
function isAnimatedStyle(style) {
    return !!style.animate;
}
function isChangingStyle(style) {
    return (!isAnimatedStyle(style) &&
        !!style.base);
}
function getHasValue(value) {
    return value !== null && value !== undefined && value !== "";
}
exports.getHasValue = getHasValue;
const InputSubcomponent = (props) => {
    const { children, customState, error = false, isFocused = false, onPress, style = {}, value, type, } = props;
    const AnimatedComponent = type === "TEXT" ? animations_1.AnimatedText : animations_1.AnimatedView;
    const Component = type === "TEXT" ? react_native_1.Text : react_native_1.View;
    const hasValue = getHasValue(value);
    if (isAnimatedStyle(style)) {
        const componentStyle = {
            ...style.base,
            ...style.baseAnim,
            ...(hasValue && style.hasValue),
            ...(error && style.error),
            ...(isFocused && style.focused),
            ...(customState &&
                style.custom?.[customState] &&
                style.custom?.[customState]({
                    error,
                    hasValue,
                    isFocused,
                })),
        };
        const componentAnim = {
            ...style.baseAnim,
            ...(hasValue && style.hasValueAnim),
            ...(error && style.errorAnim),
            ...(isFocused && style.focusedAnim),
            ...(customState &&
                style.customAnim?.[customState] &&
                style.customAnim?.[customState]({
                    error,
                    hasValue,
                    isFocused,
                })),
        };
        return (<AnimatedComponent {...(onPress && {
            onStartShouldSetResponder: () => true,
            onResponderStart: () => onPress(),
        })} animate={{
                to: componentAnim,
                duration: style.animate.duration,
                easing: style.animate.easing,
            }} style={componentStyle} useNativeDriver={style.animate.useNativeDriver}>
        {children}
      </AnimatedComponent>);
    }
    if (isChangingStyle(style)) {
        return (<Component {...(onPress && {
            onStartShouldSetResponder: () => true,
            onResponderStart: () => onPress(),
        })} style={{
                ...style.base,
                ...(hasValue && style.hasValue),
                ...(error && style.error),
                ...(isFocused && style.focused),
                ...(customState &&
                    style.custom?.[customState] &&
                    style.custom?.[customState]({
                        error,
                        hasValue,
                        isFocused,
                    })),
            }}>
        {children}
      </Component>);
    }
    return (<Component {...(onPress && {
        onStartShouldSetResponder: () => true,
        onResponderStart: () => onPress(),
    })} style={style}>
      {children}
    </Component>);
};
exports.InputSubcomponent = InputSubcomponent;
