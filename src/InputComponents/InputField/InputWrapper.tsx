import React, { useRef } from "react";

import { InputSubcomponent } from "./helpers";

import type { Types } from "../../types";

export function InputWrapper({ onPress, ...props }: Types.InputWrapperProps) {
  const {
    children,
    containerStyle,
    contentsContainerStyle,
    contentsWrapperStyle,
    error,
    message,
    messageContainerStyle,
    messageStyle,
    messageWrapperStyle,
    title,
    titleContainerStyle,
    titleStyle,
  } = props;

  const messageRef = useRef("");
  const messageString =
    typeof error === "string" ? error : message ? message : "";
  if (messageString) messageRef.current = messageString;

  return (
    <InputSubcomponent
      type="VIEW"
      {...props}
      onPress={onPress}
      style={containerStyle}
    >
      {title && (
        <InputSubcomponent type="VIEW" {...props} style={titleContainerStyle}>
          <InputSubcomponent type="TEXT" {...props} style={titleStyle}>
            {title}
          </InputSubcomponent>
        </InputSubcomponent>
      )}
      <InputSubcomponent type="VIEW" {...props} style={contentsWrapperStyle}>
        <InputSubcomponent
          type="VIEW"
          {...props}
          style={contentsContainerStyle}
        >
          {children}
        </InputSubcomponent>
      </InputSubcomponent>
      <InputSubcomponent
        type="VIEW"
        {...props}
        value={messageString}
        style={messageWrapperStyle}
      >
        <InputSubcomponent
          type="VIEW"
          {...props}
          value={messageString}
          style={messageContainerStyle}
        >
          <InputSubcomponent
            type="TEXT"
            {...props}
            value={messageString}
            style={messageStyle}
          >
            {messageRef.current}
          </InputSubcomponent>
        </InputSubcomponent>
      </InputSubcomponent>
    </InputSubcomponent>
  );
}
