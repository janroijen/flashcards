import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "./router";
import { DeckListRouterProps } from "./router";

import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import NewCard from "./components/NewCard";
import NewDeck from "./components/NewDeck";
import { setLocalNotification } from "./notifications";

export default function App() {
  useEffect(() => setLocalNotification(), []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={DeckList}
          options={({ navigation }: DeckListRouterProps) => ({
            headerRight: () => (
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  pressed && { backgroundColor: "lightblue" },
                ]}
                onPress={() => navigation.navigate("NewDeck")}
              >
                <Text style={styles.buttonText}>Add Deck</Text>
              </Pressable>
            ),
          })}
        ></Stack.Screen>
        <Stack.Screen name="Deck" component={Deck} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen
          name="NewCard"
          component={NewCard}
          options={{ title: "Add Card" }}
        />
        <Stack.Screen
          name="NewDeck"
          component={NewDeck}
          options={{ title: "Add Deck" }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  buttonText: {
    color: "blue",
    fontSize: 20,
    alignSelf: "center",
  },
});
