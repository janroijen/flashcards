import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from "react-native";
import { NewDeckRouterProps } from "../router";
import { saveDeckTitle } from "../storage";

export default function NewDeck({ navigation }: NewDeckRouterProps) {
  const [deckName, setDeckName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  const handleDeckNameChange = (text: string) => {
    setDeckName(text);
    setErrorMsg("")
    setSaveMsg("")
  };

  const handleSubmit = () => {
    setSaveMsg("");
    saveDeckTitle(deckName)
      .then(() => {
        setSaveMsg("Deck saved");
        setTimeout(() => navigation.navigate("Home"), 1000);
      })
      .catch((e) => setErrorMsg(e.toString()));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New deck name:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Deck name"
        onChangeText={handleDeckNameChange}
        value={deckName}
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
            {pressed ? "Created Deck" : "Create Deck"}
          </Text>
        )}
      </Pressable>
    </View>
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
