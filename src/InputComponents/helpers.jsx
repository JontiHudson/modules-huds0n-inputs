"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFieldInputAware = exports.handleValueValidation = exports.getValidatorError = void 0;
const utilities_1 = require("@huds0n/utilities");
function getValidatorError(value, validator) {
    if (!validator) {
        return false;
    }
    if (Array.isArray(validator)) {
        for (const v of validator) {
            const error = v(value);
            if (error) {
                return error;
            }
        }
        return false;
    }
    return validator(value);
}
exports.getValidatorError = getValidatorError;
function handleValueValidation(props) {
    const { customError, onValueChange, value, validator } = props;
    const [error, setError] = (0, utilities_1.useState)(undefined);
    (0, utilities_1.useEffect)(() => {
        setError(handleValidation(props, value));
    }, [customError, value, validator], { layout: "BEFORE" });
    const _onValueChange = (0, utilities_1.useCallback)((newValue) => {
        const newError = handleValidation(props, newValue);
        setError(newError || customError);
        onValueChange && onValueChange?.(newValue, newError || customError);
    }, [onValueChange, customError]);
    return { error, onValueChange: _onValueChange };
}
exports.handleValueValidation = handleValueValidation;
function handleValidation({ customError, isRequired, onErrorChange, validator }, value) {
    if (customError) {
        onErrorChange?.(customError);
        return customError;
    }
    const nullish = value === null || value === undefined || value === "";
    if (nullish && isRequired) {
        onErrorChange?.(isRequired);
        return typeof isRequired === "string" ? isRequired : "Required";
    }
    if (nullish || !validator) {
        onErrorChange?.(undefined);
        return;
    }
    const validationError = getValidatorError(value, validator);
    onErrorChange?.(validationError);
    return validationError;
}
function handleFieldInputAware(props) {
    const [error, setError] = (0, utilities_1.useState)(undefined);
    const [isFocused, setFocused] = (0, utilities_1.useState)(false);
    const onErrorChange = (0, utilities_1.useCallback)((newError) => {
        setError(newError);
        props.onErrorChange && props.onErrorChange?.(newError);
    }, [props.onErrorChange]);
    const onBlur = (0, utilities_1.useCallback)((value, error) => {
        setFocused(false);
        props.onBlur && props.onBlur?.(value, error);
    }, [props.onBlur]);
    const onFocus = (0, utilities_1.useCallback)((value, error) => {
        setFocused(true);
        props.onFocus && props.onFocus?.(value, error);
    }, [props.onFocus]);
    return {
        fieldProps: { error, isFocused },
        inputProps: { onErrorChange, onBlur, onFocus },
    };
}
exports.handleFieldInputAware = handleFieldInputAware;
