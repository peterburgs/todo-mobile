import { AsyncStorage, Alert } from "react-native";
import createDataContext from "./createDataContext";
import { navigate } from "../common/navigationRef";
import TodoApi from "../api/todoApi";

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "signIn":
      return { ...state, token: action.payload.token };
    case "signOut":
      return { token: null };
    default:
      return state;
  }
};

// Try Local SignIn
const tryLocalSignIn = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const expirationDate = new Date(
        await AsyncStorage.getItem("expirationDate")
      );
      if (new Date().getTime() > new Date(expirationDate).getTime()) {
        dispatch({ type: "signOut" });
        navigate("authFlow");
      } else {
        dispatch({ type: "signIn", payload: token });
        navigate("mainFlow");
        setTimeout(() => {
          Alert.alert(
            "Session Timeout",
            "Please Sign In to continue...",
            [
              {
                text: "OK",
                onPress: () => {
                  dispatch({ type: "signOut" });
                  navigate("authFlow");
                },
              },
            ],
            { cancelable: false }
          );
        }, expirationDate.getTime() - new Date().getTime());
      }
    } else {
      navigate("authFlow");
    }
  } catch (error) {
    console.log(error);
  }
};

// SignUp
const signUp = (dispatch) => async ({ email, password }) => {
  try {
    const response = await TodoApi.post("/signup", {
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    navigate("Todo");
  } catch (error) {
    console.log("*LOG at AuthContext: ", error.message);
  }
};

// SignIn
const signIn = (dispatch) => async ({ email, password }) => {
  try {
    const response = await TodoApi.post("/signin", {
      email,
      password,
    });
    console.log(response.data.token);
    await AsyncStorage.setItem("token", response.data.token);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 3600000
    );
    await AsyncStorage.setItem(
      "expirationDate",
      expirationDate.toISOString()
    );
    dispatch({ type: "signIn", payload: response.data });
    console.log("signed in");
    navigate("mainFlow");
    setTimeout(() => {
      Alert.alert(
        "Session Timeout",
        "Please Sign In to continue...",
        [
          {
            text: "OK",
            onPress: () => {
              dispatch({ type: "signOut" });
              navigate("loginFlow");
            },
          },
        ],
        { cancelable: false }
      );
    }, response.data.expiresIn * 3600000);
  } catch (error) {
    console.log("*LOG at AuthContext: ", error);
  }
};

// Sign Out
const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signOut" });
  navigate("authFlow");
};

// Export
export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signIn,
    signOut,
    signUp,
    tryLocalSignIn,
  },
  {
    token: null,
  }
);
