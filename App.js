import { StatusBar } from "expo-status-bar";
import GlobalStyles from "./src/GlobalStyles";
import TopBar from "./component/TopBar";
import Row from "./component/Row";
import BottomBar from "./component/BottomBar";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Modal,
  Text,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const lengthRow = 16;
  const max = 5;
  const min = 0;
  let tempRow = [];
  let tempAns = [];

  const [score, setScore] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [row, setRow] = useState([]);

  useEffect(() => {
    async function getScore() {
      try {
        const value = await AsyncStorage.getItem('score')
        if(value !== null) {
          setScore(JSON.parse(value))
        }
      } catch(e) {
        console.log(e)
      }
    }

    if (row.length == 0) {
      getScore()

      for (let i = 0; i < lengthRow; i++) {
        tempRow.push([9, 9, 9, 9]);
      }
      setRow(tempRow);
    }

    if (answer.length == 0) {
      for (let i = 0; i < 4; i++) {
      tempAns.push(Math.round(Math.random() * (max - min) + min));
      }
      setAnswer(tempAns);
      console.log("ANS",tempAns)

    }
  });

  const addRow = () => {
    checkAns();
    if (currentRow < lengthRow - 1) {
      setCurrentRow(currentRow + 1);
      setCurrentIndex(0);
    } else {
      setIsEnd(true);
    }
  };

  const checkAns = async () => {
    let black = 0;
    let white = 0;
    let tempRow = [...row[currentRow]];
    let tempAns = [...answer];
    for (let i = 0; i < 4; i++) {
      if (tempRow[i] == tempAns[i] && tempRow[i]!=9) {
        black++;
        tempAns[i] = 9;
        tempRow[i] = 9;
      } 
    }
    for (let i = 0; i < 4; i++) {
     if (tempAns.includes(tempRow[i]) && tempRow[i]!=9) {
        tempAns[tempAns.indexOf(tempRow[i])] = 9
        tempRow[i] = 9
        white++;
      }
    }
    row[currentRow][4] = black;
    row[currentRow][5] = white;
    if (black == 4) {
      let sc = score+5
      setScore(sc)
      setIsWin(true);
      setIsEnd(true);
      try {
        console.log(sc)
        await AsyncStorage.setItem('score', JSON.stringify(sc))
      } catch (e) {
        console.log(e)
      }
    }
  };

  const clickColor = (colorIndex) => {
    row[currentRow][currentIndex] = colorIndex;
    if (currentIndex <= 3) {
      setCurrentIndex(currentIndex + 1);
    }
    console.log(row);
    setRow(row);
  };

  const selectBall = (row, index) => {
    if (row == currentRow) {
      setCurrentIndex(index);
    }
  };

  const resetGame = () => {
     tempRow = [];
     tempAns = [];

    for (let i = 0; i < lengthRow; i++) {
      tempRow.push([9, 9, 9, 9]);
    }
    setRow(tempRow);

    for (let i = 0; i < 4; i++) {
      tempAns.push(Math.round(Math.random() * (max - min) + min));
    }

    console.log("ANS",tempAns)
    setAnswer(tempAns);
    setCurrentRow(0)
    setCurrentIndex(0)
    setIsWin(false);
    setIsEnd(false)
  };

  return (
    <SafeAreaView style={[styles.container, GlobalStyles.droidSafeArea]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEnd}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{isWin?"You Win!":"You Lose!"}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                resetGame();
              }}
            >
              <Text style={styles.textStyle}>New Game</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TopBar score={score} answer={answer} isEnd={isEnd} />
      <FlatList
        inverted
        data={row}
        renderItem={(item) =>
          Row(item, addRow, currentRow, currentIndex, selectBall)
        }
        style={styles.flatList}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <BottomBar clickColor={clickColor} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#2fc2a4",
  },
  flatList: {
    backgroundColor: "#2fc2a4",
  },
  modalView: {
    marginTop: 280,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    opacity: 0.9,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    textAlign: "center",
  },
});
