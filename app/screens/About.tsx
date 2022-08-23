import React from "react";
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  LogBox,
} from "react-native";
import BottomNav from "../components/BottomNav";

export default function AboutScreen() {
  return (
    <SafeAreaView>
      <View style={styles.textContainer}>
        <Text style={styles.aboutText}>
          Simplifiying diving protocols, achieving fast and accurate
          calculations, and delivering clear, concise options to the diving
          supervisor when every second counts . CodeDiver is developed by a
          First Class Navy Diver and uses the most current edition of the US
          Navy Diving Manual as the backbone for every line of code. My hope is
          that my programs will contribute to safer dive planning, rapid and
          informed time-critical decision-making , and streamlined dive records
          reporting.
        </Text>

        <Text style={styles.signature}>- ND1 (DWS) Brannon Starnes, USN</Text>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  aboutText: {
    padding: 5,
    fontSize: 19,
    textAlign: "center",
  },
  logo: {
    resizeMode: "center",
    position: "absolute",
    top: 40,
    right: -190,
  },
  signature: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    padding: 5,
  },
  textContainer: {
    padding: 5,
    textAlign: "center",
    marginVertical: 30,
  },
});
