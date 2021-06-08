import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import GlobalStyles from "../src/GlobalStyles";

export default ({ clickColor }) => {
  const renderBalls = () => {
    const balls = [];
    for (let i = 0; i < 6; i++) {
      balls.push(
        <TouchableWithoutFeedback
          onPress={() => {
            clickColor(i);
          }}
          key={("touch_ans_", i)}
        >
          <View
            style={[GlobalStyles.ball, GlobalStyles[i], styles.ball]}
            key={("ans_", i)}
          />
        </TouchableWithoutFeedback>
      );
    }
    return balls;
  };

  return <View style={styles.bar}>{renderBalls()}</View>;
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    height: 70,
    padding: 5,
    backgroundColor: "#2fc2a4",
  },
  ball: {
    marginHorizontal: 10,
  },
});
