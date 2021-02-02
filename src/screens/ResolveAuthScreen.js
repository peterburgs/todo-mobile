LogBox.ignoreAllLogs();

import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { LogBox } from "react-native";
const ResolveAuthScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn();
  }, []);
  return null;
};

export default ResolveAuthScreen;
