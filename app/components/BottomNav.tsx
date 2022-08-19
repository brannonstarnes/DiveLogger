import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BottomNav() {
  const navigation = useNavigation();

  const logsIcon = (
    <Pressable onPress={() => navigation.navigate("Dive Logs")}>
      <FontAwesome5 style={styles.icon} size={32} name={"clock"} />
    </Pressable>
  );
  const calcIcon = (
    <Pressable onPress={() => navigation.navigate("Bottle Duration")}>
      <FontAwesome5 style={styles.icon} size={32} name={"calculator"} />
    </Pressable>
  );
  const decoIcon = (
    <FontAwesome5 style={styles.icon} size={32} name={"chart-line"} />
  );

  const aboutIcon = (
    <Pressable onPress={() => navigation.navigate("About")}>
      <FontAwesome5 style={styles.icon} size={32} name={"info"} />
    </Pressable>
  );

  return (
    <View style={styles.BottomNavContainer}>
      <Text>{logsIcon}</Text>
      <Text>{calcIcon}</Text>
      <Text>{decoIcon}</Text>
      <Text>{aboutIcon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  BottomNavContainer: {
    paddingTop: 14,
    flexDirection: "row",
    position: "absolute",
    top: 620,
    backgroundColor: "blue",
    width: "100%",
    justifyContent: "space-around",
    height: 52,
  },
  icon: {
    paddingHorizontal: 7,
  },
});
