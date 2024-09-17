import { useState } from "react";
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
  correct_answer: string;
}

interface Theme {
  theme: string;
  questions: Question[];
}

function Quiz() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const theme: Theme = quizData.themes[0]; // Select the first theme or allow user to pick
  const question: Question = theme.questions[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    if (selectedOption) return; // Prevent further clicks after selection

    setSelectedOption(option);

    // Check if the selected answer is correct
    if (option === question.correct_answer) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }

    // Remove feedback after 2 seconds and move to next question
    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
      if (currentQuestionIndex < theme.questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }, 2000); // 2 seconds feedback duration
  };

  return (
    <div className="quiz-container">
      <h2>{theme.theme}</h2>
      <p>{question.question}</p>
      <div className="options-container">
        {Object.entries(question.options).map(([key, value]) => (
          <div
            key={key}
            className={`option ${selectedOption === key ? feedback : ""}`}
            onClick={() => handleOptionClick(key)}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
