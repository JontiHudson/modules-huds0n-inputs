"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponentAndroid = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const datetimepicker_1 = (0, tslib_1.__importDefault)(require("@react-native-community/datetimepicker"));
const utilities_1 = require("@huds0n/utilities");
function InputComponentAndroid(props) {
    const { closeInput, minimumDate, mode = "date", onValueChange, value, } = props;
    const handleChange = (0, utilities_1.useCallback)((event, value) => {
        closeInput();
        value &&
            onValueChange &&
            onValueChange(new Date(mode === "date"
                ? value.setHours(0, 0, 0, 0)
                : value.setSeconds(0, 0)));
    }, [mode, onValueChange, value]);
    return (<datetimepicker_1.default display={mode === "date" ? "calendar" : "spinner"} {...props} onChange={handleChange} value={value ||
            minimumDate ||
            new Date(mode === "date"
                ? new Date().setHours(0, 0, 0, 0)
                : new Date().setHours(0, 0, 0, 0))}/>);
}
exports.InputComponentAndroid = InputComponentAndroid;
