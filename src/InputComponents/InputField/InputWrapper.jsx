"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputWrapper = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const helpers_1 = require("./helpers");
function InputWrapper(_a) {
    var { onPress } = _a, props = (0, tslib_1.__rest)(_a, ["onPress"]);
    const { children, containerStyle, contentsContainerStyle, contentsWrapperStyle, error, message, messageContainerStyle, messageStyle, messageWrapperStyle, title, titleContainerStyle, titleStyle, } = props;
    const messageRef = (0, react_1.useRef)("");
    const messageString = typeof error === "string" ? error : message ? message : "";
    if (messageString)
        messageRef.current = messageString;
    return (<helpers_1.InputSubcomponent type="VIEW" {...props} onPress={onPress} style={containerStyle}>
      {title && (<helpers_1.InputSubcomponent type="VIEW" {...props} style={titleContainerStyle}>
          <helpers_1.InputSubcomponent type="TEXT" {...props} style={titleStyle}>
            {title}
          </helpers_1.InputSubcomponent>
        </helpers_1.InputSubcomponent>)}
      <helpers_1.InputSubcomponent type="VIEW" {...props} style={contentsWrapperStyle}>
        <helpers_1.InputSubcomponent type="VIEW" {...props} style={contentsContainerStyle}>
          {children}
        </helpers_1.InputSubcomponent>
      </helpers_1.InputSubcomponent>
      <helpers_1.InputSubcomponent type="VIEW" {...props} value={messageString} style={messageWrapperStyle}>
        <helpers_1.InputSubcomponent type="VIEW" {...props} value={messageString} style={messageContainerStyle}>
          <helpers_1.InputSubcomponent type="TEXT" {...props} value={messageString} style={messageStyle}>
            {messageRef.current}
          </helpers_1.InputSubcomponent>
        </helpers_1.InputSubcomponent>
      </helpers_1.InputSubcomponent>
    </helpers_1.InputSubcomponent>);
}
exports.InputWrapper = InputWrapper;
