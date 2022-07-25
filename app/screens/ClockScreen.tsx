import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button } from "@rneui/themed";
import { DataTable } from "react-native-paper";

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
        <View style={styles.logsContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Event</DataTable.Title>
              <DataTable.Title>Clock Time</DataTable.Title>
              <DataTable.Title>Depth</DataTable.Title>
              <DataTable.Title>Notes</DataTable.Title>
            </DataTable.Header>
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
          </DataTable>
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
  logsContainer: {
    display: "flex",
    position: "absolute",
    top: 360,
    width: 381,
    height: 300,
  },
  screenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
