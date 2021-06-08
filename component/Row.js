import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import GlobalStyles from "../src/GlobalStyles";
import FourDot from "./FourDot";

export default (
  { item, index },
  addRow,
  currentRow,
  currentIndex,
  selectBall
) => {
  const renderBalls = () => {
    const balls = [];
    for (let i = 0; i < 4; i++) {
      balls.push(
        <TouchableWithoutFeedback
          onPress={() => {
            selectBall(index, i);
          }}
          key={("touch_select_", index, i)}
        >
          <View
            style={[
              GlobalStyles.ball,
              GlobalStyles[item[i]],
              styles.ball,
              index == currentRow && currentIndex == i
                ? GlobalStyles.selected
                : "",
            ]}
            key={(index, "_", i)}
          />
        </TouchableWithoutFeedback>
      );
    }
    return balls;
  };

  const marker = () => {
    if (!item.includes(9)) {
      if (item.length > 4) {
        return <FourDot black={item[4]} white={item[5]} />;
      }
      return (
        <Button
          title={"Done!"}
          onPress={() => {
            addRow();
          }}
          style={{}}
        ></Button>
      );
    }
    return <FourDot black={0} white={0} />;
  };

  return (
    <View style={styles.bar}>
      <View style={styles.index}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <View style={styles.marker}>{marker()}</View>
      {renderBalls()}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 60,
    padding: 5,
    backgroundColor: "#1e947a",
  },
  index: { flex: 0.5 },
  marker: { flex: 1 },
  indexText: { padding: 8, fontSize: 32, justifyContent: "center" },
  ball: {
    marginHorizontal: 10,
  },
});
