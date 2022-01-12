"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeWeb = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const error_1 = (0, tslib_1.__importDefault)(require("@huds0n/error"));
const utilities_1 = require("@huds0n/utilities");
const InputState = (0, tslib_1.__importStar)(require("../../state"));
const helpers_1 = require("../helpers");
const TextInput_1 = require("../TextInput");
const validators_1 = require("../validators");
const helpers_2 = require("./helpers");
exports.DateTimeWeb = react_1.default.forwardRef((props, ref) => {
    const { customError, invalidDateError = props.mode === "time" ? "Invalid time" : "Invalid date", mode = "date", webInputFormat = "DD/MM/YYYY", value, validator, minimumDate, maximumDate, } = props;
    const format = mode === "time" ? "HH:mm" : webInputFormat;
    const delimiter = mode === "time" ? ":" : getWebInputDelimiter(webInputFormat);
    const formatComponents = mode === "time" ? ["HH", "mm"] : getDateFormat(webInputFormat, delimiter);
    const inputRef = (0, utilities_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, () => ({
        focus: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
    }));
    const [text, setText] = (0, utilities_1.useState)("");
    const localError = !value && !!text && invalidDateError;
    const { error, onValueChange } = (0, helpers_1.handleValueValidation)({
        ...props,
        customError: customError || localError,
        validator: (0, utilities_1.useMemo)(() => {
            const combinedValidation = validator ? [...(0, utilities_1.toArray)(validator)] : [];
            if (maximumDate) {
                combinedValidation.push(validators_1.validators.date({
                    beforeOrEqual: maximumDate,
                    type: props.mode,
                }));
            }
            if (minimumDate) {
                combinedValidation.push(validators_1.validators.date({
                    after: minimumDate,
                    type: props.mode,
                }));
            }
            return combinedValidation;
        }, [validator, maximumDate, minimumDate, localError]),
    });
    const updateValue = (0, utilities_1.useCallback)((t) => {
        try {
            let newDate;
            const c1 = t.slice(0, 2);
            const c2 = t.slice(3, 5);
            const c3 = t.slice(6, 10);
            let year = 0;
            let monthIndex = 0;
            let day = 1;
            let hours = 0;
            let minutes = 0;
            [c1, c2, c3].forEach((c, i) => {
                const f = formatComponents[i];
                if (f) {
                    if (!c) {
                        throw "Empty component";
                    }
                    const n = Number(c);
                    switch (formatComponents[i]) {
                        case "DD":
                            day = n;
                            return;
                        case "MM":
                            monthIndex = n - 1;
                            return;
                        case "HH":
                            hours = n;
                            return;
                        case "mm":
                            minutes = n;
                            return;
                        case "YYYY":
                            if (c.length < 4) {
                                throw "Year too short";
                            }
                            year = n;
                            return;
                    }
                }
            });
            if (mode === "date") {
                newDate = new Date(year, monthIndex, day);
                if (newDate.getMonth() !== monthIndex || newDate.getDate() !== day) {
                    throw "Invalid date";
                }
            }
            else {
                newDate = new Date();
                newDate.setHours(hours);
                newDate.setMinutes(minutes);
            }
            onValueChange(newDate);
            return newDate;
        }
        catch {
            onValueChange(null);
            return null;
        }
    }, [onValueChange]);
    (0, utilities_1.useEffect)(() => {
        updateValue(text);
    }, [text], { layout: "BEFORE" });
    const updateText = (0, utilities_1.useCallback)((v = value) => {
        if (v) {
            setText(formatComponents
                .map((f) => {
                if (f === "DD")
                    return v.getDate().toString().padStart(2, "0");
                if (f === "MM")
                    return (v.getMonth() + 1).toString().padStart(2, "0");
                if (f === "HH")
                    return v.getHours().toString().padStart(2, "0");
                if (f === "mm")
                    return v.getMinutes().toString().padStart(2, "0");
                return v.getFullYear().toString();
            })
                .reduce((acc, x, i) => {
                return i === 0 ? acc + x : acc + delimiter + x;
            }));
        }
    }, [value]);
    const onKeyPress = (0, utilities_1.useCallback)(({ nativeEvent: { key }, }) => {
        if (key === "Backspace") {
            setText((t) => {
                return t.slice(0, t[t.length - 1] === delimiter ? -2 : -1);
            });
        }
        if (key === delimiter) {
            setText((t) => {
                const currentLength = t.length;
                if (currentLength === 1 || (mode === "date" && currentLength === 4)) {
                    const lastDidget = t.slice(currentLength - 1);
                    const rest = t.slice(0, currentLength - 1);
                    return rest + "0" + lastDidget + delimiter;
                }
                return t;
            });
        }
        if (key.match(/[0-9]/)) {
            setText((t) => {
                const currentLength = t.length;
                const isMaxLength = currentLength === format.length;
                if (isMaxLength) {
                    return t;
                }
                const newText = t + key;
                const newTextSplit = newText.split(delimiter);
                const currentComponent = newTextSplit.length - 1;
                const componentText = newTextSplit[currentComponent];
                const componentNumber = Number(componentText);
                const f = formatComponents[currentComponent];
                if (f === "DD" && componentNumber > 31)
                    return t;
                if (f === "MM" && componentNumber > 12)
                    return t;
                if (f === "HH" && componentNumber > 23)
                    return t;
                if (f === "mm" && componentNumber > 59)
                    return t;
                if (currentLength === 1 || (mode === "date" && currentLength === 4)) {
                    return newText + delimiter;
                }
                return newText;
            });
        }
    }, [updateValue]);
    const onSubmitEditing = (0, utilities_1.useCallback)(() => {
        if (value) {
            updateText();
            props.onSubmitEditing && props.onSubmitEditing(value, error);
        }
        else {
            setText("");
        }
    }, [value, updateText, props.onSubmitEditing, error]);
    const isFocused = handleFocusBlur(props, inputRef, error, setText);
    (0, utilities_1.useEffect)(() => {
        if (!isFocused) {
            updateText();
        }
    }, [value, isFocused], { layout: "BEFORE" });
    const style = (0, helpers_2.getStyle)(props, error);
    return (<TextInput_1.TextInput ref={inputRef} scrollEnabled={false} placeholder={format} onKeyPress={onKeyPress} value={text} keyboardType="numeric" onSubmitEditing={onSubmitEditing} style={style}/>);
});
function getWebInputDelimiter(webInputFormat) {
    return (0, utilities_1.useMemo)(() => {
        if (webInputFormat.includes("/"))
            return "/";
        if (webInputFormat.includes("-"))
            return "-";
        if (webInputFormat.includes("."))
            return ".";
        throw new error_1.default({
            name: "Huds0nError",
            code: "INVALID_WEB_INPUT_DATE_DELIMITER",
            message: `WebInputFormat date components must be separted by either '/', '.', or '-'. e.g. DD-MM-YYYY`,
            severity: "HIGH",
            info: { webInputFormat },
        });
    }, [webInputFormat]);
}
function getDateFormat(webInputFormat, webInputDelimiter) {
    return (0, utilities_1.useMemo)(() => {
        const formatElement = webInputFormat.split(webInputDelimiter);
        if (formatElement.length !== 3) {
            throw new error_1.default({
                name: "huds0nInputError",
                code: "INVALID_WEB_INPUT_DATE_FORMAT",
                message: `WebInputFormat date components must be either 'DD', 'MM', or 'YYYY'. e.g. DD-MM-YYYY`,
                severity: "HIGH",
                info: { webInputFormat },
            });
        }
        return formatElement.map((formatElement) => {
            if (formatElement === "DD")
                return formatElement;
            if (formatElement === "MM")
                return formatElement;
            if (formatElement === "YYYY")
                return formatElement;
            throw new error_1.default({
                name: "huds0nInputError",
                code: "INVALID_WEB_INPUT_DATE_FORMAT",
                message: `WebInputFormat date components must be either 'DD', 'MM', or 'YYYY'. e.g. DD-MM-YYYY`,
                severity: "HIGH",
                info: { webInputFormat },
            });
        });
    }, [webInputDelimiter]);
}
function handleFocusBlur({ onBlur, onFocus, setIsFocused, value }, ref, dateError, setText) {
    const isFocused = InputState.useIsFocused(ref);
    (0, utilities_1.useEffect)(() => {
        var _a;
        if (isFocused) {
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.focus();
            onFocus && onFocus(value, dateError);
        }
        else {
            setText("");
            onBlur && onBlur(value, dateError);
        }
        setIsFocused === null || setIsFocused === void 0 ? void 0 : setIsFocused(isFocused);
    }, [isFocused], { skipMounts: true });
    return isFocused;
}
