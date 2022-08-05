import { Key } from "react";
import { Alert } from "react-native";

import { chartMap } from "./charts";

//This is a simple way to change from string to number
export function stringToNumber(str: string | undefined) {
  if (str == undefined) {
    return 0;
  }
  var numDepth: number = +str;
  return numDepth;
}

// Takes the diver's depth and compares it against a test depth, if test depth is greater, test depth will be incremented by either 5 (until depth of 60 is reached) or 10 (from 60-190). Whatever the test depth is wheneven it becomes greater than user depth is the newDepth which will be used to determine the correct dive table.
export function getUsableDepth(userDepth: number) {
  let testDepth = 10;
  let newDepth = 1;
  while (userDepth < 60 && userDepth > testDepth) {
    testDepth = testDepth + 5;
  }
  while (userDepth >= 60 && userDepth > testDepth) {
    testDepth = testDepth + 10;
  }
  if (testDepth > 190) {
    Alert.alert("Depth Shall Not Exceed 190fsw!");
  } else {
    newDepth = testDepth;
  }
  console.log("getUsableDepth newDepth: ", newDepth);
  return newDepth;
}

export function getChart(newDepth: number) {
  var chart = chartMap.get(newDepth);
  return chart;
}

export function getSchedule(userBT: number | string, chart: object) {
  var newBT = 0;
  for (const key in chart) {
    if (Number(userBT) > Number(key)) {
      continue;
    } else {
      let newBT = key;
      return newBT;
    }
  }
}

// var newDepth = getUsableDepth(userDepth) //get corrected depth
// var table = getChart() //gets chart by using corrected depth
// var schedule = getSchedule(userBT, newDepth) //determines which schedule to use in chart

// // Repet Group Designator
export function getRGD(table: object, schedule: string | number | undefined) {
  if (schedule == undefined) {
    return 0;
  }
  const RGD = table[schedule as keyof object];
  return RGD;
}
