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
  SafeAreaView,
  ImageBackground,
} from "react-native";

const bgImage = "../assets";
export default function WelcomeScreen({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/welcomeBackground.jpg")}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <StatusBar />
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/logo1.png")}
            />
            <Text style={{ fontSize: 36 }}>Navy Dive Logger</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.loginButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Log In</Text>
            </Pressable>
            <Pressable
              style={styles.registerButton}
              onPress={() => console.log("Register Pressed")}
            >
              <Text>Register</Text>
            </Pressable>
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
                <Text style={styles.modalText}>Auth0 Here</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]} //change style name
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate("Dive Logs");
                  }}
                >
                  <Text style={styles.textStyle}>Login</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    padding: 0,
    margin: 0,
    height: "100%",
    width: "100%",
  },
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
    top: 430,
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
  loginButton: {
    flex: 1,
    margin: 10,
    height: 100,
    width: 300,
    borderRadius: 50,
    backgroundColor: "white",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 300,
    width: 300,
    opacity: 1,
  },
  logoContainer: {
    position: "absolute",
    top: 40,
    alignItems: "center",
    fontSize: 30,
    opacity: 1,
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
    margin: 10,
    height: 100,
    width: 300,
    borderRadius: 50,
    alignSelf: "stretch",
    backgroundColor: "turquoise",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
