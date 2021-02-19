import React from 'react';
import {
  Dimensions,
  Picker,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Pressable } from '@huds0n/components';
import { Core } from '@huds0n/core';
import { useCallback, useMemo } from '@huds0n/utilities';

import { InputManager } from '../../InputManager';
import { ItemProps, SubComponent } from './types';

export function InputComponent<ItemT = any>({
  onValueChange,
  nullable = true,
  nullPlaceholderStyle,
  nullLabel = '- Please Select -',
  pickerItems,
  style,
  value,
  ...rest
}: SubComponent<ItemT>) {
  Core.useState('darkMode');

  const { contentsColor } = Core.getInputColors();

  const _pickerItems = useMemo(
    (): ItemProps<ItemT>[] =>
      nullable
        ? [
            {
              color: nullPlaceholderStyle?.color || 'gray',
              label: nullLabel || '',
              value: null,
            } as ItemProps<ItemT>,
            ...pickerItems,
          ]
        : pickerItems,
    [nullable, nullPlaceholderStyle?.color, nullLabel, pickerItems],
  );

  if (Platform.OS === 'ios') {
    const PickerItems = useMemo(() => {
      return _pickerItems.map((pickerItem) => (
        <Picker.Item
          key={pickerItem.label || '_NULL_'}
          {...pickerItem}
          color={pickerItem.color || contentsColor}
        />
      ));
    }, [_pickerItems, contentsColor]);

    return (
      <View
        style={StyleSheet.flatten([
          { maxHeight: Dimensions.get('window').height },
        ])}
      >
        <Picker selectedValue={value} onValueChange={onValueChange} {...rest}>
          {PickerItems}
        </Picker>
      </View>
    );
  }

  const renderItem = useCallback(
    (item, index) => (
      <Pressable
        feedback="fade"
        key={index.toString()}
        style={{ padding: Core.spacings.M }}
        onPress={() => {
          onValueChange(item.value);
          InputManager.dismiss();
        }}
      >
        <Text
          style={{
            color: item.color || contentsColor,
            fontSize: Core.fontSizes.LABEL,
          }}
        >
          {item.label}
        </Text>
      </Pressable>
    ),
    [onValueChange, contentsColor],
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        minWidth: Core.dimensions.INPUT_WIDTH / 2,
        maxWidth: Core.dimensions.INPUT_WIDTH,
      }}
    >
      <ScrollView>{_pickerItems.map(renderItem)}</ScrollView>
    </View>
  );
}
