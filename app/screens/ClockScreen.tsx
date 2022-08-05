import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect, SetStateAction } from "react";

import { StatusBar } from "expo-status-bar";
import { Button } from "@rneui/themed";
import { DataTable } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {
  addLeadingZerosToTimes,
  millisToMinutesAndSeconds,
  roundUpTime,
} from "../calculations/stringifyTime";
import stringifyTime from "../calculations/stringifyTime";
import {
  getUsableDepth,
  getChart,
  getSchedule,
  getRGD,
  stringToNumber,
} from "../calculations/tableSchedRGD";
import chartMap from "../calculations/charts";

const logsIcon = <FontAwesome5 size={32} name={"clock"} />;
const calcIcon = <FontAwesome5 size={32} name={"calculator"} />;
const decoIcon = <FontAwesome5 size={32} name={"chart-line"} />;
const aboutIcon = <FontAwesome5 size={32} name={"info"} />;

export default function ClockScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setClockTime] = useState(0);
  const [depth, setDepth] = useState<string | undefined>();
  const [diveTable, setDiveTable] = useState<number | undefined>();
  const [diveSchedule, setDiveSchedule] = useState<
    number | string | undefined
  >();
  const [RGD, setRGD] = useState<string | undefined>();
  const [diveLog, setDiveLog] = useState([]);
  const [leftSurface, setLeftSurface] = useState(new Date());
  const [onDescent, setOnDescent] = useState(false);
  const [onBottom, setOnBottom] = useState(false);
  const [leftBottom, setLeftBottom] = useState(new Date());
  const [onAscent, setOnAscent] = useState(false);
  const [reachedSurface, setReachedSurface] = useState(new Date()); //will be used to start :10 countdown for diver cleantime
  const [onO2, setOnO2] = useState(false);
  const [onO2StartTime, setOnO2StartTime] = useState<Date>(new Date());
  const [offO2Time, setOffO2Time] = useState<Date>(new Date());
  const [onHold, setOnHold] = useState<Boolean>(false);
  const [holdStart, setHoldStart] = useState<Date>(new Date());
  const [resumedDive, setResumedDive] = useState<Date>(new Date());

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

  //Sets types for the Log Entry Object. '?' indicates optional properties
  interface LogEntry {
    abbrev: string;
    eventTime: string;
    depth?: SetStateAction<string | undefined>; //can i make this number if I have to get userInput to obtain the depth?
    notes?: string | number | undefined;
  }

  //JSX Element, Creates a Row in the Logs Table, accepts an entry object (see interface LogEntry)
  const mapEntries = diveLog.map((logEntry: LogEntry) => {
    return (
      <DataTable.Row key={logEntry.eventTime}>
        <DataTable.Cell style={{ flex: 0.9 }}>{logEntry.abbrev}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>
          {logEntry.eventTime}
        </DataTable.Cell>
        <DataTable.Cell style={{ flex: 0.6 }}>{logEntry.depth}</DataTable.Cell>
        <DataTable.Cell style={{ flex: 2 }}>{logEntry.notes}</DataTable.Cell>
      </DataTable.Row>
    );
  });

  //Update dive log without losing previous entries. When no entries divelog is empty string "".
  const updateDiveLog = (entry: LogEntry) => {
    let entries: any = [...diveLog, entry];
    setDiveLog(entries || "");
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
          {/*==============First column of clock buttons=================*/}
          <View style={styles.buttonGroup1}>
            {/*LEFT SURFACE Button*/}
            <Button
              title="Left Surface"
              onPress={() => {
                setIsRunning(true);
                const LS = new Date();
                setLeftSurface(LS); //Cant assign Date to leftSurface state?
                setOnDescent(true);
                const stringLS = stringifyTime(LS);
                let newEntry: LogEntry = {
                  abbrev: "LS",
                  eventTime: stringLS,
                  depth: "0",
                  notes: "",
                };
                updateDiveLog(newEntry);
              }}
              size="lg"
              type="outline"
            />
            {/*REACHED BOTTOM Button*/}
            <Button
              title="Reached Bottom"
              onPress={() => {
                if (onDescent == true) {
                  const RB = new Date();
                  const descent = RB.getTime() - leftSurface.getTime();
                  const stringRB = stringifyTime(RB);
                  setOnDescent(false);
                  setOnBottom(true);
                  Alert.prompt("Reached Bottom", "Please Enter Depth:", [
                    //This will prompt the user to enter depth before adding an entry to the log
                    {
                      text: "Submit",
                      onPress: (inputDepth) => {
                        let newEntry: LogEntry = {
                          abbrev: "RB",
                          eventTime: stringRB,
                          depth: inputDepth,
                          notes: `:${roundUpTime(descent)} descent`,
                        };
                        updateDiveLog(newEntry);
                      },
                    },
                  ]);
                }
                if (onDescent == false) {
                  Alert.alert(
                    "Error",
                    "Divers must leave surface before reaching bottom."
                  );
                }
              }}
              size="lg"
              type="outline"
            />
            {/*LEFT BOTTOM Button*/}
            <Button
              title="Left Bottom"
              onPress={() => {
                if (onBottom == true) {
                  const LB = new Date();
                  setLeftBottom(LB);
                  setOnBottom(false);
                  setOnAscent(true);
                  const stringLB = stringifyTime(LB);
                  const bottomTime = LB.getTime() - leftSurface.getTime();
                  const roundedBT = roundUpTime(bottomTime);
                  Alert.prompt("Max Depth", "Please Enter Max Depth:", [
                    {
                      text: "Submit",
                      onPress: (inputMaxDepth) => {
                        setDepth(inputMaxDepth);
                        let newDepth = getUsableDepth(
                          stringToNumber(inputMaxDepth)
                        ); //convert the user input from string to number then find the nearest appropriate table depth from dive charts
                        let table = getChart(newDepth);
                        let calculatedSchedule = getSchedule(roundedBT, table); //determines which schedule to use in the table
                        const repetGroupDesig = getRGD(
                          table,
                          calculatedSchedule
                        ); //Repet Group Designator is a letter that indicates the amount of nitrogen saturation a diver has
                        let newEntry: LogEntry = {
                          abbrev: "LB",
                          eventTime: stringLB,
                          depth: inputMaxDepth,
                          notes: `:${roundedBT} BT, T/S: ${newDepth}/${calculatedSchedule} ${repetGroupDesig}`,
                        };
                        updateDiveLog(newEntry);
                      },
                    },
                  ]);
                }
                if (onBottom == false) {
                  Alert.alert(
                    "Error",
                    "Divers must be on bottom or on Hold before Leave Bottom can be pressed."
                  );
                }
              }}
              size="lg"
              type="outline"
            />
            {/*REACHED SURFACE Button*/}
            <Button
              title="Reached Surface"
              onPress={() => {
                if (onAscent == true) {
                  const RS = new Date();
                  setReachedSurface(RS);
                  const stringRS = stringifyTime(RS);
                  const ascentInMillisec = RS.getTime() - leftBottom.getTime(); //locally scoped var - state
                  const ascent = millisToMinutesAndSeconds(ascentInMillisec);
                  let newEntry: LogEntry = {
                    abbrev: "RS",
                    eventTime: stringRS,
                    depth: "0",
                    notes: `${ascent} ascent`,
                  };
                  updateDiveLog(newEntry);
                }
                if (onAscent == false) {
                  Alert.alert(
                    "Error",
                    "Divers must Leave Bottom before Reached Surface can be pressed."
                  );
                }
              }}
              size="lg"
              type="outline"
            />
          </View>

          {/*==============Second column of clock buttons=================*/}
          <View style={styles.buttonGroup2}>
            {/* O2 Button */}
            <Button
              color="success"
              title={onO2 ? "Off O2" : "On O2"}
              type={onO2 ? "solid" : "outline"}
              onPress={() => {
                {
                  /*====Go ON O2====*/
                }
                if (!onO2) {
                  setOnO2(true); //state change will change button appearance and title
                  const o2Start = new Date();
                  setOnO2StartTime(o2Start);
                  const stringO2Start = stringifyTime(o2Start);
                  Alert.prompt("On O2", "Please Enter Depth:", [
                    {
                      text: "Submit",
                      onPress: (inputDepth) => {
                        let newEntry: LogEntry = {
                          abbrev: "On O2",
                          eventTime: stringO2Start,
                          depth: inputDepth,
                          notes: "",
                        };
                        updateDiveLog(newEntry);
                      },
                    },
                  ]);
                }
                {
                  /*====Go OFF O2====*/
                }
                if (onO2) {
                  setOnO2(false); //change button color and label back to original
                  const o2End = new Date();
                  setOffO2Time(o2End);
                  const stringOffO2 = stringifyTime(o2End);
                  const onO2Duration =
                    o2End.getTime() - onO2StartTime.getTime(); //subtracts the end time from start time to get o2 breathing time (duration)
                  const stringO2Duration =
                    millisToMinutesAndSeconds(onO2Duration);
                  Alert.prompt("Off O2", "Please Enter Depth:", [
                    {
                      text: "Submit",
                      onPress: (inputDepth) => {
                        let newEntry: LogEntry = {
                          abbrev: "Off O2",
                          eventTime: stringOffO2,
                          depth: inputDepth,
                          notes: `${stringO2Duration} O2 Time`,
                        };
                        updateDiveLog(newEntry);
                      },
                    },
                  ]);
                }
              }}
            />
            {/* HOLD! Button */}
            {/* A hold is a stoppage of ascent or descent, usually due to inner ear squeeze. Holds must be documented with depth, reason, and duration*/}
            <Button
              color="warning"
              type={onHold ? "solid" : "outline"}
              title={onHold ? "Resume" : "HOLD!"}
              size="lg"
              onPress={() => {
                const hold = new Date();
                const stringHold = stringifyTime(hold);

                if (onHold == false) {
                  setOnHold(true);
                  setHoldStart(hold);
                  //REQUIRES 2 INPUTS, NESTED ALERT PROMPTS GET NEEDED INFO HERE
                  Alert.prompt("HOLD!", "Please Enter Depth:", [
                    {
                      text: "Submit",
                      onPress: (inputDepth) => {
                        Alert.prompt("HOLD!", "Reason For Hold: ", [
                          {
                            text: "Submit",
                            onPress: (inputReason) => {
                              let newEntry: LogEntry = {
                                abbrev: "Hold",
                                eventTime: stringHold,
                                depth: inputDepth, //Need to get depth and notes from the user, (what depth and why there was a hold)
                                notes: inputReason,
                              };
                              updateDiveLog(newEntry);
                            },
                          },
                        ]);
                      },
                    },
                  ]);
                }
                if (onHold == true) {
                  setOnHold(false); //change button color and label back to original
                  const holdEnd = new Date();
                  setResumedDive(holdEnd);
                  const stringHoldEnd = stringifyTime(holdEnd);
                  const onHoldDuration =
                    holdEnd.getTime() - holdStart.getTime(); //subtracts the end time from start time to get o2 breathing time (duration)
                  const stringHoldDuration =
                    millisToMinutesAndSeconds(onHoldDuration);
                  Alert.prompt("Resumed Dive", "Please Enter Depth:", [
                    {
                      text: "Submit",
                      onPress: (inputDepth) => {
                        let newEntry: LogEntry = {
                          abbrev: "Resumed",
                          eventTime: stringHoldEnd,
                          depth: inputDepth,
                          notes: `${stringHoldDuration} hold`,
                        };
                        updateDiveLog(newEntry);
                      },
                    },
                  ]);
                }
              }}
            />
            {/* STOP Button*/}
            <Button
              title="Stop"
              size="lg"
              type="solid"
              color="error"
              onPress={() => {
                setIsRunning(false);
                console.log("Clock Stopped");
              }}
            />
            {/*RESET Button*/}
            <Button
              title="Reset"
              size="lg"
              type="solid"
              color="secondary"
              onPress={() => {
                setClockTime(0);
                setDiveLog([]);
              }}
            />
          </View>
        </View>
        <View style={styles.logsContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 0.9 }}>Event</DataTable.Title>
              <DataTable.Title style={{ flex: 1 }}>Clock Time</DataTable.Title>
              <DataTable.Title style={{ flex: 0.7 }}>Depth</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}>Notes</DataTable.Title>
            </DataTable.Header>
            <ScrollView bounces={false} style={styles.scrollBox}>
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
    top: 626,
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
  depthInput: {
    borderWidth: 1,
    borderColor: "#777",
    backgroundColor: "yellow",
    height: 40,
    width: 40,
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
  o2ButtonActive: {
    title: "Off O2",
    size: "lg",
    type: "solid",
    color: "success",
  },
  o2ButtonInactive: {
    title: "On O2",
    size: "lg",
    type: "solid",
    color: "grey",
  },
  screenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollBox: {
    height: 215,
  },
});
