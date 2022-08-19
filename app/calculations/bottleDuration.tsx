import { Alert } from "react-native";

//fn takes depth and rmv from user, converts from string to num, returns consumption rate num (aka C)
export const getConsumptionRate = (depth: any, rmv: any) => {
  if (depth == undefined) {
    return Alert.alert("Error", "Must provide valid depth.");
  } else {
    let numDepth: number = +depth;
    let numRMV: number = +rmv;
    const consumptionRate: number = ((numDepth + 33) / 33) * numRMV;
    return consumptionRate;
  }
};

export const getVolumeAvailable = (
  minPsi: any,
  startPsi: any,
  FV: any,
  N: any
) => {
  if (!minPsi) {
    return Alert.alert("Error", "Must provide abort pressure.");
  }
  if (!startPsi) {
    return Alert.alert("Error", "Must provide starting pressure.");
  }
  if (!FV) {
    return Alert.alert("Error", "Must select bottle size and material.");
  }
  if (!N) {
    return Alert.alert(
      "Error",
      "Please select if using single or double SCUBA bottles."
    );
  } else {
    let Pc: number = +startPsi;
    let Pa: number = +minPsi;
    const volAvail: number = ((Pc - Pa) / 14.7) * FV * N;
    return volAvail;
  }
};

export const getDuration = (Va: number, C: number) => {
  return Va / C;
};
