"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedScreen = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const helpers_1 = require("./helpers");
exports.AnimatedScreen = react_1.default.memo(({ children }) => {
    const screenStyle = {
        flex: 1,
        transform: [{ translateY: helpers_1.screenYAnim }],
    };
    return <react_native_1.Animated.View style={screenStyle}>{children}</react_native_1.Animated.View>;
});
