import { useState } from "react";
import "./Game.css"; // Ensure the CSS exists
import Quiz from "../Quiz/Quiz"; // Adjust path based on structure
import { QuizScore } from "./QuizTypes"; // Import the types

function Game() {
  const [view, setView] = useState<"home" | "quiz" | "done">("home");
  const [overallScore, setOverallScore] = useState<QuizScore | null>(null);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]); // Store all quiz scores

  // Handle the quiz ending and storing the score
  const handleQuizEnd = (scoreObject: QuizScore) => {
    setOverallScore(scoreObject);
    setQuizScores([...quizScores, scoreObject]); // Save the score for later calculations
    console.log("Quiz Score:", scoreObject["Quiz Score"]); // Print out the final quiz score
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
          <p>Overall Quiz Score: {overallScore["Quiz Score"]}%</p>
          <div>
            All Stored Scores:
            {quizScores.map((score, index) => (
              <div key={index}>
                Quiz {index + 1} Score: {score["Quiz Score"]}%
              </div>
            ))}
          </div>
          {/* Additional game logic or leaderboard can go here */}
        </div>
      )}
    </div>
  );
}

export default Game;
