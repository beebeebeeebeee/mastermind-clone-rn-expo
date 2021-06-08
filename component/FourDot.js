import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import GlobalStyles from "../src/GlobalStyles";

export default ({ black, white }) => {
  const renderBalls = () => {
    const balls = [];
    for (let i = 0; i < 4; i++) {
      if (black > 0) {
        balls.push(<View style={[GlobalStyles.tag, GlobalStyles.black]} key={("row-ans_", i)} />)
        black--;
      } else if (white > 0) {
        balls.push(<View style={[GlobalStyles.tag, GlobalStyles.white]} key={("row-ans_", i)} />)
        white--;
      } else {
          balls.push(<View style={[GlobalStyles.tag, GlobalStyles.none]} key={("row-ans_", i)} />)
      }
    }
    return balls;
  };

  return <View style={styles.bar}>{renderBalls()}</View>;
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 40,
    width: 50,
    marginTop: 4,
    marginLeft: 15,
    justifyContent: "center",
  },
  answerText: {
    textAlign: "right",
    color: "#fff",
    fontSize: 28,
  },
});
