import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { Button } from "@rneui/themed";
import { DataTable } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const logsIcon = <FontAwesome5 size={32} name={"clock"} />;
const calcIcon = <FontAwesome5 size={32} name={"calculator"} />;
const decoIcon = <FontAwesome5 size={32} name={"chart-line"} />;
const aboutIcon = <FontAwesome5 size={32} name={"info"} />;

export default function ClockScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setClockTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        //setInterval(func, milliseconds)
        setClockTime((previousTime: number) => previousTime + 1); //setTimeout(func, milliseconds)
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <StatusBar style="auto" />
        <View style={styles.clockContainer}>
          <Text style={styles.clockNumbers}>
            {("0" + Math.floor((time / (60 * 60)) % 60)).slice(-2)}:
            {("0" + Math.floor((time / 60) % 60)).slice(-2)}:
            {("0" + Math.floor(time % 60)).slice(-2)}
          </Text>
        </View>
        <View style={styles.clockButtonsContainer}>
          <View style={styles.buttonGroup1}>
            <Button
              title="Left Surface"
              onPress={() => {
                console.log("Clock Running");
                setIsRunning(true);
              }}
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
              onPress={() => {
                setIsRunning(false);
                console.log("Clock Stopped");
              }}
              size="lg"
              type="solid"
              color="error"
            />
            <Button
              title="Reset"
              onPress={() => setClockTime(0)}
              size="lg"
              type="solid"
              color=""
            />
          </View>
        </View>
        <View style={styles.logsContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Event</DataTable.Title>
              <DataTable.Title>Clock Time</DataTable.Title>
              <DataTable.Title>Depth</DataTable.Title>
              <DataTable.Title>Notes</DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {
                // Mapping of log data should render <DataTable.Row> <DataTable.Cell>{event}</DT.Cell> <DT.Cell>{clock time}</DT.Cell> <DT.Cell>{Notes}</DT.Cell> </DT.Row>
              }
              <DataTable.Row>
                <DataTable.Cell>I/L LS</DataTable.Cell>
                <DataTable.Cell>1042</DataTable.Cell>
                <DataTable.Cell>200 fsw</DataTable.Cell>
                <DataTable.Cell>Red|Green</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>I/L LS</DataTable.Cell>
                <DataTable.Cell>1042</DataTable.Cell>
                <DataTable.Cell>200 fsw</DataTable.Cell>
                <DataTable.Cell>Red|Green</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>I/L LS</DataTable.Cell>
                <DataTable.Cell>1042</DataTable.Cell>
                <DataTable.Cell>200 fsw</DataTable.Cell>
                <DataTable.Cell>Red|Green</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>I/L LS</DataTable.Cell>
                <DataTable.Cell>1042</DataTable.Cell>
                <DataTable.Cell>200 fsw</DataTable.Cell>
                <DataTable.Cell>Red|Green</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>I/L LS</DataTable.Cell>
                <DataTable.Cell>1042</DataTable.Cell>
                <DataTable.Cell>200 fsw</DataTable.Cell>
                <DataTable.Cell>Red|Green</DataTable.Cell>
              </DataTable.Row>
            </ScrollView>
          </DataTable>
        </View>
        <View style={styles.BottomNavContainer}>
          <Text style={styles.navButtons}>
            {logsIcon} | {calcIcon} | {decoIcon} | {aboutIcon}
          </Text>
        </View>
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
  BottomNavContainer: {
    position: "absolute",
    top: 666,
    justifyContent: "center",
    backgroundColor: "purple",
    width: 414,
    height: 50,
  },
  clockNumbers: {
    position: "relative",
    top: 20,
    flexDirection: "row",
    color: "#E0E0E0",
    textAlign: "center",
    fontSize: 48,
    margin: 0,
    width: 381,
    height: 104,
  },
  clockContainer: {
    display: "flex",
    flexDirection: "row",
    width: 381,
    height: 103.47,
    backgroundColor: "#000000",
    top: 20,
    justifyContent: "center",
    alignContent: "center",
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
    margin: 0,
  },
  logsContainer: {
    display: "flex",
    position: "absolute",
    top: 360,
    width: 381,
    height: 300,
  },
  navButtons: {
    textAlign: "center",
    fontSize: "25px",
    color: "white",
  },
  screenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
