"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCustomInputChange = exports.screenYAnim = exports.inputYAnim = exports.initialise = void 0;
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const InputState = (0, tslib_1.__importStar)(require("../../../state"));
const ANIMATION_DURATION = 250;
let _focusedNodePadding = 0;
let _screenRef = null;
function initialise(focusedNodePadding, screenRef) {
    _focusedNodePadding = focusedNodePadding;
    _screenRef = screenRef;
}
exports.initialise = initialise;
exports.inputYAnim = new react_native_1.Animated.Value(0);
exports.screenYAnim = new react_native_1.Animated.Value(0);
let _screenYCurrent = 0;
react_native_1.Keyboard.addListener("keyboardWillChangeFrame", (keyboardChangeEvent) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { endCoordinates: { screenY }, } = keyboardChangeEvent;
    if (react_native_1.TextInput.State.currentlyFocusedInput()) {
        yield _moveScreen(screenY);
    }
}));
InputState.addInputListener(({ focusedInput }) => {
    if (focusedInput === null) {
        _animateInput(0);
        _animateScreen(0);
    }
    else if (focusedInput.type === "KEYBOARD") {
        _animateInput(0);
    }
}, "focusedInput");
function getPositionAsync(nodeId) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const { height, pageY } = yield (0, utilities_1.measureNodeAsync)(nodeId);
        return { top: pageY, bottom: pageY + height };
    });
}
function _animateInput(translateY) {
    return new Promise((resolve) => {
        react_native_1.Animated.timing(exports.inputYAnim, {
            easing: react_native_1.Easing.out(react_native_1.Easing.quad),
            toValue: translateY,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start(({ finished }) => {
            resolve(finished);
            if (translateY === 0) {
                InputState.hideCustomInput();
            }
        });
    });
}
function _animateScreen(translateY) {
    const toValue = !!InputState.currentlyFocusedInput() ? translateY : 0;
    return new Promise((resolve) => {
        react_native_1.Animated.timing(exports.screenYAnim, {
            easing: react_native_1.Easing.out(react_native_1.Easing.quad),
            toValue,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start(({ finished }) => {
            resolve(finished);
            if (finished) {
                _screenYCurrent = toValue;
            }
        });
    });
}
function _moveScreen(inputTop) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const focusedInput = InputState.currentlyFocusedInput();
        const screenId = _screenRef && (0, react_native_1.findNodeHandle)(_screenRef.current);
        if (!focusedInput || !screenId) {
            return null;
        }
        const focusedPosition = yield getPositionAsync(focusedInput.id);
        const containerPosition = yield getPositionAsync(screenId);
        if (isNaN(containerPosition.bottom)) {
            return null;
        }
        const inputRelativeToFocus = inputTop - focusedPosition.bottom - _focusedNodePadding;
        const newTranslation = _screenYCurrent + inputRelativeToFocus;
        if (newTranslation > 0) {
            return _animateScreen(0);
        }
        const maxTranslation = inputTop - containerPosition.bottom;
        if (newTranslation < maxTranslation || _screenYCurrent < maxTranslation) {
            return _animateScreen(maxTranslation);
        }
        return _animateScreen(newTranslation);
    });
}
function handleCustomInputChange(height) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (_screenRef) {
            const { height: screenHeight, pageY: topOffset } = yield (0, utilities_1.measureNodeAsync)(_screenRef.current);
            _moveScreen(screenHeight + topOffset - height);
            yield _animateInput(-height);
        }
    });
}
exports.handleCustomInputChange = handleCustomInputChange;
