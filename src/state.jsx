"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInputListener = exports.useAccessoryView = exports.useCustomInput = exports.useIsFocused = exports.useFocusedInput = exports.dismissInput = exports.updateAccessoryView = exports.rerenderCustomInput = exports.hideCustomInput = exports.updateCustomInput = exports.focusTextInput = exports.isFocused = exports.currentCustomInput = exports.currentlyFocusedInput = void 0;
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const _core_1 = require("@huds0n/utilities/src/_core");
const shared_state_1 = require("@huds0n/shared-state");
const _internalState = new shared_state_1.SharedState({
    customInput: null,
    focusedInput: null,
    accessoryView: { downPress: null, upPress: null, submitPress: null },
});
function currentlyFocusedInput() {
    return _internalState.state.focusedInput;
}
exports.currentlyFocusedInput = currentlyFocusedInput;
function currentCustomInput() {
    return _internalState.state.customInput;
}
exports.currentCustomInput = currentCustomInput;
function isFocused(ref) {
    var _a;
    return (!!ref.current &&
        ((_a = _internalState.state.focusedInput) === null || _a === void 0 ? void 0 : _a.id) === (0, utilities_1.getNodeId)(ref.current));
}
exports.isFocused = isFocused;
function focusTextInput(ref, accessoryView) {
    _internalState.setState({
        focusedInput: { id: (0, utilities_1.getNodeId)(ref.current), type: "KEYBOARD" },
        ...(accessoryView && { accessoryView }),
    });
}
exports.focusTextInput = focusTextInput;
function updateCustomInput(ref, customInput, accessoryView) {
    if (ref.current) {
        react_native_1.Keyboard.dismiss();
        _internalState.setState({
            focusedInput: { id: ref.current, type: "CUSTOM" },
            customInput,
            ...(accessoryView && { accessoryView }),
        });
    }
}
exports.updateCustomInput = updateCustomInput;
function hideCustomInput() {
    _internalState.setState({ customInput: null });
}
exports.hideCustomInput = hideCustomInput;
function rerenderCustomInput() { }
exports.rerenderCustomInput = rerenderCustomInput;
function updateAccessoryView(accessoryView) {
    _internalState.setState({ accessoryView });
}
exports.updateAccessoryView = updateAccessoryView;
function dismissInput() {
    react_native_1.Keyboard.dismiss();
    _internalState.setState({
        focusedInput: null,
    });
}
exports.dismissInput = dismissInput;
function useFocusedInput() {
    return _internalState.useProp("focusedInput")[0];
}
exports.useFocusedInput = useFocusedInput;
function useIsFocused(ref) {
    const focusedInput = useFocusedInput();
    return !!ref.current && (focusedInput === null || focusedInput === void 0 ? void 0 : focusedInput.id) === (0, utilities_1.getNodeId)(ref.current);
}
exports.useIsFocused = useIsFocused;
function useCustomInput() {
    return _internalState.useProp("customInput")[0];
}
exports.useCustomInput = useCustomInput;
function useAccessoryView() {
    return _internalState.useProp("accessoryView")[0];
}
exports.useAccessoryView = useAccessoryView;
exports.addInputListener = _internalState.addListener;
_core_1.huds0nState.setState({
    dismissInput,
});
_internalState.addListener(({ focusedInput, customInput }) => {
    _core_1.huds0nState.setState({
        focusedId: (focusedInput === null || focusedInput === void 0 ? void 0 : focusedInput.id) || null,
        isCustomInputOpen: !!customInput,
    });
}, ["focusedInput", "customInput"]);
