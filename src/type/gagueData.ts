import { QuizScore } from '../components/Game/QuizTypes';

export type GagueData = {
  theme: string;
  questionText: string;
  format: string;
  correctAnswer: number;
  minimumValue: number;
  maximumValue: number;
  preselectedValue: number;
  onQuizEnd: (scoreObject: QuizScore) => void;
};
