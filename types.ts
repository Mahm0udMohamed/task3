
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export enum GameState {
  CategorySelection,
  Loading,
  Quiz,
  Results,
}
