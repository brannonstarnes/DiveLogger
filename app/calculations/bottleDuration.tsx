import { Alert } from "react-native";

//fn takes depth and rmv from user, converts from string to num, returns consumption rate num (aka C)
export const getConsumptionRate = (depth: string, rmv: string) => {
  if (!depth) {
    return Alert.alert("Error", "Must provide valid depth.");
  } else {
    let numDepth: number = +depth;
    let numRMV: number = +rmv;
    const consumptionRate = ((numDepth + 33) / 33) * numRMV;
    return consumptionRate;
  }
};

export const getVolumeAvailable = (
  minPsi: string,
  startPsi: string,
  FV: number,
  N: number
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
    const volAvail = ((Pc - Pa) / 14.7) * FV * N;
    return volAvail;
  }
};

export const getDuration = (Va: number, C: number) => {
  return Va / C;
};
