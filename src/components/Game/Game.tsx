import { useState } from "react";
import "./Game.css"; // Ensure the CSS exists
import UserRegistration from "../UserRegistration/UserRegistration";
import Quiz from "../Quiz/Quiz"; // Adjust path based on structure
import { QuizScore } from "./QuizTypes"; // Import the types

function Game() {
  const [view, setView] = useState<"home" | "quiz" | "userReg" | "done">(
    "home"
  );
  const [overallScore, setOverallScore] = useState<QuizScore | null>(null);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]); // Store all quiz scores
  const [userRegistered, setUserRegistered] = useState<boolean>(false); // Track if user has registered

  // Handle the quiz ending and storing the score
  const handleQuizEnd = (scoreObject: QuizScore) => {
    setOverallScore(scoreObject);
    setQuizScores([...quizScores, scoreObject]); // Save the score for later calculations
    console.log("Quiz Score:", scoreObject["Quiz Score"]); // Print out the final quiz score
    setView("done");
  };

  // Handle user registration completion
  const handleRegistrationComplete = () => {
    setUserRegistered(true);
    setView("quiz");
  };

  return (
    <div className="game-container">
      {/* Home view where the user can start the game */}
      {view === "home" && (
        <div className="start-game" onClick={() => setView("userReg")}>
          Start Game
        </div>
      )}

      {/* User Registration view */}
      {view === "userReg" && (
        <UserRegistration onRegistrationComplete={handleRegistrationComplete} />
      )}

      {/* Quiz Game Mode view */}
      {view === "quiz" && userRegistered && (
        <GameMode>
          <Quiz onQuizEnd={handleQuizEnd} />
        </GameMode>
      )}

      {/* Game end view showing final results */}
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
        </div>
      )}
    </div>
  );
}

// GameMode component to encapsulate game mode logic
interface GameModeProps {
  children: React.ReactNode;
}

const GameMode: React.FC<GameModeProps> = ({ children }) => {
  return <div className="game-mode">{children}</div>;
};

export default Game;
