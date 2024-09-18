import React, { useState } from 'react';
import './NumberGuess.css';

const NumberGuess: React.FC<NumberGuessProps> = ({
  correctAnswer,
  questionText,
}) => {
  const [value, updateValue] = useState(50);
  const [showAnswer, setShowAnswer] = useState(false);

  function reveal() {
    setShowAnswer(!showAnswer);
  }

  return (
    <div className="number-guess">
      <label htmlFor="percentPicker">{questionText}</label>
      <input
        onChange={(e) => updateValue(Number(e.target.value))}
        type="range"
        id="percentPicker"
        name="percentPicker"
        min="0"
        max="100"
        step="1"
      />
      <button onClick={reveal}>Vis svar</button>
      <h1>Du gjetta: {value}%</h1>
      {showAnswer && <h1>Riktig svar var: {correctAnswer}%</h1>}
    </div>
  );
};

export default NumberGuess;

interface NumberGuessProps {
  correctAnswer: number;
  questionText: string;
}
