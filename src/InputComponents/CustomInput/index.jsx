"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomInput = void 0;
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
const InputState = (0, tslib_1.__importStar)(require("../../state"));
const helpers_1 = require("../helpers");
function createCustomInput(OutputComponent, InputComponent) {
    return react_1.default.forwardRef((props, ref) => {
        const { autoFocus, downPress, upPress, disabled, disabledStyle, onBlur, onFocus, outputContainerStyle, onSubmitEditing, setIsFocused, value, } = props;
        const { error, onValueChange } = (0, helpers_1.handleValueValidation)(props);
        const [viewNodeRef, viewRef] = (0, utilities_1.useNodeId)();
        const isFocused = InputState.useIsFocused(viewNodeRef);
        const putInputComponent = (0, utilities_1.useCallback)(() => {
            InputState.updateCustomInput(viewNodeRef, {
                Component: InputComponent,
                props: {
                    closeInput: InputState.dismissInput,
                    openInput: openInput,
                    isFocused: isFocused,
                    ...props,
                    error: error,
                    onValueChange: onValueChange,
                },
            }, { downPress, upPress, submitPress: onSubmitEditing });
        }, [...Object.values(props), isFocused, error, onValueChange]);
        function openInput() {
            if (disabled) {
                return null;
            }
            putInputComponent();
            return value;
        }
        (0, utilities_1.useEffect)(() => {
            if (isFocused) {
                putInputComponent();
            }
        }, [putInputComponent]);
        (0, utilities_1.onMount)(() => {
            autoFocus && openInput();
        });
        (0, utilities_1.onDismount)(() => {
            var _a;
            if (viewNodeRef.current === ((_a = InputState.currentlyFocusedInput()) === null || _a === void 0 ? void 0 : _a.id)) {
                InputState.dismissInput();
            }
        });
        (0, utilities_1.useEffect)(() => {
            if (isFocused) {
                onFocus && (onFocus === null || onFocus === void 0 ? void 0 : onFocus(value, error));
                setIsFocused === null || setIsFocused === void 0 ? void 0 : setIsFocused(true);
            }
            else {
                onBlur && (onBlur === null || onBlur === void 0 ? void 0 : onBlur(value, error));
                setIsFocused === null || setIsFocused === void 0 ? void 0 : setIsFocused(false);
            }
        }, [isFocused], { skipMounts: true });
        (0, utilities_1.useImperativeHandle)(ref, () => ({ focus: openInput }), [openInput]);
        return (<react_native_1.TouchableOpacity ref={viewRef} style={react_native_1.StyleSheet.flatten([
                outputContainerStyle,
                disabled && disabledStyle,
            ])} onPress={openInput} activeOpacity={1}>
          {<OutputComponent closeInput={InputState.dismissInput} openInput={openInput} isFocused={isFocused} {...props} error={error} onValueChange={onValueChange}/>}
        </react_native_1.TouchableOpacity>);
    });
}
exports.createCustomInput = createCustomInput;
