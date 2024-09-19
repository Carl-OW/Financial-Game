import React, { useState } from 'react';
import './NumberGuess.css';
import { GagueData } from '../../type/gagueData';

const NumberGuess: React.FC<GagueData> = ({
  theme,
  correctAnswer,
  format,
  maximumValue,
  minimumValue,
  preselectedValue,
  questionText,
}) => {
  const [value, updateValue] = useState(preselectedValue);
  const [showAnswer, setShowAnswer] = useState(false);

  function reveal() {
    setShowAnswer(!showAnswer);
  }

  function calculateScore(guessedVaule: number, correctValue: number) {
    const difference = Math.abs(guessedVaule - correctValue);
    return 100 - difference;
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

  function calculateBetterScore(
    correctAnswer: number,
    guessedAnswer: number,
    max: number,
    min: number
  ) {
    return Math.round(
      100 - Math.abs(guessedAnswer - correctAnswer) / ((max - min) / 100)
    );
  }

  return (
    <div className="number-guess">
      <h1>{theme}</h1>
      <label htmlFor="percentPicker">{questionText}</label>
      <input
        onChange={(e) => updateValue(Number(e.target.value))}
        type="range"
        value={value}
        id="percentPicker"
        name="percentPicker"
        min={minimumValue}
        max={maximumValue}
        step="1"
      />
      <button onClick={reveal}>Vis svar</button>
      <h1>
        Du gjetta: {value} {format}
      </h1>
      {showAnswer && (
        <div>
          <h1 className="facit">Riktig svar var: {correctAnswer}%</h1>
          <h1 className="points">
            Du fikk {calculateScore(value, correctAnswer)} poeng!
          </h1>
          <h1 className="weightedpoints">
            Du fikk {calculateWeightedScore(value, correctAnswer)} vektede
            poeng!
          </h1>
          <h1 className="betterpoints">
            Du fikk{' '}
            {calculateBetterScore(
              value,
              correctAnswer,
              minimumValue,
              maximumValue
            )}{' '}
            forbedrede poeng!
          </h1>
        </div>
      )}
    </div>
  );
};

export default NumberGuess;
