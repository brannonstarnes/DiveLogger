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
  const [D, setD] = useState<number | undefined>(0); // depth
  const [Pm, setPm] = useState<number | undefined>(0); // Minimum pressure (abort pressure)
  const [Pc, setPc] = useState<number | undefined>(0); // Lowest pressure at start of dive
  const [RMV, setRMV] = useState<number>(0); // Resp Minute Volume
  const [FV, setFV] = useState<number | undefined>(0); // Floodable Volume
  const [N, setN] = useState<number | undefined>(0); // Number of bottles
  const [duration, setDuration] = useState<number | undefined>(); // Estimated duration of lowest scuba bottle
  const [open, setOpen] = useState(false); //for the bottle dropdown picker
  const [value, setValue] = useState(null); //for values of bottle dropdown picker
  const [openRates, setOpenRates] = useState(false); //for working rate dropdown picker
  const [valueRates, setValueRates] = useState(null); //for working reate dropdown picker values

  /*labels represent the material and size (cubic feet of air), values are floodable volume of the bottle (cubic feet of water). Ref US Navy Dive Man table 7-1*/
  const [items, setItems] = useState([
    { label: "Aluminum 50", value: 0.281 },
    { label: "Aluminum 63", value: 0.319 },
    { label: "Aluminum 80", value: 0.399 },
    { label: "Aluminum 100", value: 0.47 },
    { label: "Steel 72", value: 0.42 },
    { label: "Steel 100", value: 0.445 },
    { label: "Steel 120", value: 0.526 },
  ]);

  /*labels represent the aerobic difficulty of the dive, value is the Respiratory Minute Volume (actual cubic feet per minute) breathed by a diver. Ref US Navy Dive Man table 3-6*/
  const [itemsRates, setItemsRates] = useState([
    { label: "Normal (1.4)", value: 1.4 },
    { label: "Hard (2.4)", value: 2.4 },
  ]);

  var durationResults: number | undefined;

  //Checks textInputs for numbers only
  function isNumber(value: any) {
    return /^[0-9]+$/.test(value);
  }

  //Error Messages Creator
  function createErrorMsg(varName: string) {
    return Alert.alert(
      "Error",
      `Please enter a valid ${varName}. Value must be number only.`
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.depthContainer}>
        <Text style={styles.depthText}>Depth (fsw): </Text>
        <TextInput
          style={styles.depthInput}
          placeholder="0-190"
          onChangeText={setD}
          clearTextOnFocus={true}
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
            console.log("Rate: ", item.value);
            return setRMV(item.value);
          }}
        />
      </View>
      <View style={styles.bottleContainer}>
        <Button
          style={{ marginRight: 10, width: 120 }}
          title="Single"
          onPress={() => {
            setN(1), console.log("Selected single");
          }}
        />
        <Button
          style={{ marginRight: 10, width: 120 }}
          title="Double"
          onPress={() => {
            setN(2), console.log("Selected Double");
          }}
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
          console.log("Bottle Size: ", item.value);
          return setFV(item.value);
        }}
      />
      <View style={styles.pressureContainer}>
        <Text style={styles.bottleText}>Lowest Start psi:</Text>
        <TextInput
          style={styles.bottleInput}
          placeholder="ex. 2900"
          onChangeText={(userInput: SetStateAction<any>) => {
            console.log("Lowest Pressure: ", userInput);
            setPc(userInput);
          }}
        />

        <Text style={styles.abortText}>Abort psi:</Text>
        <TextInput
          style={styles.abortInput}
          placeholder="ex. 250"
          onChangeText={(userInput: SetStateAction<any>) => {
            console.log("Abort psi: ", userInput);
            setPm(userInput);
          }}
        />
      </View>
      <Button
        title="Get Result"
        onPress={() => {
          // console.log(
          //   "D: ",
          //   D,
          //   "RMV: ",
          //   RMV,
          //   "N: ",
          //   N,
          //   "FV: ",
          //   FV,
          //   "Pc: ",
          //   Pc,
          //   "Pm: ",
          //   Pm
          // );
          console.log(isNumber(D));
          if (D == 0 || !isNumber(D)) {
            return createErrorMsg("Depth");
          }
          if (Pm == 0 || !isNumber(Pm)) {
            return createErrorMsg("Abort Pressure");
          }
          if (Pc == 0 || !isNumber(Pc)) {
            return createErrorMsg("Starting Pressure");
          }
          let consumptionRate: any = getConsumptionRate(D, RMV);
          let volumeAvailable: any = getVolumeAvailable(Pm, Pc, FV, N);
          durationResults = getDuration(volumeAvailable, consumptionRate);
          durationResults = +durationResults.toFixed(2); //takes the durationResults string and makes it a rounded number
          console.log(
            "C: ",
            consumptionRate,
            "Va: ",
            volumeAvailable,
            "durationResults: ",
            durationResults.toFixed(2)
          );
          setDuration(durationResults);
        }}
      />
      <View style={styles.resultContainer}>
        <Text style={styles.durationText}>{duration} minutes</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  abortInput: {
    backgroundColor: "white",
    width: 150,
    height: 30,
  },
  abortText: {
    fontSize: 20,
  },
  bottleContainer: {
    marginVertical: 10,
    zIndex: -1,
    flexDirection: "row",
    height: 60,
    width: 400,
    justifyContent: "center",
  },
  bottleText: {
    fontSize: 20,
  },
  bottleInput: {
    backgroundColor: "white",
    height: 30,
    width: 150,
    marginBottom: 10,
  },
  depthContainer: {
    flexDirection: "row",
    height: 90,
    width: 190,
    padding: 30,
  },
  depthInput: {
    height: 30,
    width: 60,
    marginRight: 20,
    backgroundColor: "white",
    padding: 10,
    textAlign: "center",
  },
  depthText: {
    fontSize: 20,
  },
  dropDownBottles: {
    zIndex: -3,
    width: 250,
    marginLeft: 70,
    marginBottom: 10,
  },
  dropDownRates: {
    zIndex: 1,
    width: 170,
    position: "absolute",
    bottom: -15,
  },
  durationText: {
    fontSize: 50,
    marginTop: 40,
  },
  pressureContainer: {
    height: 150,
    width: 400,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  resultContainer: {
    height: 292,
    width: 414,
    alignItems: "center",
    backgroundColor: "grey",
  },
});
