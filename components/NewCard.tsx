import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from "react-native";
import { NewCardRouterProps } from "../router";
import { addCardToDeck } from "../storage";

export default function NewCard({ route, navigation }: NewCardRouterProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  const { deckName } = route.params;

  const handleSubmit = () => {
    setSaveMsg("");
    addCardToDeck(deckName, { question, answer })
      .then(() => {
        setSaveMsg("Card saved");
        setTimeout(() => navigation.navigate("Deck", { deckName }), 1000);
      })
      .catch((e) => setErrorMsg(e.toString()));
  };

  const handleQuestionChange = (text: string) => {
    setQuestion(text);
    setErrorMsg("");
    setSaveMsg("");
  };

  const handleAnswerChange = (text: string) => {
    setAnswer(text);
    setSaveMsg("");
  };

  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <Text style={styles.title}>{deckName}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Question"
        onChangeText={handleQuestionChange}
        value={question}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Answer"
        onChangeText={handleAnswerChange}
        value={answer}
      />
      <Text style={styles.errorMsg}>{errorMsg}</Text>
      <Text style={styles.saveMsg}>{saveMsg}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: "lightblue" },
        ]}
        onPress={handleSubmit}
      >
        {({ pressed }) => (
          <Text style={styles.buttonText}>
            {pressed ? "Saved Card" : "Save Card"}
          </Text>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 30,
  },
  textInput: {
    height: 50,
    padding: 10,
    marginVertical: 20,
    borderColor: "blue",
    borderWidth: 1,
  },
  button: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  errorMsg: {
    color: "red",
  },
  saveMsg: {
    color: "green",
  },
});
