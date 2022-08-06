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
import {
  getConsumptionRate,
  getDuration,
  getVolumeAvailable,
} from "../calculations/bottleDuration";

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

  return (
    <SafeAreaView>
      <View style={styles.depthContainer}>
        <Text>
          Depth (fsw):{" "}
          <TextInput
            placeholder="0-190"
            onChange={(userInput: any) => setD(userInput)}
          />
        </Text>
        <Text>Working Rate: </Text>
      </View>
      <View style={styles.bottleContainer}>
        <Button title="Single" onPress={() => setN(1)} />
        <Button title="Double" onPress={() => setN(2)} />
        <DropDownPicker
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
      </View>
      <Text>
        Lowest Bottle psi:{" "}
        <TextInput
          placeholder="ex. 2900"
          onChange={(userInput: SetStateAction<any>) => {
            setPc(userInput);
          }}
        />
      </Text>

      <Text>
        Abort psi:
        <TextInput
          placeholder="ex. 250"
          onChange={(userInput: SetStateAction<any>) => {
            setPm(userInput);
          }}
        />
      </Text>

      <View>
        <Text>
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
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottleContainer: {
    backgroundColor: "gray",
  },
  depthContainer: {
    backgroundColor: "yellow",
  },
});
