import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  Alert,
} from "react-native";

export default function WelcomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={{ fontSize: 36 }}>Navy Dive Logs</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.loginButton}>
          <Button
            title="Log In"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
        <View style={styles.registerButton}>
          <Button
            title="Register"
            onPress={() => console.log("Register Pressed")}
          />
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Login Here</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonsContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 300,
    width: 300,
  },
  logoContainer: {
    position: "absolute",
    top: "20%",
    alignItems: "center",
    fontSize: 30,
  },
  loginButton: {
    flex: 1,
    height: 100,
    width: 600,
    backgroundColor: "blue",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  registerButton: {
    height: 100,
    alignSelf: "stretch",
    backgroundColor: "purple",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
