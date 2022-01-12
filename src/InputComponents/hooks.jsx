"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = exports.useDateTimeInput = exports.usePickerInput = exports.useTextInput = void 0;
const utilities_1 = require("@huds0n/utilities");
const InputManager_1 = require("../InputManager");
function useInput(options) {
    const ref = (0, utilities_1.useRef)(null);
    const [customError, setCustomError] = (0, utilities_1.useState)(options.defaultError);
    const [error, setError] = (0, utilities_1.useState)(undefined);
    const [isFocused, setIsFocused] = (0, utilities_1.useState)(false);
    const [value, setValue] = (0, utilities_1.useState)(options.defaultValue);
    const revert = (0, utilities_1.useCallback)(() => {
        setValue(options.defaultValue);
    });
    const focus = (0, utilities_1.useCallback)(() => {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
    });
    const onErrorChange = (0, utilities_1.useCallback)((newError) => {
        var _a;
        setError(newError);
        (_a = options.onErrorChange) === null || _a === void 0 ? void 0 : _a.call(options, newError);
    });
    const onValueChange = (0, utilities_1.useCallback)((newValue, error) => {
        var _a;
        setValue(newValue);
        (_a = options.onValueChange) === null || _a === void 0 ? void 0 : _a.call(options, newValue, error);
    });
    return {
        customError,
        error,
        focus,
        isModified: value !== options.defaultValue,
        isFocused,
        onErrorChange,
        onValueChange,
        ref,
        revert,
        setCustomError,
        setIsFocused,
        setValue,
        value,
        fieldProps: {
            error,
            focus,
            isFocused,
            value,
        },
    };
}
function useTextInput(options) {
    return useInput({
        defaultValue: "",
        ...options,
    });
}
exports.useTextInput = useTextInput;
function usePickerInput(options) {
    return useInput({
        defaultValue: null,
        ...options,
    });
}
exports.usePickerInput = usePickerInput;
function useDateTimeInput(options) {
    return useInput({
        defaultValue: null,
        ...options,
    });
}
exports.useDateTimeInput = useDateTimeInput;
function useForm(...args) {
    args.forEach((element, i) => {
        var _a, _b;
        if (i)
            element.upPress = (_a = args[i - 1]) === null || _a === void 0 ? void 0 : _a.focus;
        if (i < args.length - 1)
            element.downPress = (_b = args[i + 1]) === null || _b === void 0 ? void 0 : _b.focus;
    });
    const isError = args.some((element) => element.error);
    const isModified = args.some((element) => element.isModified);
    const validChanges = isModified && !isError;
    const valueArray = args.map((element) => element.value);
    const errorArray = args.map((element) => element.error);
    const revertAll = (0, utilities_1.useCallback)(() => {
        InputManager_1.InputManager.dismiss();
        args.forEach((element) => element.revert());
    });
    return {
        errorArray,
        isError,
        isModified,
        revertAll,
        validChanges,
        valueArray,
    };
}
exports.useForm = useForm;
