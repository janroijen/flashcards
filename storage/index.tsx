import AsyncStorage from "@react-native-community/async-storage";
import { IDeck, IDecks } from "./models";
import { testQuestions } from "../test-data/question-data";

const DBName = "questions";

export async function initialLoad(): Promise<void> {
  //   await AsyncStorage.removeItem("questions");

  const questions = await AsyncStorage.getItem(DBName);

  if (!questions) {
    await AsyncStorage.setItem("questions", JSON.stringify(testQuestions));
  }
}

export async function getDecks(): Promise<IDecks | undefined> {
  await initialLoad();

  const questions = await AsyncStorage.getItem(DBName);

  if (questions) {
    return JSON.parse(questions) as IDecks;
  }

  return undefined;
}

export async function getDeck(deckName: string): Promise<IDeck | undefined> {
  const deckString = await AsyncStorage.getItem(DBName);

  if (deckString) {
    const deck = JSON.parse(deckString);
    return deck[deckName] as IDeck;
  }

  return undefined;
}

export async function addCardToDeck(
  deckName: string,
  question: { question: string; answer: string }
) {
  if (question.question.length === 0) {
    throw new Error("question is missing");
  }
  if (question.answer.length === 0) {
    throw new Error("answer is missing");
  }

  const questionsString = await AsyncStorage.getItem(DBName);
  if (!questionsString) {
    throw new Error("cards database does not exist");
  }

  const decks = JSON.parse(questionsString) as IDecks;
  const questions = decks[deckName]?.questions;

  if (!questions) {
    throw new Error("cards deck does not exist");
  }

  if (questions.filter((q) => q.question === question.question).length > 0) {
    throw new Error("question already exists");
  }

  questions.push(question);

  AsyncStorage.setItem(DBName, JSON.stringify(decks));
}

export async function saveDeckTitle(deckName: string) {
  if (deckName.length === 0) {
    throw new Error("deckname must be at least one character");
  }

  const questionsString = await AsyncStorage.getItem(DBName);
  if (!questionsString) {
    throw new Error("cards database does not exist");
  }

  const decks = JSON.parse(questionsString) as IDecks;
  if (decks[deckName]) {
    throw new Error("this deck already exists");
  }

  decks[deckName] = { title: deckName, questions: [] };

  AsyncStorage.setItem(DBName, JSON.stringify(decks));
}
