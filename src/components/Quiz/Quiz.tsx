import { useState, useEffect } from "react";
import quizData from "./Quiz.json"; // Import the quiz JSON
import "./Quiz.css"; // Import the CSS for styling

interface Question {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
}

interface Theme {
  theme: string;
  questions: Question[];
}

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const theme: Theme = quizData.themes[0]; // Select the first theme or allow user to pick

  useEffect(() => {
    // Shuffle and pick the first 3 questions
    const shuffledQuestions = shuffleArray([...theme.questions]).slice(0, 3);
    setQuestions(shuffledQuestions);
  }, [theme]);

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // If questions aren't ready yet (during shuffle), return null
  if (questions.length === 0) {
    return null;
  }

  const question = questions[currentQuestionIndex]; // Get current question

  return (
    <div className="quiz-container">
      <h2>{theme.theme}</h2>
      <p>{question.question}</p>
      <div className="options-container">
        {Object.entries(question.options).map(([key, value]) => (
          <div key={key} className="option">
            {value}
          </div>
        ))}
      </div>
      <button onClick={handleNextQuestion} className="next-button">
        Next Question
      </button>
    </div>
  );
}

export default Quiz;
