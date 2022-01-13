"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideModal = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const react_native_1 = require("react-native");
const theming_1 = require("@huds0n/theming");
const theme_1 = require("@huds0n/theming/src/theme");
const screen_manager_1 = require("@huds0n/screen-manager");
const utilities_1 = require("@huds0n/utilities");
const AccessoryView_1 = require("../../../InputAccessoryViewIOS/AccessoryView");
const InputState = (0, tslib_1.__importStar)(require("../../../state"));
const helpers_1 = require("./helpers");
const SlideModal = (props) => {
    const currentInput = InputState.useCustomInput();
    const { deviceWidth, screenMarginLeft, screenMarginRight } = screen_manager_1.ScreenManager.useDimensions();
    (0, theming_1.useIsDarkMode)();
    const wrapperRef = (0, react_1.useRef)(null);
    (0, utilities_1.useEffect)(() => {
        var _a;
        if (currentInput) {
            (_a = wrapperRef.current) === null || _a === void 0 ? void 0 : _a.measure((x, y, width, height) => {
                (0, helpers_1.handleCustomInputChange)(height);
            });
        }
    }, [currentInput], { layout: "END" });
    if (!currentInput)
        return null;
    const { Component, props: componentProps } = currentInput;
    const keyboardColor = theme_1.theme.colors.KEYBOARD;
    const customInputStyle = {
        flex: 1,
        transform: [{ translateY: helpers_1.inputYAnim }],
    };
    return (<react_native_1.View style={{ position: "absolute", top: "100%" }}>
      <react_native_1.Animated.View style={customInputStyle}>
        {Component && (<react_native_1.View ref={wrapperRef} style={{
                backgroundColor: keyboardColor,
                marginLeft: -screenMarginLeft,
                paddingLeft: screenMarginLeft,
                paddingRight: screenMarginRight,
                width: deviceWidth,
            }}>
            <AccessoryView_1.AccessoryView {...props}/>
            <react_native_1.View style={{ backgroundColor: keyboardColor }}>
              <Component {...componentProps}/>
            </react_native_1.View>
          </react_native_1.View>)}
        <react_native_1.View style={{
            backgroundColor: keyboardColor,
            height: react_native_1.Dimensions.get("screen").height,
        }}/>
      </react_native_1.Animated.View>
    </react_native_1.View>);
};
exports.SlideModal = SlideModal;
