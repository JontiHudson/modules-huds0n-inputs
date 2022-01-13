"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputField = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const animations_1 = require("@huds0n/animations");
const components_1 = require("@huds0n/components");
const theme_1 = require("@huds0n/theming/src/theme");
const helpers_1 = require("./helpers");
const InputWrapper_1 = require("./InputWrapper");
const { colors, dimensions, fontSizes, spacings } = theme_1.theme;
const ANIMATION_DURATION = 300;
const TITLE_ANIMATE_SCALE = 0.7;
function InputField(props) {
    return (<InputWrapper_1.InputWrapper onPress={!props.isFocused ? props.focus : undefined} containerStyle={{
            marginTop: spacings.M,
            paddingBottom: spacings.L,
            maxWidth: dimensions.INPUT_WIDTH,
            width: "100%",
        }} contentsContainerStyle={{
            base: {
                borderRadius: spacings.M,
                borderWidth: 1,
                flexDirection: "row",
                padding: spacings.M,
            },
            baseAnim: { borderColor: colors.BORDER },
            focusedAnim: { borderColor: colors.PRIMARY },
            animate: { duration: ANIMATION_DURATION },
        }} titleContainerStyle={{
            position: "absolute",
            padding: spacings.M,
        }} titleStyle={{
            base: {
                color: colors.TEXT,
                fontSize: fontSizes.BODY,
                top: 0,
                left: 0,
                width: dimensions.INPUT_WIDTH,
            },
            baseAnim: {
                opacity: 0.6,
                transform: [
                    { translateY: 0 },
                    { translateX: props.icon ? 24 : 0 },
                    { scale: 1 },
                ],
            },
            focusedAnim: {
                opacity: 1,
                transform: [
                    { translateY: -34 },
                    {
                        translateX: -dimensions.INPUT_WIDTH * (1 - TITLE_ANIMATE_SCALE) * 0.5,
                    },
                    { scale: TITLE_ANIMATE_SCALE },
                ],
            },
            hasValueAnim: {
                opacity: 1,
                transform: [
                    { translateY: -34 },
                    {
                        translateX: -dimensions.INPUT_WIDTH * (1 - TITLE_ANIMATE_SCALE) * 0.5,
                    },
                    { scale: TITLE_ANIMATE_SCALE },
                ],
            },
            animate: { duration: ANIMATION_DURATION, useNativeDriver: true },
        }} messageContainerStyle={{
            baseAnim: {
                transform: [{ translateY: -20 }],
            },
            hasValueAnim: {
                transform: [{ translateY: 0 }],
            },
            animate: { duration: ANIMATION_DURATION, useNativeDriver: true },
        }} messageWrapperStyle={{
            alignItems: "flex-end",
            bottom: 0,
            height: 20,
            justifyContent: "flex-end",
            overflow: "hidden",
            position: "absolute",
            width: "100%",
        }} messageStyle={{
            baseAnim: { color: colors.TEXT },
            errorAnim: { color: colors.ERROR },
            animate: { duration: ANIMATION_DURATION },
        }} {...props}>
      {props.icon && (<>
          <components_1.Icon {...props.icon} color={props.error ? colors.ERROR : colors.TEXT}/>
          <react_native_1.View style={{ width: spacings.M }}/>
        </>)}

      <animations_1.AnimatedView animate={{
            to: { opacity: props.isFocused || (0, helpers_1.getHasValue)(props.value) ? 1 : 0 },
            duration: ANIMATION_DURATION,
        }} style={{ flex: 1 }} useNativeDriver>
        {props.children}
      </animations_1.AnimatedView>
    </InputWrapper_1.InputWrapper>);
}
exports.InputField = InputField;
