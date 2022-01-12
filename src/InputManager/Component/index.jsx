"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputManagerComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const OverlayModal_1 = require("./overlayModal/OverlayModal");
exports.InputManagerComponent = react_1.default.memo((props) => {
    const { children } = props;
    return (<react_native_1.View style={{ flex: 1 }}>
        {children}
        <OverlayModal_1.OverlayModal {...props}/>
      </react_native_1.View>);
});
