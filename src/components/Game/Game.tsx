// Game.tsx
import { useState } from "react";
import "./Game.css"; // Ensure the CSS exists
import Quiz from "../Quiz/Quiz"; // Adjust path based on structure
import { QuizScore } from "./QuizTypes"; // Import the types

function Game() {
  const [view, setView] = useState<"home" | "quiz" | "done">("home");
  const [overallScore, setOverallScore] = useState<QuizScore | null>(null);

  // Handle the quiz ending and storing the score
  const handleQuizEnd = (scoreObject: QuizScore) => {
    setOverallScore(scoreObject);
    setView("done");
  };

  return (
    <div className="game-container">
      {view === "home" && (
        <div className="start-game" onClick={() => setView("quiz")}>
          Start Spill
        </div>
      )}

      {view === "quiz" && <Quiz onQuizEnd={handleQuizEnd} />}

      {view === "done" && overallScore && (
        <div className="game-complete">
          <h2>Game Complete!</h2>
          <p>Overall Score: {overallScore["Quiz Score"]}%</p>
          {/* Additional game logic or leaderboard can go here */}
        </div>
      )}
    </div>
  );
}

export default Game;
