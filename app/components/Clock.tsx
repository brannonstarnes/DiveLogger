import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// import ClockButtons from "./ClockButtons";

//Credit: https://w3collective.com/react-stopwatch/
function Clock(props: any) {
  useEffect(() => {
    let interval: any;
    if (props.isRunning) {
      interval = setInterval(() => {
        //setInterval(func, milliseconds)
        props.setClockTime((previousTime: number) => previousTime + 10); //setTimeout(func, milliseconds)
      }, 10);
    } else if (!props.isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.isRunning]);

  return (
    <Text style={styles.clockNumbers}>
      {("0" + Math.floor((props.time / (60 * 60 * 1000)) % 60)).slice(-2)}:
      {("0" + Math.floor((props.time / (60 * 1000)) % 60)).slice(-2)}:
      {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
      {/* {("0" + Math.floor((time / 10) % 100)).slice(-2)} */} {/*Milisec*/}
    </Text>
  );
}

const styles = StyleSheet.create({
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
});

// Clock.propTypes = {
//   time: PropTypes.number,
//   makeDiveLogEntry: PropTypes.func,
//   diveLog: PropTypes.array,
//   setFormTSRGD: PropTypes.func,
//   setOnO2: PropTypes.func,
//   onO2: PropTypes.bool,
// };

export default Clock;
