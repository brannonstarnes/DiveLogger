import * as React from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ClockScreen from "./app/screens/ClockScreen";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <ClockScreen />
    </PaperProvider>
  );
}
