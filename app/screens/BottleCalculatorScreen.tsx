import React, { SetStateAction } from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

const [D, setD] = useState(null); // depth
const [Pm, setPm] = useState(null); // Minimum pressure (abort pressure)
const [Pc, setPc] = useState(null); // Lowest pressure at start of dive
const [RMV, setRMV] = useState(null); // Resp Minute Volume
const [FV, setFV] = useState(0); // Floodable Volume
const [N, setN] = useState(null); // Number of bottles
const [C, setC] = useState(null); // Consumption Rate
const [Va, setVa] = useState(null); // Volume of air available
const [duration, setDuration] = useState(null); // Estimated duration of lowest scuba bottle
const [open, setOpen] = useState(false);
const [value, setValue] = useState(null);
const [items, setItems] = useState([
  { label: "Aluminum 50", value: 0.281 },
  { label: "Aluminum 63", value: 0.319 },
  { label: "Aluminum 80", value: 0.399 },
  { label: "Aluminum 100", value: 0.47 },
  { label: "Steel 72", value: 0.42 },
  { label: "Steel 100", value: 0.445 },
  { label: "Steel 120", value: 0.526 },
]);

const respiratoryMinuteVolume: object = { Normal: 1.4, Hard: 2.4 }; //represents the breathing rates for normal dives and high intensity dives in cubic feet/min (CFM)

const BottleCalculatorScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.depthContainer}>
        <Text>
          Depth (fsw): <TextInput placeholder="0-190" />
        </Text>
        <Text>Working Rate: </Text>
      </View>
      <View style={styles.bottleContainer}>
        <Button title="Single" /> <Button title="Double" />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item: number) => {
            return setFV(item);
          }}
        />
      </View>
      <Text>
        Lowest Bottle psi:{" "}
        <TextInput
          placeholder="ex. 2900"
          onChange={(userInput) => {
            setPc(userInput);
          }}
        />
      </Text>

      <Text>
        Abort psi: <TextInput placeholder="ex. 250" />
      </Text>

      <View></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottleContainer: {
    backgroundColor: "gray",
  },
  depthContainer: {
    backgroundColor: "yellow",
  },
});
