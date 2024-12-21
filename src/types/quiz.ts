export type Question = {
  question: string;
  choices: string[];
  type: string;
  correctAnswer: string;
};

export type QuizData = {
  topic: string;
  level: string;
  totalQuestions: number;
  perQuestionScore: number;
  questions: Question[];
};
