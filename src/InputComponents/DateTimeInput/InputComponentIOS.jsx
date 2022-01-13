"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponentIOS = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const datetimepicker_1 = (0, tslib_1.__importDefault)(require("@react-native-community/datetimepicker"));
const theming_1 = require("@huds0n/theming");
const utilities_1 = require("@huds0n/utilities");
function InputComponentIOS(props) {
    const { isFocused, minimumDate, maximumDate, mode, onValueChange, value } = props;
    (0, theming_1.useIsDarkMode)();
    const handleChange = (0, utilities_1.useCallback)((event, value) => {
        value &&
            onValueChange &&
            onValueChange(new Date(mode === "date"
                ? value.setHours(0, 0, 0, 0)
                : value.setSeconds(0, 0)));
    }, [mode, onValueChange, value]);
    (0, utilities_1.useEffect)(() => {
        if (isFocused && !value) {
            const now = new Date();
            const startValue = minimumDate ||
                maximumDate ||
                new Date(mode === "date" ? now.setHours(0, 0, 0, 0) : now.setSeconds(0, 0));
            onValueChange(startValue);
        }
    }, [isFocused && !value], { layout: "BEFORE" });
    (0, utilities_1.useEffect)(() => {
        const beforeMinDate = value && minimumDate && minimumDate.valueOf() > value.valueOf();
        const afterMaxDate = value && maximumDate && value.valueOf() > maximumDate.valueOf();
        if (beforeMinDate || afterMaxDate) {
            onValueChange(null);
        }
    }, [minimumDate, maximumDate], { skipMounts: true });
    return (<react_native_1.View style={{ maxHeight: react_native_1.Dimensions.get("window").height }}>
      <datetimepicker_1.default {...props} display="spinner" onChange={handleChange} value={value || minimumDate || new Date()}/>
    </react_native_1.View>);
}
exports.InputComponentIOS = InputComponentIOS;
