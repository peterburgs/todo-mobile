import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 13,
    alignSelf: "center",
    color: "#0f3460",
    marginTop: 20,
  },
});

export default withNavigation(NavLink);
