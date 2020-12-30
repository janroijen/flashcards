import React, { useState, useLayoutEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { DeckListRouterProps } from "../router";

import { getDecks } from "../storage";
import { IDeck, IDecks } from "../storage/models";

interface DeckSummaryProps extends IDeck {
  onSelection: (deckName: string) => void;
}

export interface DeckListProps {
  decks: IDecks;
}

export default function DeckList({ navigation }: DeckListRouterProps) {
  const [decks, setDecks] = useState<IDecks | undefined>(undefined);

  useFocusEffect(() => {
    getDecks()
      .then((data) => setDecks(data))
      .catch(() => alert("Failed to flash cards"));
  });

  if (!decks) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick a flashcard deck</Text>
      <ScrollView>
        {Object.values(decks).map((deck) => (
          <DeckSummary
            key={deck.title}
            {...deck}
            onSelection={(deckName) =>
              navigation.navigate("Deck", { deckName })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const DeckSummary = ({ title, questions, onSelection }: DeckSummaryProps) => {
  const nquestions = questions.length;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { backgroundColor: "lightblue" },
      ]}
      onPress={() => onSelection(title)}
    >
      <Text style={styles.buttonText}>{title}</Text>
      <Text style={styles.buttonSubtext}>
        {nquestions} card{nquestions !== 1 && "s"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    alignSelf: "center",
  },
  buttonSubtext: {
    color: "gray",
    fontSize: 12,
    alignSelf: "center",
  },
});
