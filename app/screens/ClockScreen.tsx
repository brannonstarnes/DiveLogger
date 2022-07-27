import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function ClockScreen() {
  return (
    <View style={styles.screenContainer}>
      <StatusBar />
      <View style={styles.clockContainer}>
        <Text style={styles.clockNumbers}>00:28::53</Text>
      </View>
      <View style={styles.clockButtonsContainer}></View>
      <View style={styles.logsContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  clockContainer: {
    display: "flex",
    width: 381,
    height: 103.47,
    backgroundColor: "#000000",
    top: 30,
    justifyContent: "center",
  },
  clockButtonsContainer: {},
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
