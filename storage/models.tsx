export interface IDeck {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export interface IDecks {
    [name: string]: IDeck
}