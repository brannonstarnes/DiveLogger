import React from "react";
import { SafeAreaView, View, Text, TextInput, Button } from "react-native";

import SelectDropdown from "react-native-select-dropdown";

const workingRates: Array<object> = [{ Normal: 1.4 }, { Hard: 2.4 }];
const bottleSizes: Array<object> = [
  { "Aluminum 50": 0.281 },
  { "Aluminum 63": 0.319 },
  { "Aluminum 80": 0.399 },
  { "Aluminum 100": 0.47 },
  { "Steel 72": 0.42 },
  { "Steel 100": 0.445 },
  { "Steel 120": 0.526 },
];

const BottleCalculatorScreen = () => {
  return (
    <SafeAreaView>
      <Text>Depth (fsw): </Text>
      <TextInput placeholder="0-190" />
      <Text>Working Rate: </Text>
      <SelectDropdown
        defaultButtonText="Select Working Rate"
        data={workingRates}
      />
      <SelectDropdown
        defaultButtonText="Size and Material"
        data={bottleSizes}
      />
      <Button title="Single" /> <Button title="Double" />
      <Text>Lowest Bottle psi: </Text>
      <TextInput />
      <Text>Abort psi: </Text>
      <TextInput />
    </SafeAreaView>
  );
};
