import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button } from "@rneui/themed";
import { ButtonGroup } from "@rneui/base";

export default function ClockScreen() {
  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <StatusBar style="auto" />
        <View style={styles.clockContainer}>
          <Text style={styles.clockNumbers}>00:28::53</Text>
        </View>
        <View style={styles.clockButtonsContainer}>
          <View style={styles.buttonGroup1}>
            <Button
              title="Left Surface"
              onPress={() => alert("Left Surface!")}
              size="lg"
              type="outline"
            />
            <Button
              title="Reached Bottom"
              onPress={() => alert("Reached Bottom!")}
              size="lg"
              type="outline"
            />
            <Button
              title="Left Bottom"
              onPress={() => alert("Left Bottom!")}
              size="lg"
              type="outline"
            />
            <Button
              title="Reached Surface"
              onPress={() => alert("Reached Surface!")}
              size="lg"
              type="outline"
            />
          </View>

          <View style={styles.buttonGroup2}>
            <Button
              title="On O2"
              onPress={() => alert("On O2!")}
              size="lg"
              type="solid"
              color="success"
            />
            <Button
              title="HOLD!"
              onPress={() => alert("HOLD!")}
              size="lg"
              type="solid"
              color="warning"
            />
            <Button
              title="Stop"
              onPress={() => alert("End Dive?")}
              size="lg"
              type="solid"
              color="error"
            />
            <Button
              title="Reset"
              onPress={() => alert("Reset Watch?")}
              size="lg"
              type="solid"
              color=""
            />
          </View>
        </View>
        <View style={styles.logsContainer}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonGroup1: {
    width: 170,
  },
  buttonGroup2: {
    width: 170,
    marginLeft: 40,
  },
  clockContainer: {
    display: "flex",
    width: 381,
    height: 103.47,
    backgroundColor: "#000000",
    top: 20,
    justifyContent: "center",
  },
  clockButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    width: 381,
    height: 160,
    marginTop: 40,
  },
  clockNumbers: {
    color: "#E0E0E0",
    textAlign: "center",
    fontSize: 48,
  },
  logsContainer: {},
  screenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
