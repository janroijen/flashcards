import {
  StackScreenProps,
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type StackParamList = {
  Home: undefined;
  Deck: { deckName: string };
  Quiz: { deckName: string };
  NewCard: { deckName: string };
  NewDeck: undefined;
};

export const Stack = createStackNavigator<StackParamList>();

export type DeckListStackProp = StackNavigationProp<StackParamList, "Home">;
export type DeckListRouteProp = RouteProp<StackParamList, "Home">;
export type DeckListRouterProps = StackScreenProps<StackParamList, "Home">;

export type DeckStackProp = StackNavigationProp<StackParamList, "Deck">;
export type DeckRouteProp = RouteProp<StackParamList, "Deck">;
export type DeckRouterProps = StackScreenProps<StackParamList, "Deck">;

export type QuizStackProp = StackNavigationProp<StackParamList, "Quiz">;
export type QuizRouteProp = RouteProp<StackParamList, "Quiz">;
export type QuizRouterProps = StackScreenProps<StackParamList, "Quiz">;

export type NewCardStackProp = StackNavigationProp<StackParamList, "NewCard">;
export type NewCardRouteProp = RouteProp<StackParamList, "NewCard">;
export type NewCardRouterProps = StackScreenProps<StackParamList, "NewCard">;

export type NewDeckStackProp = StackNavigationProp<StackParamList, "NewDeck">;
export type NewDeckRouteProp = RouteProp<StackParamList, "NewDeck">;
export type NewDeckRouterProps = StackScreenProps<StackParamList, "NewDeck">;
