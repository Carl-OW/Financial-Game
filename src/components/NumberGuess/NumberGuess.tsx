import React, { useState } from 'react';
import './NumberGuess.css';
import { QuizProps } from '../Game/QuizTypes';
import numberData from './numberData.json';

const questionPicked = Math.floor(
  Math.random() * (numberData.numberData.length + 1 - 1)
);
const {
  theme,
  questionText,
  format,
  correctAnswer,
  minimumValue,
  maximumValue,
  preselectedValue,
} = numberData.numberData[questionPicked];

const NumberGuess: React.FC<QuizProps> = ({ onQuizEnd }) => {
  const [value, updateValue] = useState(preselectedValue);
  const [showAnswer, setShowAnswer] = useState(false);
  const [disableSlider, setDisableSlider] = useState(false);

  function reveal() {
    setShowAnswer(!showAnswer);
    setDisableSlider(true);
  }

  function calculateWeightedScore(
    correctAnswer: number,
    guessedAnswer: number
  ) {
    const diff = Math.abs(correctAnswer - guessedAnswer);
    const c = 2.6827;
    const p = 2.2279;
    let score = 100 / (1 + Math.pow(diff / c, p));
    if (diff >= 15) {
      score = 0;
    }
    return Math.round(score);
  }

  // function calculateBetterScore(
  //   correctAnswer: number,
  //   guessedAnswer: number,
  //   max: number,
  //   min: number
  // ) {
  //   return Math.round(
  //     100 - Math.abs(guessedAnswer - correctAnswer) / ((max - min) / 100)
  //   );
  // }

  return (
    <div className="gague-container">
      <div className="number-guess">
        <h2 className="theme">{theme}</h2>
        <label htmlFor="percentPicker" className="question">
          {questionText}
        </label>
        <input
          disabled={disableSlider}
          className="slider"
          onChange={(e) => updateValue(Number(e.target.value))}
          type="range"
          value={value}
          id="percentPicker"
          name="percentPicker"
          min={minimumValue}
          max={maximumValue}
          step="1"
        />
        <button className="reveal" onClick={reveal}>
          Vis svar
        </button>
        <h2 className="guess">
          Du gjetta: {value} {format}
        </h2>
        {showAnswer && (
          <>
            <h2 className="facit">Riktig svar var: {correctAnswer}%</h2>
            <h2 className="weightedpoints">
              Du fikk {calculateWeightedScore(value, correctAnswer)} vektede
              poeng!
            </h2>
            <button
              className="next"
              onClick={() => {
                onQuizEnd({
                  'Quiz Score': calculateWeightedScore(value, correctAnswer),
                });
                setShowAnswer(false);
              }}
            >
              Neste
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NumberGuess;
