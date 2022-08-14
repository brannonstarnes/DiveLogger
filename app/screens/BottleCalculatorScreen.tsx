import React, { SetStateAction } from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import {
  getConsumptionRate,
  getDuration,
  getVolumeAvailable,
} from "../calculations/bottleDuration";
import { Button } from "@rneui/themed";

export default function BottleCalculatorScreen() {
  const [D, setD] = useState<number | undefined>(); // depth
  const [Pm, setPm] = useState<number | undefined>(); // Minimum pressure (abort pressure)
  const [Pc, setPc] = useState<number | undefined>(); // Lowest pressure at start of dive
  const [RMV, setRMV] = useState<number>(); // Resp Minute Volume
  const [FV, setFV] = useState<number | undefined>(); // Floodable Volume
  const [N, setN] = useState<number | undefined>(); // Number of bottles
  const [C, setC] = useState<any>(); // Consumption Rate
  const [Va, setVa] = useState<any>(); // Volume of air available
  const [duration, setDuration] = useState<number | undefined>(); // Estimated duration of lowest scuba bottle
  const [open, setOpen] = useState(false);
  const [openRates, setOpenRates] = useState(false);
  const [valueRates, setValueRates] = useState(null);
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

  const [itemsRates, setItemsRates] = useState([
    { label: "Normal (1.4)", value: 1.4 },
    { label: "Hard (2.4)", value: 2.4 },
    {
      /*DOUBLE CHECK THIS VALUE!!!!!!!*/
    },
  ]);

  return (
    <SafeAreaView>
      <View style={styles.depthContainer}>
        <Text>Depth (fsw): </Text>
        <TextInput
          style={styles.depthInput}
          placeholder="0-190"
          onChange={(userInput: any) => setD(userInput)}
        />
        <DropDownPicker
          style={styles.dropDownRates}
          placeholder="Select a working rate"
          open={openRates}
          value={valueRates}
          items={itemsRates}
          setOpen={setOpenRates}
          setValue={setValueRates}
          setItems={setItemsRates}
          onSelectItem={(item: any) => {
            return setRMV(item);
          }}
        />
      </View>
      <View style={styles.bottleContainer}>
        <Button
          style={{ marginRight: 10, width: 120 }}
          title="Single"
          onPress={() => setN(1)}
        />
        <Button
          style={{ marginRight: 10, width: 120 }}
          title="Double"
          onPress={() => setN(2)}
        />
      </View>
      <DropDownPicker
        placeholder="Select Bottle Size"
        style={styles.dropDownBottles}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={(item: any) => {
          return setFV(item);
        }}
      />
      <View style={styles.pressureContainer}>
        <Text>Lowest Bottle psi:</Text>
        <TextInput
          placeholder="ex. 2900"
          onChange={(userInput: SetStateAction<any>) => {
            setPc(userInput);
          }}
        />

        <Text>Abort psi:</Text>
        <TextInput
          placeholder="ex. 250"
          onChange={(userInput: SetStateAction<any>) => {
            setPm(userInput);
          }}
        />
      </View>
      <View style={styles.resultContainer}>
        <Button
          title="Get Result"
          onPress={() => {
            let volume = getVolumeAvailable(Pm, Pc, FV, N);
            let consumpRate: any = getConsumptionRate(D, RMV);
            setVa(volume);
            setC(consumpRate);
            if (Va && C) {
            }
            let minutes: number = Va / C;
            setDuration(minutes);
          }}
        />
        {duration}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottleContainer: {
    marginVertical: 10,
    zIndex: -1,
    flexDirection: "row",
    height: 60,
    width: 400,
    justifyContent: "center",
  },
  depthContainer: {
    flexDirection: "row",
    height: 80,
    width: 190,
    padding: 30,
  },
  depthInput: {
    height: 20,
    width: 60,
    marginRight: 20,
    backgroundColor: "white",
    padding: 10,
    textAlign: "center",
  },
  dropDownBottles: {
    zIndex: -3,
    width: 250,
    marginLeft: 70,
    marginBottom: 10,
  },
  dropDownRates: {
    zIndex: 1,
    width: 190,
    position: "absolute",
    bottom: -15,
  },
  pressureContainer: {
    height: 100,
    width: 400,
    backgroundColor: "turquoise",
  },
  resultContainer: {
    height: 100,
    width: 400,
    backgroundColor: "pink",
  },
});
