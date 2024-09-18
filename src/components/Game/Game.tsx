import "./Game.css"; // Renamed from App.css
import { useState } from "react";
import { GraphView } from ".././GraphView/GraphView";
import UserRegistration from ".././/UserRegistration/UserRegistration";
import Leaderboard from ".././Leaderboard/Leaderboard";
import Quiz from ".././Quiz/Quiz";

function Game() {
  const [view, setView] = useState("home");

  return (
    <>
      <button onClick={() => setView("graphview")}>Go to GraphView</button>
      <button onClick={() => setView("quizview")}>Go to QuizView</button>
      <button onClick={() => setView("UserRegistration")}>
        Go to User Registration
      </button>
      <button onClick={() => setView("Leaderboard")}>Go to Leaderboard</button>

      {view === "home" && <div className="Game"></div>}
      {view === "graphview" && <GraphView />}
      {view === "quizview" && <Quiz />}
      {view === "UserRegistration" && <UserRegistration />}
      {view === "Leaderboard" && <Leaderboard />}
    </>
  );
}

export default Game;
