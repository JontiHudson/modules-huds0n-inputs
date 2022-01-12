import React from "react";
import { StyleSheet, View } from "react-native";

import { Button, ScrollView } from "@huds0n/components";
import {
  DateTimeInput,
  PickerInput,
  InputManager,
  InputField,
  TextInput,
  useDateTimeInput,
  usePickerInput,
  useForm,
  useTextInput,
  validators,
} from "@huds0n/inputs";
import { ScreenManager } from "@huds0n/screen-manager";

export default function InputsPlayground() {
  const name = useTextInput();
  const gender = usePickerInput();
  const dob = useDateTimeInput();

  const { isModified, revertAll, validChanges, valueArray } = useForm(
    name,
    gender,
    dob
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
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.scrollView}
        >
          <InputField
            {...name.fieldProps}
            icon={{ name: "user", set: "FontAwesome" }}
            title="Name"
          >
            <TextInput
              {...name}
              isRequired
              maxLength={32}
              validator={[validators.name, validators.length(2)]}
            />
          </InputField>

          <InputField
            {...gender.fieldProps}
            icon={
              gender.value === null
                ? { name: "genderless", set: "FontAwesome" }
                : {
                    name: gender.value === 1 ? "gender-male" : "gender-female",
                    set: "MaterialCommunityIcons",
                  }
            }
            title="Gender"
          >
            <PickerInput
              {...gender}
              pickerItems={[
                { label: "Male", value: 0 },
                { label: "Female", value: 1 },
              ]}
            />
          </InputField>

          <InputField
            {...dob.fieldProps}
            icon={{ name: "birthday-cake", set: "FontAwesome", size: 16 }}
            title="Date Of Birth"
          >
            <DateTimeInput
              {...dob}
              isRequired
              maximumDate={new Date()}
              onSubmitEditing={validChanges && submit}
            />
          </InputField>

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
  BLACK: "black",
  BLUE: "#468499",
  DARK_GREY: "#333333",
  RED: "#990000",
  WHITE: "white",
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  scrollView: {
    height: "100%",
    width: "100%",
  },
  scrollViewContainer: {
    padding: 40,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
