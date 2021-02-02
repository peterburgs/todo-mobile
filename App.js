import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import color from "./src/common/color";

// Import Screens
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TodoScreen from "./src/screens/TodoScreen";
import CompletedScreen from "./src/screens/CompletedScreen";
import AccountScreen from "./src/screens/AccountScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import TaskDetailScreen from "./src/screens/TaskDetailScreen";

// Import Context
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/common/navigationRef";

// Import Icons
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Get Device Height & Width
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

// Todo Flow
const todoFlow = createStackNavigator({
  Todo: TodoScreen,
  TaskDetail: TaskDetailScreen,
});
todoFlow.navigationOptions = () => {
  return {
    title: "Todo",
    tabBarIcon: ({ tintColor }) => (
      <AntDesign name="book" size={26} color={tintColor} />
    ),
  };
};
// Completed Flow
const completedFlow = createStackNavigator({
  Completed: CompletedScreen,
  TaskDetail: TaskDetailScreen,
});
completedFlow.navigationOptions = () => {
  return {
    title: "Completed",
    tabBarIcon: ({ tintColor }) => (
      <AntDesign name="book" size={26} color={tintColor} />
    ),
  };
};

// Account Flow
const accountFlow = createStackNavigator({
  Account: AccountScreen,
});
accountFlow.navigationOptions = () => {
  return {
    title: "Account",
    tabBarIcon: ({ tintColor }) => (
      <AntDesign name="book" size={26} color={tintColor} />
    ),
  };
};

// Styles
const styles = StyleSheet.create({
  tabBarOptions: {
    borderTopColor: "transparent",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#222831",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: color.tabBarBackgroundColor,
    position: "absolute",
    bottom: 1,
    padding: 10,
    width: WIDTH,
    height: 54,
  },
});

// Switch Navigator
const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    authFlow: createStackNavigator(
      {
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
      },
      { initialRouteName: "SignIn" }
    ),
    mainFlow: createBottomTabNavigator(
      {
        todoFlow,
        completedFlow,
        accountFlow,
      },
      {
        tabBarOptions: {
          //activeBackgroundColor: "tomato",
          activeTintColor: color.activeTintColor,
          // inactiveBackgroundColor: "#eee",
          inactiveTintColor: color.inactiveTintColor,
          style: styles.tabBarOptions,
        },
        initialRouteName: "todoFlow",
      }
    ),
  },
  { initialRouteName: "ResolveAuth" }
);

// App
const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </NavigationContainer>
  );
};
