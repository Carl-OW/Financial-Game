// QuizTypes.ts
export interface QuizScore {
  "Quiz Score": number;
}

export interface Question {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correct_answer: string;
}

export interface Theme {
  theme: string;
  questions: Question[];
}

export interface QuestionWithTheme extends Question {
  theme: string;
}

export interface QuizProps {
  onQuizEnd: (scoreObject: QuizScore) => void;
}
