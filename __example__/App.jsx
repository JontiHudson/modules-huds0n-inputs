"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const react_native_1 = require("react-native");
const components_1 = require("@huds0n/components");
const inputs_1 = require("@huds0n/inputs");
const screen_manager_1 = require("@huds0n/screen-manager");
function InputsPlayground() {
    const name = (0, inputs_1.useTextInput)();
    const gender = (0, inputs_1.usePickerInput)();
    const dob = (0, inputs_1.useDateTimeInput)();
    const { isModified, revertAll, validChanges, valueArray } = (0, inputs_1.useForm)(name, gender, dob);
    const submit = () => {
        console.log(valueArray);
    };
    return (<screen_manager_1.ScreenManager initialAppearance={{
            statusBar: colors.BLUE,
            bottomBar: colors.BLUE,
            leftBar: colors.BLACK,
            rightBar: colors.BLACK,
        }}>
      <inputs_1.InputManager>
        <components_1.ScrollView contentContainerStyle={styles.scrollViewContainer} style={styles.scrollView}>
          <inputs_1.InputField {...name.fieldProps} icon={{ name: "user", set: "FontAwesome" }} title="Name">
            <inputs_1.TextInput {...name} isRequired maxLength={32} validator={[inputs_1.validators.name, inputs_1.validators.length(2)]}/>
          </inputs_1.InputField>

          <inputs_1.InputField {...gender.fieldProps} icon={gender.value === null
            ? { name: "genderless", set: "FontAwesome" }
            : {
                name: gender.value === 1 ? "gender-male" : "gender-female",
                set: "MaterialCommunityIcons",
            }} title="Gender">
            <inputs_1.PickerInput {...gender} pickerItems={[
            { label: "Male", value: 0 },
            { label: "Female", value: 1 },
        ]}/>
          </inputs_1.InputField>

          <inputs_1.InputField {...dob.fieldProps} icon={{ name: "birthday-cake", set: "FontAwesome", size: 16 }} title="Date Of Birth">
            <inputs_1.DateTimeInput {...dob} isRequired maximumDate={new Date()} onSubmitEditing={validChanges && submit}/>
          </inputs_1.InputField>

          <react_native_1.View style={styles.footer}>
            <components_1.Button disabled={!isModified} disabledStyle={styles.buttonRevertDisabled} disabledLabelStyle={styles.buttonRevertLabelDisabled} labelStyle={styles.buttonRevertLabel} onPress={revertAll} style={styles.buttonRevert}>
              Revert
            </components_1.Button>

            <components_1.Button disabled={!validChanges} disabledStyle={styles.buttonSubmitDisabled} disabledLabelStyle={styles.buttonSubmitLabelDisabled} labelStyle={styles.buttonSubmitLabel} onPress={submit} style={styles.buttonSubmit}>
              Submit
            </components_1.Button>
          </react_native_1.View>
        </components_1.ScrollView>
      </inputs_1.InputManager>
    </screen_manager_1.ScreenManager>);
}
exports.default = InputsPlayground;
const colors = {
    BLACK: "black",
    BLUE: "#468499",
    DARK_GREY: "#333333",
    RED: "#990000",
    WHITE: "white",
};
const styles = react_native_1.StyleSheet.create({
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
