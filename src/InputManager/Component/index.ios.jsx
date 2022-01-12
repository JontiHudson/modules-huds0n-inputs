"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputManagerComponent = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const InputAccessoryViewIOS_1 = require("../../InputAccessoryViewIOS");
const SlideModal_1 = require("./slideModal/SlideModal");
const AnimatedScreen_1 = require("./slideModal/AnimatedScreen");
const helpers_1 = require("./slideModal/helpers");
exports.InputManagerComponent = react_1.default.memo((props) => {
    const { focusedNodePadding = 20 } = props;
    const screenRef = (0, utilities_1.useRef)(null);
    (0, utilities_1.onMount)(() => {
        (0, helpers_1.initialise)(focusedNodePadding, screenRef);
    });
    return (<react_native_1.View ref={screenRef} style={{
            flex: 1,
            overflow: "hidden",
        }}>
        <AnimatedScreen_1.AnimatedScreen {...props}/>
        <SlideModal_1.SlideModal {...props}/>
        <InputAccessoryViewIOS_1.InputAccessoryView {...props}/>
      </react_native_1.View>);
});
