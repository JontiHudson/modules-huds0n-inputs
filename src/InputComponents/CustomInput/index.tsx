import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import {
  onDismount,
  onMount,
  useCallback,
  useEffect,
  useImperativeHandle,
  useNodeId,
} from "@huds0n/utilities";

import * as InputState from "../../state";
import type { Types } from "../../types";

import { handleValueValidation } from "../helpers";

export function createCustomInput<T, P extends Object>(
  OutputComponent: Types.CustomInputSubComponent<T, P>,
  InputComponent?: Types.CustomInputSubComponent<T, P>
): Types.CustomInputComponent<T, P> {
  return React.forwardRef<Types.InputRefType, Types.CustomInputProps<T, P>>(
    (props, ref) => {
      const {
        autoFocus,
        downPress,
        upPress,
        disabled,
        disabledStyle,
        onBlur,
        onFocus,
        outputContainerStyle,
        onSubmitEditing,
        setIsFocused,
        value,
      } = props;

      const { error, onValueChange } = handleValueValidation(props);

      const [viewNodeRef, viewRef] = useNodeId<View>();
      const isFocused = InputState.useIsFocused(viewNodeRef);

      const putInputComponent = useCallback(() => {
        InputState.updateCustomInput(
          viewNodeRef,
          {
            Component: InputComponent,
            props: {
              closeInput: InputState.dismissInput,
              openInput: openInput,
              isFocused: isFocused,
              ...props,
              error: error,
              onValueChange: onValueChange,
            },
          },
          { downPress, upPress, submitPress: onSubmitEditing }
        );
      }, [...Object.values(props), isFocused, error, onValueChange]);

      function openInput() {
        if (disabled) {
          return null;
        }
        putInputComponent();

        return value;
      }

      // Handle lifecycle

      useEffect(() => {
        if (isFocused) {
          putInputComponent();
        }
      }, [putInputComponent]);

      onMount(() => {
        autoFocus && openInput();
      });

      onDismount(() => {
        if (viewNodeRef.current === InputState.currentlyFocusedInput()?.id) {
          InputState.dismissInput();
        }
      });

      useEffect(
        () => {
          if (isFocused) {
            onFocus && onFocus?.(value, error);
            setIsFocused?.(true);
          } else {
            onBlur && onBlur?.(value, error);
            setIsFocused?.(false);
          }
        },
        [isFocused],
        { skipMounts: true }
      );

      useImperativeHandle(ref, () => ({ focus: openInput }), [openInput]);

      return (
        <TouchableOpacity
          // @ts-ignore
          ref={viewRef}
          style={StyleSheet.flatten([
            outputContainerStyle,
            disabled && disabledStyle,
          ])}
          onPress={openInput}
          // Doesn't change color
          activeOpacity={1}
        >
          {
            <OutputComponent
              closeInput={InputState.dismissInput}
              openInput={openInput}
              isFocused={isFocused}
              {...props}
              error={error}
              onValueChange={onValueChange}
            />
          }
        </TouchableOpacity>
      );
    }
  );
}
