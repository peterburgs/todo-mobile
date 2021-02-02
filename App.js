import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";

// Import Screens
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TodoScreen from "./src/screens/TodoScreen";
import CompletedScreen from "./src/screens/CompletedScreen";
import AccountScreen from "./src/screens/AccountScreen";

// Get Device Height & Width
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// AuthFlow
// const authFlow = createSwitchNavigator({});

export default function App() {
  return (
    <View style={styles.container}>
      <CompletedScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
