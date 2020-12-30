import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuizResultsProps {
  correct: number;
  incorrect: number;
  onRestartQuiz: () => void;
  onBackToDeck: () => void;
}

export default function QuizResults({
  correct,
  incorrect,
  onRestartQuiz,
  onBackToDeck,
}: QuizResultsProps) {
  const total = correct + incorrect;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <View>
      <Ionicons
        style={styles.icon}
        name={Platform.OS === "ios" ? "ios-trophy" : "md-trophy"}
        size={40}
      />
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ResultRow title="Correct" nr={correct} total={total} />
        <ResultRow title="Incorrect" nr={incorrect} total={total} />
        <ResultRow title="Total" nr={total} total={total} />
      </Animated.View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: "lightblue" },
        ]}
        onPress={onRestartQuiz}
      >
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: "lightblue" },
        ]}
        onPress={onBackToDeck}
      >
        <Text style={styles.buttonText}>Back to Deck</Text>
      </Pressable>
    </View>
  );
}

function ResultRow({
  title,
  nr,
  total,
}: {
  title: string;
  nr: number;
  total: number;
}) {
  return (
    <View style={styles.row}>
      <Animated.Text style={styles.column1}>{title}:</Animated.Text>
      <Text style={styles.column2}>{nr}</Text>
      <Text style={styles.column3}>({Math.round((100 * nr) / total)}%)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,

    height: 150,
    backgroundColor: "white",
    padding: 10,
  },
  icon: {
    color: "red",
    alignSelf: "flex-end",
    marginBottom: 20,
    marginRight: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  column1: {
    width: 100,
    fontSize: 20,
  },
  column2: {
    width: 50,
    fontSize: 20,
  },
  column3: {
    width: 50,
    fontSize: 15,
    color: "gray",
  },
  navButtons: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
