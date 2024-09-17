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
  correct_answer: string;
}

interface Theme {
  theme: string;
  questions: Question[];
}

interface QuestionWithTheme extends Question {
  theme: string; // To store the theme along with the question
}

function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomQuestionFromEachTheme(themes: Theme[]): QuestionWithTheme[] {
  return themes.map((theme) => {
    if (theme.questions.length === 1) {
      // If the theme has only one question, pick that one and include the theme
      return { ...theme.questions[0], theme: theme.theme };
    } else {
      // Otherwise, pick a random question from the theme and include the theme
      const randomIndex = Math.floor(Math.random() * theme.questions.length);
      return { ...theme.questions[randomIndex], theme: theme.theme };
    }
  });
}

function Quiz() {
  const [questions, setQuestions] = useState<QuestionWithTheme[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackClass, setFeedbackClass] = useState<string | null>(null); // Class for feedback (correct/incorrect)
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [roundCount, setRoundCount] = useState(0); // Track the round count
  const [randomizedOptions, setRandomizedOptions] = useState<
    [string, string][]
  >([]); // Store randomized options

  useEffect(() => {
    // Shuffle the themes and select one question per theme
    const shuffledThemes = shuffleArray(quizData.themes);
    const selectedQuestions = getRandomQuestionFromEachTheme(shuffledThemes);
    setQuestions(selectedQuestions);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      // Randomize the order of the options for the current question
      const question = questions[currentQuestionIndex];
      const shuffledOptions = shuffleArray(Object.entries(question.options));
      setRandomizedOptions(shuffledOptions);
    }
  }, [currentQuestionIndex, questions]);

  const handleOptionClick = (key: string) => {
    if (!questions.length || selectedOption) return; // Prevent further clicks after selection

    const question = questions[currentQuestionIndex];
    setSelectedOption(key); // Set the selected option

    // Check if the selected answer is correct
    const isCorrect = key === question.correct_answer;

    // Set feedback class based on whether the answer is correct or incorrect
    setFeedbackClass(isCorrect ? "correct" : "incorrect");

    // Update score if the selected answer is correct
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextRoundCount = roundCount + 1; // Calculate the next round count
    setRoundCount(nextRoundCount); // Update the round count

    if (nextRoundCount < questions.length) {
      // Move to the next question if there are more questions left
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selected option
      setFeedbackClass(null); // Reset feedback class for the next question
    } else {
      // End the quiz after all rounds
      setQuizEnded(true);
      console.log(
        `Quiz Ended! Your final score: ${score} out of ${questions.length}`
      );
    }
  };

  if (quizEnded) {
    return null; // Return null to remove the quiz container when the quiz ends // Show when the quiz is done
  }

  // Ensure questions are loaded before rendering
  if (questions.length === 0 || !questions[currentQuestionIndex]) {
    return null;
  }

  const question = questions[currentQuestionIndex]; // Get current question

  return (
    <div className="quiz-container">
      <h2>Tema: {question.theme}</h2> {/* Display the theme of the question */}
      <p>{question.question}</p>
      <div className="options-container">
        {randomizedOptions.map(([key, value]) => (
          <div
            key={key}
            className={`option ${
              selectedOption === key ? feedbackClass : "" // Only apply feedback to the clicked option
            }`}
            onClick={() => handleOptionClick(key)}
          >
            {value}
          </div>
        ))}
      </div>
      {/* Show next question button only after the user has made a selection */}
      {selectedOption && (
        <button onClick={handleNextQuestion} className="next-button">
          Next Question
        </button>
      )}
    </div>
  );
}

export default Quiz;
