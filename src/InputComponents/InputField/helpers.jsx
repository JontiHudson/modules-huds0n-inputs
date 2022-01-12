"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSubcomponent = exports.getHasValue = void 0;
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
    var _a, _b, _c, _d, _e, _f;
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
                ((_a = style.custom) === null || _a === void 0 ? void 0 : _a[customState]) &&
                ((_b = style.custom) === null || _b === void 0 ? void 0 : _b[customState]({
                    error,
                    hasValue,
                    isFocused,
                }))),
        };
        const componentAnim = {
            ...style.baseAnim,
            ...(hasValue && style.hasValueAnim),
            ...(error && style.errorAnim),
            ...(isFocused && style.focusedAnim),
            ...(customState &&
                ((_c = style.customAnim) === null || _c === void 0 ? void 0 : _c[customState]) &&
                ((_d = style.customAnim) === null || _d === void 0 ? void 0 : _d[customState]({
                    error,
                    hasValue,
                    isFocused,
                }))),
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
                    ((_e = style.custom) === null || _e === void 0 ? void 0 : _e[customState]) &&
                    ((_f = style.custom) === null || _f === void 0 ? void 0 : _f[customState]({
                        error,
                        hasValue,
                        isFocused,
                    }))),
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
