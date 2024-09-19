import { useState } from "react";
import "./Game.css"; // Ensure the CSS exists
import UserRegistration from "../UserRegistration/UserRegistration";
import Quiz from "../Quiz/Quiz"; // Adjust path based on structure
import { QuizScore } from "./QuizTypes"; // Import the types
import { GameData } from "../../type/users"; // Import your GameData type
import Leaderboard from "../Leaderboard/Leaderboard"; // Import Leaderboard component
import { GraphView } from "../GraphView/GraphView"; // Import GraphView
import { addToLocalStorage } from "../../lib/localStorage"; // Import local storage utility
import { graphEntries } from "../GraphView/db/db";
import { shuffleArray } from "../GraphView/GraphService";

const shuffledGraphViews = shuffleArray(graphEntries);

function Game() {
  const [view, setView] = useState<"home" | "quiz" | "userReg" | "done">(
    "home"
  );
  const [overallScore, setOverallScore] = useState<QuizScore | null>(null);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]); // Store all quiz scores
  const [userRegistered, setUserRegistered] = useState<boolean>(false); // Track if user has registered
  const [userData, setUserData] = useState<GameData | null>(null); // Track user data

  // State to control GraphView reruns and scores
  const [graphScores, setGraphScores] = useState<number[]>([]); // Array to store graph scores
  const [graphRunCount, setGraphRunCount] = useState(0); // Track the current run
  const graphTotalRuns = 3; // Define how many times GraphView will run

  // New state to control game mode steps
  const [gameModeStep, setGameModeStep] = useState<"quiz" | "graphView">(
    "quiz"
  );

  // Create a unique key for each GraphView run
  const graphViewKey = `graphview-${graphRunCount}`;

  // Handle the quiz ending and storing the score
  const handleQuizEnd = (scoreObject: QuizScore) => {
    setOverallScore(scoreObject);
    setQuizScores([...quizScores, scoreObject]); // Save the score for later calculations
    console.log("Quiz Score:", scoreObject["Quiz Score"]); // Print out the final quiz score

    // After the quiz ends, switch to graph view
    setGameModeStep("graphView");
  };

  // Handle graph completion
  const handleGraphComplete = (score: number) => {
    setGraphScores((prevScores) => [...prevScores, score]); // Save score in array
    console.log(`Graph Run ${graphRunCount + 1} Score:`, score); // Log the graph score

    // Check if we need to rerun GraphView
    if (graphRunCount + 1 < graphTotalRuns) {
      setGraphRunCount((prevCount) => prevCount + 1); // Increase run count to rerun GraphView
    } else {
      // All runs complete, update user score and move to done view
      updateUserScoreInLocalStorage();
      setView("done");
    }
  };

  // Calculate the final game score as a number
  const calculateGameFinalScore = (): number => {
    if (!overallScore || graphScores.length === 0) return 0;

    const averageGraphScore =
      graphScores.reduce((a, b) => a + b, 0) / graphScores.length; // Average graph scores
    const quizScore = overallScore["Quiz Score"]; // Quiz score is a percentage

    // Combine quiz score and average graph score as a number
    return quizScore + averageGraphScore;
  };

  // Update user score and save it to local storage
  const updateUserScoreInLocalStorage = () => {
    if (userData) {
      const finalScore = calculateGameFinalScore();

      // Update userData with the final score
      const updatedUserData = {
        ...userData,
        score: finalScore,
      };
      setUserData(updatedUserData); // Update the userData state

      // Save the updated user data to local storage
      addToLocalStorage("user", {
        [userData.name]: updatedUserData,
      });

      console.log("User score updated in localStorage:", updatedUserData);
    }
  };

  // Handle user registration completion
  const handleRegistrationComplete = (userData: GameData) => {
    setUserData(userData); // Save the user data
    console.log("Registered User:", userData); // Log the user data
    setUserRegistered(true);
    setView("quiz"); // After registration, go to quiz view
  };

  return (
    <div className="game-container">
      {/* Home view where the user can start the game */}
      {view === "home" && (
        <div className="start-game-wrapper">
          <div className="start-game" onClick={() => setView("userReg")}>
            Start Spill
          </div>
        </div>
      )}

      {/* User Registration view */}
      {view === "userReg" && (
        <UserRegistration onRegistrationComplete={handleRegistrationComplete} />
      )}

      {/* Quiz and GraphView in GameMode */}
      {view === "quiz" && userRegistered && (
        <GameMode>
          {gameModeStep === "quiz" && (
            <Quiz onQuizEnd={handleQuizEnd} /> // Quiz first
          )}
          {gameModeStep === "graphView" && (
            <GraphView
              indicator={shuffledGraphViews[graphRunCount].indicator}
              url={shuffledGraphViews[graphRunCount].savedQuery}
              question={shuffledGraphViews[graphRunCount].question}
              theme={shuffledGraphViews[graphRunCount].theme}
              key={graphViewKey} // Use the unique key to rerender GraphView
              onGraphComplete={handleGraphComplete}
            /> // Show GraphView after quiz completion
          )}
        </GameMode>
      )}

      {/* Game end view showing final results and leaderboard */}
      {view === "done" && overallScore && userData && (
        <div className="game-complete-container">
          <div className="game-complete-left">
            <h2>{userData.name}!</h2>
            <p>GameScore: {calculateGameFinalScore()}</p>{" "}
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
