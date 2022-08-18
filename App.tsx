import * as React from "react";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ClockScreen from "./app/screens/ClockScreen";
import BottleCalculatorScreen from "./app/screens/BottleCalculatorScreen";

import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "./app/screens/About";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="Dive Logs"
            component={ClockScreen}
            options={{ title: "Dive Logs" }}
          />
          <Stack.Screen
            name="Bottle Duration"
            component={BottleCalculatorScreen}
            options={{ title: "Bottle Duration" }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ title: "About" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
