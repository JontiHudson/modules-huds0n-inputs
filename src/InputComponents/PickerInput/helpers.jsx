"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStyles = exports.pickerItemsYN = void 0;
const theme_1 = require("@huds0n/theming/src/theme");
exports.pickerItemsYN = [
    { label: "Yes", value: true },
    { label: "No", value: false },
];
exports.defaultStyles = {
    base: {
        get color() {
            return theme_1.theme.colors.TEXT;
        },
        fontSize: theme_1.theme.fontSizes.BODY,
    },
    disabled: {
        get color() {
            return theme_1.theme.colors.DISABLED;
        },
    },
    error: {
        get color() {
            return theme_1.theme.colors.ERROR;
        },
    },
    null: {
        get color() {
            return theme_1.theme.colors.GREY;
        },
    },
};
