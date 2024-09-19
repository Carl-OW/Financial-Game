import { useState } from "react";
import "./Game.css"; // Ensure the CSS exists
import UserRegistration from "../UserRegistration/UserRegistration";
import Quiz from "../Quiz/Quiz"; // Adjust path based on structure
import { QuizScore } from "./QuizTypes"; // Import the types
import { GameData } from "../../type/users"; // Import your GameData type
import Leaderboard from "../Leaderboard/Leaderboard"; // Import Leaderboard component

function Game() {
  const [view, setView] = useState<"home" | "quiz" | "userReg" | "done">(
    "home"
  );
  const [overallScore, setOverallScore] = useState<QuizScore | null>(null);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]); // Store all quiz scores
  const [userRegistered, setUserRegistered] = useState<boolean>(false); // Track if user has registered
  const [userData, setUserData] = useState<GameData | null>(null); // Track user data

  // Handle the quiz ending and storing the score
  const handleQuizEnd = (scoreObject: QuizScore) => {
    setOverallScore(scoreObject);
    setQuizScores([...quizScores, scoreObject]); // Save the score for later calculations
    console.log("Quiz Score:", scoreObject["Quiz Score"]); // Print out the final quiz score
    setView("done");
  };

  // Handle user registration completion
  const handleRegistrationComplete = (userData: GameData) => {
    setUserData(userData); // Save the user data
    console.log("Registered User:", userData); // Log the user data
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

      {/* Game end view showing final results and leaderboard */}
      {view === "done" && overallScore && userData && (
        <div className="game-complete-container">
          <div className="game-complete-left">
            <h2>Game Complete!</h2>
            <p>Thank you, {userData.name}!</p>
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

          <div className="game-complete-right">
            <Leaderboard />
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
