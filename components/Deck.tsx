import React, { useState, useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { DeckRouterProps } from "../router";
import { getDeck } from "../storage";
import { IDeck } from "../storage/models";

export default function Deck({ route, navigation }: DeckRouterProps) {
  const [deck, setDeck] = useState<IDeck | undefined>(undefined);
  const { deckName } = route.params;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  useFocusEffect(() => {
    getDeck(deckName)
      .then((data) => setDeck(data))
      .catch(() => alert("Cards failed to load"));
  });

  if (!deck) {
    return <Text>Cards are loading</Text>;
  }

  const nquestions = deck.questions.length;
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim}]}>
      <Text style={styles.title}>{deckName}</Text>
      <Text style={styles.subtitle}>
        {nquestions} card{nquestions !== 1 && "s"}
      </Text>
      {nquestions > 0 && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: "lightblue" },
          ]}
          onPress={() => navigation.navigate("Quiz", { deckName })}
        >
          <Text style={styles.buttonText}>Quiz</Text>
        </Pressable>
      )}
      <Pressable
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && { backgroundColor: "lightblue" },
        ]}
        onPress={() => navigation.navigate("NewCard", { deckName })}
      >
        <Text style={styles.secondaryButtonText}>Add Card</Text>
      </Pressable>
      <View>
        {nquestions === 0 && <Text>Add cards before taking the quiz!</Text>}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    alignSelf: "center",
    marginBottom: 100,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  secondaryButton: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
  },
  secondaryButtonText: {
    color: "black",
    fontSize: 20,
    alignSelf: "center",
  },
});
