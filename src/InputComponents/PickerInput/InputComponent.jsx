"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const theming_1 = require("@huds0n/theming");
const theme_1 = require("@huds0n/theming/src/theme");
const utilities_1 = require("@huds0n/utilities");
const InputComponentPlatform_1 = require("./InputComponentPlatform");
function InputComponent(props) {
    const { nullable = true, nullPlaceholderStyle, nullLabel = "- Please Select -", pickerItems, } = props;
    const isDark = (0, theming_1.useIsDarkMode)();
    const contentsColor = isDark ? theme_1.theme.colors.WHITE : theme_1.theme.colors.BLACK;
    const pickerItemsProps = (0, utilities_1.useMemo)(() => nullable
        ? [
            {
                color: (nullPlaceholderStyle === null || nullPlaceholderStyle === void 0 ? void 0 : nullPlaceholderStyle.color) || "gray",
                label: nullLabel || "",
                value: null,
            },
            ...pickerItems,
        ]
        : pickerItems, [nullable, nullPlaceholderStyle === null || nullPlaceholderStyle === void 0 ? void 0 : nullPlaceholderStyle.color, nullLabel, pickerItems]);
    return (<InputComponentPlatform_1.InputComponentPlatform {...props} contentsColor={contentsColor} pickerItemsProps={pickerItemsProps}/>);
}
exports.InputComponent = InputComponent;
