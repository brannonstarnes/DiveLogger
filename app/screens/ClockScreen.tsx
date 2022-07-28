import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { Button } from "@rneui/themed";
import { DataTable } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  addLeadingZerosToTimes,
  roundUpTime,
} from "../calculations/stringifyTime";
import stringifyTime from "../calculations/stringifyTime";

const logsIcon = <FontAwesome5 size={32} name={"clock"} />;
const calcIcon = <FontAwesome5 size={32} name={"calculator"} />;
const decoIcon = <FontAwesome5 size={32} name={"chart-line"} />;
const aboutIcon = <FontAwesome5 size={32} name={"info"} />;

export default function ClockScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setClockTime] = useState(0);
  const [diveLog, setDiveLog] = useState([]);
  const [leftSurface, setLeftSurface] = useState(new Date());
  const [leftBottom, setLeftBottom] = useState(new Date());
  const [reachedSurface, setReachedSurface] = useState(new Date());

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

  //Sets types fror the Log Entry Object. '?' indicates optional properties
  interface LogEntry {
    abbrev: string;
    eventTime: string;
    depth?: any;
    notes?: string;
  }

  //JSX Element, Creates a Row in the Logs Table, accepts an entry object
  const mapEntries = diveLog.map((logEntry: LogEntry) => {
    return (
      <DataTable.Row key={logEntry.eventTime}>
        <DataTable.Cell>{logEntry.abbrev}</DataTable.Cell>
        <DataTable.Cell>{logEntry.eventTime}</DataTable.Cell>
        <DataTable.Cell>{logEntry.depth}</DataTable.Cell>
        <DataTable.Cell>{logEntry.notes}</DataTable.Cell>
      </DataTable.Row>
    );
  });

  //Update dive log without losing previous entries. When no entries divelog is empty string "".
  const updateDiveLog = (entry: LogEntry) => {
    let entries: any = [...diveLog, entry];
    setDiveLog(entries || "");
  };

  //This fn takes params(depth:bool, notes:bool) to select which prompts are required for a logging event. If left false, empty string will be logged to the dive log table
  const promptUserDepthOrNotes = (depth = false, notes = false) => {
    let userDepth: any;
    let userNotes: any;
    depth ? (userDepth = Alert.prompt("Please Enter Depth")) : (userDepth = "");
    notes
      ? (userNotes = Alert.prompt("Add Notes For This Event: "))
      : (userNotes = "");
    return [userDepth, userNotes];
  };

  // Async function that awaits user input, accepts a function that asks for specific input (ie depth, notes)
  const getUserInput = async (promptFunction: any) => {
    const response = updateDiveLog(await promptFunction);
    return response;
  };

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
                setIsRunning(true);
                const LS = new Date();
                setLeftSurface(LS); //Cant assign Date to leftSurface state?
                const stringLS = stringifyTime(LS);
                let newEntry: LogEntry = {
                  abbrev: "LS",
                  eventTime: stringLS,
                  depth: 0,
                  notes: "",
                };
                updateDiveLog(newEntry);
              }}
              size="lg"
              type="outline"
            />
            <Button
              title="Reached Bottom"
              onPress={() => {
                // let currDepth = getUserInput(
                //   promptUserDepthOrNotes(true, false)
                // );
                const RB = new Date();
                const descent = RB.getTime() - leftSurface.getTime();
                const stringRB = stringifyTime(RB);
                let newEntry: LogEntry = {
                  abbrev: "RB",
                  eventTime: stringRB,
                  depth: 35,
                  notes: `:${roundUpTime(descent)} descent`,
                };
                updateDiveLog(newEntry);
              }}
              size="lg"
              type="outline"
            />
            <Button
              title="Left Bottom"
              onPress={() => {
                const LB = new Date();
                setLeftBottom(LB);
                const stringLB = stringifyTime(LB);
                const bottomTime = LB.getTime() - leftSurface.getTime();
                let newEntry: LogEntry = {
                  abbrev: "LB",
                  eventTime: stringLB,
                  depth: 30,
                  notes: `:${roundUpTime(bottomTime)} BT`,
                };
                updateDiveLog(newEntry);
              }}
              size="lg"
              type="outline"
            />
            <Button
              title="Reached Surface"
              onPress={() => {
                const RS = new Date();
                setReachedSurface(RS);
                const stringRS = stringifyTime(RS);
                const ascentInMillisec = RS.getTime() - leftBottom.getTime(); //locally scoped var - state
                const ascent = addLeadingZerosToTimes(
                  Math.floor(ascentInMillisec / 1000)
                ); //Round down ascent to closest second
                let newEntry: LogEntry = {
                  abbrev: "RS",
                  eventTime: stringRS,
                  depth: 0,
                  notes: `::${ascent} ascent`,
                };
                updateDiveLog(newEntry);
              }}
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
              onPress={() => {
                setClockTime(0);
                setDiveLog([]);
              }}
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
                mapEntries || "" // Will create a row for each entry object in diveLog array
              }
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
  logsContainer: {
    display: "flex",
    position: "absolute",
    top: 360,
    width: 381,
    height: 300,
  },
  navButtons: {
    textAlign: "center",
    fontSize: 25,
    color: "white",
  },
  screenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
