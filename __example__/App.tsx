import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, ScrollView, View } from '@huds0n/components';
import {
  DateTimeField,
  PickerField,
  InputManager,
  TextField,
  useDateTimeInput,
  usePickerInput,
  useForm,
  useTextInput,
  validators,
} from '@huds0n/inputs';
import { ScreenManager } from '@huds0n/screen-manager';

export default function InputsPlayground() {
  const name = useTextInput();
  const gender = usePickerInput();
  const dob = useDateTimeInput();

  const { isModified, revertAll, validChanges, valueArray } = useForm(
    name,
    gender,
    dob,
  );

  const submit = () => {
    console.log(valueArray);
  };

  return (
    <ScreenManager
      initialAppearance={{
        statusBar: colors.BLUE,
        bottomBar: colors.BLUE,
        leftBar: colors.BLACK,
        rightBar: colors.BLACK,
      }}
    >
      <InputManager>
        <ScrollView
          fade={{ bottom: true }}
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.scrollView}
        >
          <TextField
            {...name}
            isRequired
            maxLength={32}
            title="Name"
            titleHighlightColor={colors.BLUE}
            validation={[validators.name, validators.length(2)]}
          />
          <PickerField
            {...gender}
            titleHighlightColor={colors.BLUE}
            title="Gender"
            pickerItems={[
              { label: 'Male', value: 0 },
              { label: 'Female', value: 1 },
            ]}
          />
          <DateTimeField
            {...dob}
            isRequired
            maximumDate={new Date()}
            title="Date of Birth"
            titleHighlightColor={colors.BLUE}
            onSubmitEditing={submit}
          />

          <View style={styles.footer}>
            <Button
              disabled={!isModified}
              disabledStyle={styles.buttonRevertDisabled}
              disabledLabelStyle={styles.buttonRevertLabelDisabled}
              labelStyle={styles.buttonRevertLabel}
              onPress={revertAll}
              style={styles.buttonRevert}
            >
              Revert
            </Button>

            <Button
              disabled={!validChanges}
              disabledStyle={styles.buttonSubmitDisabled}
              disabledLabelStyle={styles.buttonSubmitLabelDisabled}
              labelStyle={styles.buttonSubmitLabel}
              onPress={submit}
              style={styles.buttonSubmit}
            >
              Submit
            </Button>
          </View>
        </ScrollView>
      </InputManager>
    </ScreenManager>
  );
}

const colors = {
  BLACK: 'black',
  BLUE: '#468499',
  DARK_GREY: '#333333',
  RED: '#990000',
  WHITE: 'white',
};

const styles = StyleSheet.create({
  buttonSubmit: {
    backgroundColor: colors.BLUE,
  },
  buttonSubmitDisabled: {
    backgroundColor: colors.WHITE,
    borderColor: colors.BLUE,
    borderWidth: 1,
  },
  buttonSubmitLabel: {
    color: colors.WHITE,
  },
  buttonSubmitLabelDisabled: {
    color: colors.BLUE,
  },
  buttonRevert: {
    backgroundColor: colors.RED,
  },
  buttonRevertDisabled: {
    backgroundColor: colors.WHITE,
    borderColor: colors.RED,
    borderWidth: 1,
  },
  buttonRevertLabel: {
    color: colors.WHITE,
  },
  buttonRevertLabelDisabled: {
    color: colors.RED,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  scrollView: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  scrollViewContainer: {
    padding: 40,
  },
});
