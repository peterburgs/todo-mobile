import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import React, { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { Context } from "../context/AuthContext";
import NavLink from "../components/NavLink";
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SignUpScreen = () => {
  const { state, signUp } = useContext(Context);

  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={styles.container}
    >
      <Text
        style={styles.appName}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        TODO
      </Text>
      <AuthForm
        onSubmit={signUp}
        submitButtonText="Sign Up"
        style={{ zIndex: 1 }}
      />

      <NavLink
        routeName="SignIn"
        text="Already had account? Sign In now!"
        style={{ zIndex: 1 }}
      />
    </SafeAreaView>
  );
};

SignUpScreen.navigationOptions = {
  header: () => false,
};

export default SignUpScreen;

const styles = StyleSheet.create({
  appName: {
    fontSize: 50,
    alignSelf: "center",
    marginTop: 50,
    fontWeight: "bold",
    color: "blue",
  },
});
