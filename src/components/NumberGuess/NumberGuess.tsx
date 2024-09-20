import React, { useState, useEffect, useRef } from "react";
import "./NumberGuess.css";
import numberData from "./numberData.json";

// Function to get one random question from each theme without duplicates
const getRandomQuestionsFromEachTheme = (data: any[], count: number) => {
  const themes = [...new Set(data.map((item) => item.theme))]; // Unique themes
  const selectedQuestions: any[] = [];

  while (selectedQuestions.length < count) {
    const availableThemes = themes.filter(
      (theme) => !selectedQuestions.find((q) => q.theme === theme)
    );
    const theme =
      availableThemes[Math.floor(Math.random() * availableThemes.length)];
    const questionsFromTheme = data.filter((item) => item.theme === theme);
    const randomQuestion =
      questionsFromTheme[Math.floor(Math.random() * questionsFromTheme.length)];
    selectedQuestions.push(randomQuestion);
  }

  return selectedQuestions;
};

type NumberGuessProps = {
  onNumberGuessEnd: (finalScore: number) => void; // New prop to handle the final score
};

const NumberGuess: React.FC<NumberGuessProps> = ({ onNumberGuessEnd }) => {
  const [questions] = useState(
    getRandomQuestionsFromEachTheme(numberData.numberData, 4)
  ); // Get 4 unique random questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [value, setValue] = useState(questions[0].preselectedValue); // Set initial slider value
  const [showAnswer, setShowAnswer] = useState(false);
  const [disableSlider, setDisableSlider] = useState(false);
  const [valuePosition, setValuePosition] = useState(0); // Store the position of the value
  const [sliderMoved, setSliderMoved] = useState(false); // Track if the slider has been moved
  const [totalScore, setTotalScore] = useState<number[]>([]); // Store the scores for each question

  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update when currentQuestionIndex changes
    const currentQuestion = questions[currentQuestionIndex];
    setValue(currentQuestion.preselectedValue); // Reset slider value for the new question
    setShowAnswer(false);
    setDisableSlider(false);
    setSliderMoved(false);
    updateValuePosition(currentQuestion.preselectedValue); // Reset slider position
  }, [currentQuestionIndex, questions]);

  // Reveal the correct answer and disable the slider
  const reveal = () => {
    setShowAnswer(true);
    setDisableSlider(true);

    const currentQuestion = questions[currentQuestionIndex];
    // Calculate the score for the current question
    const score = calculateWeightedScore(currentQuestion.correctAnswer, value);
    setTotalScore((prevScores) => [...prevScores, score]);

    if (currentQuestionIndex + 1 < questions.length) {
      // Move to the next question after 3 seconds
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 1900);
    } else {
      // Calculate the final score after all questions
      const total = [...totalScore, score];
      const final = total.reduce((sum, val) => sum + val, 0) / total.length; // Average score
      onNumberGuessEnd(final); // Pass the final score back to Game.tsx
    }
  };

  // Weighted scoring function
  const calculateWeightedScore = (
    correctAnswer: number,
    guessedAnswer: number
  ) => {
    const diff = Math.abs(correctAnswer - guessedAnswer);
    const c = 2.6827;
    const p = 2.2279;
    let score = 100 / (1 + Math.pow(diff / c, p));
    if (diff >= 15) {
      score = 0;
    }
    return Math.round(score);
  };

  // Function to update the percentage value's position dynamically
  const updateValuePosition = (sliderValue: number) => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const percent =
        (sliderValue - Number(slider.min)) /
        (Number(slider.max) - Number(slider.min));
      const newPosition = percent * slider.offsetWidth;
      setValuePosition(newPosition - 20); // Adjust to center the value
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="gauge-container fixed-container">
      <div className="number-guess">
        {/* Display the current question */}
        <h2 className="theme">Tema: {currentQuestion.theme}</h2>
        <label htmlFor="percentPicker" className="question">
          {currentQuestion.questionText}
        </label>

        <div className="slider-container">
          <span className="min-value">{currentQuestion.minimumValue}</span>
          <div className="slider-wrapper">
            <input
              ref={sliderRef}
              disabled={disableSlider}
              className="slider"
              onChange={(e) => {
                const newValue = Number(e.target.value);
                setValue(newValue);
                updateValuePosition(newValue);
                setSliderMoved(true); // Set to true once the user moves the slider
              }}
              type="range"
              value={value}
              id="percentPicker"
              name="percentPicker"
              min={currentQuestion.minimumValue}
              max={currentQuestion.maximumValue}
              step="1"
            />
            {/* Show percentage only after the slider has been moved */}
            {sliderMoved && (
              <span
                className="slider-value"
                style={{ left: `${valuePosition}px` }}
              >
                {value}%
              </span>
            )}
          </div>
          <span className="max-value">{currentQuestion.maximumValue}</span>
        </div>

        <div className="reveal-container">
          {sliderMoved && (
            <button
              className={`reveal ${sliderMoved ? "show" : ""}`}
              onClick={reveal}
            >
              Svar
            </button>
          )}
        </div>

        <div className="answer-container">
          {showAnswer && (
            <>
              <h2 className={`user-answer ${showAnswer ? "show" : ""}`}>
                Ditt Svar: {value}%
              </h2>
              <h2 className={`correct-answer ${showAnswer ? "show" : ""}`}>
                Riktig svar: {currentQuestion.correctAnswer}%
              </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberGuess;
