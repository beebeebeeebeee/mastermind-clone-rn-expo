import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../src/GlobalStyles";

export default ({ answer = [] }) => {
  const renderBalls = (answer) => {
    const balls = [];
    for (let i = 0; i < 4; i++) {
      balls.push(
        <View style={[GlobalStyles.ball, GlobalStyles[answer[i]]]} key={("ball_", i)} />
      );
    }
    return balls;
  };

  return <View style={styles.bar}>{renderBalls(answer)}</View>;
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    height: 40,
    marginTop: -10,
    justifyContent: "flex-end",
  },
  answerText: {
    textAlign: "right",
    color: "#fff",
    fontSize: 28,
  },
});
