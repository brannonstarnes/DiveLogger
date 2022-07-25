import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// import ClockButtons from "./ClockButtons";

//Credit: https://w3collective.com/react-stopwatch/
function Clock() {
  const [time, setClockTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        //setInterval(func, milliseconds)
        setClockTime((previousTime) => previousTime + 10); //setTimeout(func, milliseconds)
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <Text style={styles.clockNumbers}>
      {/*Hours*/}
      {("0" + Math.floor((time / 600000) % 60)).slice(-2)}:{/*Minutes*/}
      {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{/*Seconds*/}
      {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      {/* <Text className="clockTime" id="milliseconds">{("0" + Math.floor((time /10) % 100)).slice(-2)}</Text> */}
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
