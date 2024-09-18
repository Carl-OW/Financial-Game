import React, { useState } from "react";
import "./DevNavBar.css"; // New CSS file for DevNavBar styles
import { GraphView } from "../GraphView/GraphView";
import UserRegistration from "../UserRegistration/UserRegistration";
import Leaderboard from "../Leaderboard/Leaderboard";
import Admin from "../Admin/Admin";
import Game from "../Game/Game"; // Import Game component

const DevNavBar: React.FC = () => {
  const [view, setView] = useState("home");

  return (
    <>
      <div className="navbar-container">
        <button onClick={() => setView("graphview")}>GraphView</button>
        <button onClick={() => setView("quizview")}>Quiz</button>
        <button onClick={() => setView("UserRegistration")}>
          User Registration
        </button>
        <button onClick={() => setView("Leaderboard")}>Leaderboard</button>
        <button onClick={() => setView("Admin")}>Admin</button>
        <button onClick={() => setView("Game")}>Game</button>
      </div>
      {view === "home" && <div className="Game"></div>}
      {view === "graphview" && <GraphView />}
      {view === "UserRegistration" && <UserRegistration />}
      {view === "Leaderboard" && <Leaderboard />}
      {view === "Admin" && <Admin />}
      {view === "Game" && <Game />} {/* Render Game when selected */}
    </>
  );
};

export default DevNavBar;
