import { useState } from "react";
import "./Game.css"; // Ensure the CSS exists
import UserRegistration from "../UserRegistration/UserRegistration";
import Quiz from "../Quiz/Quiz"; // Adjust path based on structure
import { QuizScore } from "./QuizTypes"; // Import the types
import { GameData } from "../../type/users"; // Import your GameData type
import Leaderboard from "../Leaderboard/Leaderboard"; // Import Leaderboard component
import { GraphView } from "../GraphView/GraphView"; // Import GraphView
import NumberGuess  from "../NumberGuess/NumberGuess"; // Import NumberGuess
import { addToLocalStorage, getFromLocalStorage } from "../../lib/localStorage"; // Import local storage utility
import { graphEntries } from "../GraphView/db/db";
import { shuffleArray } from "../GraphView/GraphService";

const shuffledGraphViews = shuffleArray(graphEntries);

type GameProps = {
  party: (ms?: number) => void;
};

export const Game: React.FC<GameProps> = ({ party }) => {
  const [view, setView] = useState<
    "home" | "quiz" | "userReg" | "done" | "numberGuess"
  >("home");
  const [overallScore, setOverallScore] = useState<QuizScore | null>(null);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]); // Store all quiz scores
  const [userRegistered, setUserRegistered] = useState<boolean>(false); // Track if user has registered
  const [userData, setUserData] = useState<GameData | null>(null); // Track user data
  const [userId, setUserId] = useState<string | null>(null); // Track unique user ID

  // State to control GraphView reruns and scores
  const [graphScores, setGraphScores] = useState<number[]>([]); // Array to store graph scores
  const [graphRunCount, setGraphRunCount] = useState(0); // Track the current run
  const [numberGuessScore, setNumberGuessScore] = useState<number | null>(null); // Track NumberGuess score
  const graphTotalRuns = 3; // Define how many times GraphView will run

  // New state to control game mode steps
  const [gameModeStep, setGameModeStep] = useState<
    "quiz" | "graphView" | "numberGuess"
  >("quiz");

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
      // All runs complete, switch to NumberGuess
      setGameModeStep("numberGuess");
    }
  };

  // Handle NumberGuess completion
  const handleNumberGuessComplete = (finalScore: number) => {
    setNumberGuessScore(finalScore); // Save the NumberGuess final score
    setView("done"); // Move to the done view after NumberGuess
  };

  // Calculate the final game score as a number
  const calculateGameFinalScore = (): number => {
    if (!overallScore || graphScores.length === 0 || numberGuessScore === null)
      return 0;

    const averageGraphScore =
      graphScores.reduce((a, b) => a + b, 0) / graphScores.length; // Average graph scores
    const quizScore = overallScore["Quiz Score"]; // Quiz score is a percentage

    // Combine quiz score, average graph score, and number guess score
    return quizScore + averageGraphScore + numberGuessScore;
  };

  // Update user score and save it to local storage using the unique ID
  const updateUserScoreInLocalStorage = () => {
    if (userData && userId) {
      const finalScore = calculateGameFinalScore();

      // Retrieve the existing user data from localStorage
      const storedData = getFromLocalStorage("user") as Storage; // Cast to Storage

      // Update userData with the final score
      const updatedUserData = {
        ...storedData[userId], // Use existing data from localStorage
        ...userData,
        score: finalScore, // Update score
      };

      // Save the updated user data to local storage using the unique ID
      addToLocalStorage("user", {
        [userId]: updatedUserData,
      });

      console.log("User score updated in localStorage:", updatedUserData);
    }
  };

  function roundToThree(num: number): number {
    return Math.round(num * 1000);
  }
  // Handle user registration completion
  const handleRegistrationComplete = (userData: GameData, userId: string) => {
    setUserData(userData); // Save the user data
    setUserId(userId); // Save the unique user ID
    console.log("Registered User:", userData, "UserID:", userId); // Log the user data and ID
    setUserRegistered(true);
    setView("quiz"); // After registration, go to quiz view
  };

  return (
    <div style={{ height: "100vh" }}>
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

      {/* Quiz, GraphView, and NumberGuess in GameMode */}
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
          {gameModeStep === "numberGuess" && (
            <NumberGuess onNumberGuessEnd={handleNumberGuessComplete} /> // Show NumberGuess after GraphView
          )}
        </GameMode>
      )}

      {/* Game end view showing final results and leaderboard */}
      {view === "done" && overallScore && userData && (
        <div className="game-complete-container">
          <div className="game-complete-left">
            <h2>{userData.name}!</h2>
            <p>GameScore: {roundToThree(calculateGameFinalScore())}</p>{" "}
          </div>
          <div className="game-complete-right">
            <Leaderboard />
          </div>
        </div>
      )}
    </div>
  );
};

// GameMode component to encapsulate game mode logic
interface GameModeProps {
  children: React.ReactNode;
}

const GameMode: React.FC<GameModeProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
