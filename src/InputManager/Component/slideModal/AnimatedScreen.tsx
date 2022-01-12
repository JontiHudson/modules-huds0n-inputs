import React from "react";
import { Animated } from "react-native";

import { Types } from "../../../types";
import { screenYAnim } from "./helpers";

export const AnimatedScreen = React.memo(
  ({ children }: Types.InputManagerProps) => {
    const screenStyle = {
      flex: 1,
      transform: [{ translateY: screenYAnim }],
    };

    return <Animated.View style={screenStyle}>{children}</Animated.View>;
  }
);
