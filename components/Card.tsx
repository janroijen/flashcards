import React, { useEffect, useState } from "react";
import { Pressable, Button, StyleSheet, Text, View } from "react-native";
import { IDeck } from "../storage/models";

interface CardProps {
  deck: IDeck;
  questionNumber: number;
  correctAnswers?: number;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

export default function Card({
  deck,
  questionNumber,
  correctAnswers = undefined,
  onCorrectAnswer,
  onIncorrectAnswer,
}: CardProps) {
  const [isFront, setIsFront] = useState(true);
  const { question, answer } = deck.questions[questionNumber - 1];
  const nquestions = deck.questions.length;

  useEffect(() => {
    setIsFront(true);
  }, [questionNumber]);

  const handleFlipCard = () => setIsFront(false);

  return (
    <View style={styles.container}>
      {isFront ? (
        <View>
          <Text style={styles.text}>{question}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { backgroundColor: "lightblue" },
            ]}
            onPress={handleFlipCard}
          >
            <Text style={styles.buttonText}>Show Answer</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>{answer}</Text>
          <Pressable
            style={({ pressed }) => [
              styles.button, { backgroundColor: "rgba(0,255,0, 1)" },
              pressed && { backgroundColor: "rgba(0,255,0, 0.5)" },
            ]}
            onPress={onCorrectAnswer}
          >
            <Text style={styles.buttonText}>Correct</Text>
            <Text style={styles.buttonText}>&#10004;</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button, { backgroundColor: "rgba(255,0,0, 1)" },
              pressed && { backgroundColor: "rgba(255,0,0, 0.5)" },
            ]}
            onPress={onIncorrectAnswer}
          >
            <Text style={styles.buttonText}>Incorrect</Text>
            <Text style={styles.buttonText}>&#10006;</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.questionNumber}>
        {typeof correctAnswers === "number" && (
          <Text>Correct: {correctAnswers}</Text>
        )}
        <Text>
          {questionNumber} / {nquestions}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    minWidth: "80%",
    alignSelf: "center"
  },
  text: {
    fontSize: 25,
    alignSelf: "center",
    marginVertical: 50,
  },
  button: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "blue"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  questionNumber: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
});
