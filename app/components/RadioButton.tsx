import * as React from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";

const WorkRateRadioButtons = () => {
  const [checked, setChecked] = React.useState("first");

  return (
    <View>
      <RadioButton
        value="Normal"
        status={checked === "Normal" ? "checked" : "unchecked"}
        onPress={() => setChecked("Normal")}
      />
      <RadioButton
        value="Hard"
        status={checked === "Hard" ? "checked" : "unchecked"}
        onPress={() => setChecked("Hard")}
      />
    </View>
  );
};

export default WorkRateRadioButtons;
