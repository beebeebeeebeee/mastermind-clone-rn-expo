import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import ConvertBall from "./ConvertBall";

export default ({ score, answer, isEnd }) => {
  const showBall = isEnd ? [...answer] : [9, 9, 9, 9];
  return (
    <View style={styles.bar}>
      <View style={styles.score}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <View style={styles.answer}>
        <ConvertBall answer={showBall} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    height: 60,
    padding: 15,
    backgroundColor: "#2fc2a4",
  },
  score: {
    flex: 0.3,
  },
  answer: {
    flex: 0.7,
  },
  scoreText: {
    color: "#fff",
    fontSize: 28,
  },
  answerText: {
    textAlign: "right",
    color: "#fff",
    fontSize: 28,
  },
  none: {
    height: 60,
    fontSize: 24,
    backgroundColor: "#000",
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 5,
  },
});
 