import React, { useState, useEffect } from 'react';
import './NumberGuess.css';

const NumberGuess: React.FC<NumberGuessProps> = ({ correctAnswer }) => {
  const [value, updateValue] = useState(50);
  const [showAnswer, setShowAnswer] = useState(false);

  function reveal() {
    setShowAnswer(!showAnswer);
  }

  return (
    <div className="number-guess">
      <label htmlFor="cowbell">
        Hvor mange prosent av befolkningen har høyere utdanning?
      </label>
      <input
        onChange={(e) => updateValue(Number(e.target.value))}
        type="range"
        id="cowbell"
        name="cowbell"
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
}
