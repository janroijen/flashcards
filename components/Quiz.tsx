import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Card from "./Card";
import QuizResults from "./QuizResults";
import { QuizRouterProps } from "../router";
import { getDeck } from "../storage";
import { IDeck } from "../storage/models";

export default function Quiz({ route, navigation }: QuizRouterProps) {
  const [questionNr, setQuestionNr] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [deck, setDeck] = useState<IDeck | undefined>(undefined);

  const { deckName } = route.params;

  useFocusEffect(() => {
    getDeck(deckName)
      .then((data) => setDeck(data))
      .catch(() => alert("Cards failed to load"));
  });

  if (!deck) {
    return <Text>Cards are loading</Text>;
  }

  const nquestions = deck.questions.length;

  const handleCorrectAnswer = () => {
    setCorrect(correct + 1);
    setQuestionNr(questionNr + 1);
  };

  const handleIncorrectAnswer = () => {
    setQuestionNr(questionNr + 1);
  };

  const handleRestart = () => {
    setQuestionNr(1);
    setCorrect(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      {questionNr <= nquestions ? (
        <Card
          deck={deck}
          questionNumber={questionNr}
          onCorrectAnswer={handleCorrectAnswer}
          onIncorrectAnswer={handleIncorrectAnswer}
          correctAnswers={correct}
        />
      ) : (
        <QuizResults
          correct={correct}
          incorrect={nquestions - correct}
          onRestartQuiz={handleRestart}
          onBackToDeck={() => navigation.navigate("Home")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    margin: 20
  },
  title: {
    fontSize: 30
  }
});
