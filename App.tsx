import * as React from "react";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import ClockScreen from "./app/screens/ClockScreen";

import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          <Stack.Screen name="Clock" component={ClockScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
