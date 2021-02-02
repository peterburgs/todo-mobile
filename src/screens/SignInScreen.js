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

const SignInScreen = () => {
  const { state, signIn } = useContext(Context);

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
        headerText="Sign In to Your Account"
        onSubmit={signIn}
        submitButtonText="Sign In"
        style={{ zIndex: 1 }}
      />

      <NavLink
        routeName="SignUp"
        text="Your first exprerient in ToDo? Sign up now!"
        style={{ zIndex: 1 }}
      />
    </SafeAreaView>
  );
};

SignInScreen.navigationOptions = {
  header: () => false,
};

export default SignInScreen;

const styles = StyleSheet.create({
  appName: {
    fontSize: 50,
    alignSelf: "center",
    marginTop: 50,
    fontWeight: "bold",
    color: "blue",
  },
});
