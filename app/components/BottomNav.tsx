import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as MailComposer from "expo-mail-composer";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface DiveLogProps {
  //must be used to tell what to expect from props
  diveLog: object;
}

export default function BottomNav(props: any) {
  const navigation = useNavigation();

  //***************EMAIL ICON FUNCTIONALITY*************************** */
  const [emailStatus, setEmailStatus] = useState<string>();

  const showEmailAlert = () => {
    Alert.alert(
      "Email Dive Logs",
      "Would you like to email the current dive logs?",
      [
        {
          text: "No",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const messageBody = Object.values(props.diveLog);
            if (messageBody.length === 0) {
              return Alert.alert(
                "Error",
                "No dive logs found. Nothing to send."
              );
            }
            sendLogs(messageBody);
          },
        },
      ]
    );
  };

  const sendLogs = async (logData: any) => {
    var options = {};
    options = {
      subject: "Dive Logs Sent Via Dive Logger App",
      recipients: [], //USER EMAIL GOES HERE
      body: JSON.stringify(logData),
    };

    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
    promise.then(
      (result) => {
        setEmailStatus("Status: email " + result.status);
        console.log("Got result");
      },
      (error) => {
        setEmailStatus("Status: email " + error.status);
        console.log("Got error", error.status);
      }
    );
  };

  //***********************ICONS ************************** */
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

  const emailIcon = (
    <Pressable onPress={showEmailAlert}>
      <FontAwesome5 style={styles.icon} size={32} name={"envelope-open-text"} />
    </Pressable>
  );
  return (
    <View style={styles.BottomNavContainer}>
      <Text>{logsIcon}</Text>
      <Text>{calcIcon}</Text>
      <Text>{decoIcon}</Text>
      <Text>{aboutIcon}</Text>
      <Text>{emailIcon}</Text>
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
