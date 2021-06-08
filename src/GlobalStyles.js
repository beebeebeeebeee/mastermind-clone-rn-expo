import { StyleSheet, Platform } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  0: {
    backgroundColor: "#f0f0f0",
  },
  1: {
    backgroundColor: "#c24cba",
  },
  2: {
    backgroundColor: "#e3fa50",
  },
  3: {
    backgroundColor: "#19ff9c",
  },
  4: {
    backgroundColor: "#ff0352",
  },
  5: {
    backgroundColor: "#443dd9",
  },
  9: {
    backgroundColor: "#20ab8c",
  },
  none: {
    backgroundColor: "#20ab8c",
  },
  black: {
    backgroundColor: "#000",
  },
  white: {
    backgroundColor: "#f0f0f0",
  },
  ball: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    margin: 5,
  },
  selected: {
    borderWidth: 2,
    borderColor: "#293633"
  },
  tag: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    margin: 5,
  },
});
