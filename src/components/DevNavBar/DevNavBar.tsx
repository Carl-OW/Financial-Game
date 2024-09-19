import React, { useState } from "react";
import { GraphView } from "../GraphView/GraphView";
import UserRegistration from "../UserRegistration/UserRegistration";
import Leaderboard from "../Leaderboard/Leaderboard";
import Admin from "../Admin/Admin";
import { Game } from "../Game/Game";
import NumberGuess from "../NumberGuess/NumberGuess";
import numberData from "../NumberGuess/numberData.json";
import { graphEntries } from "../GraphView/db/db";
import { shuffleArray } from "../GraphView/GraphService";

const shuffledGraphViews = shuffleArray(graphEntries);

type DevNavBarProps = {
  party: (ms?: number) => void;
};

export const DevNavBar: React.FC<DevNavBarProps> = ({ party }) => {
  const [view, setView] = useState<string | null>(null);

  const isDev = window.location.href.indexOf("dev=true") > -1;
  const goToAdmin = window.location.href.indexOf("admin") > -1;

  if (goToAdmin) {
    if (view !== "Admin") setView("Admin");
  }

  if (!view) {
    setView("Game");
  }

  const handleClick = (selectedView: string) => {
    setView(selectedView); // Set the selected view and hide the navbar
  };

  // Fantastic 🧑‍🍳😙🤌
  const reset = () => {
    if (isDev) {
      window.location.href = "/?dev=true";
      return;
    }
    window.location.href = "/";
  };

  return (
    <>
      <button
        onClick={reset}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        Reset
      </button>
      {/* Only render the navbar if no view is selected */}
      {isDev && (
        <div style={{ position: "absolute", bottom: "20px" }}>
          <button onClick={() => handleClick("graphview")}>Graph View</button>
          <button onClick={() => handleClick("quizview")}>Quiz View</button>
          <button onClick={() => handleClick("numberview")}>
            Number Guesser View
          </button>
          <button onClick={() => handleClick("UserRegistration")}>
            User Registration
          </button>
          <button onClick={() => handleClick("Leaderboard")}>
            Leaderboard
          </button>
          <button onClick={() => handleClick("Admin")}>Admin</button>
          <button onClick={() => handleClick("Game")}>Game</button>
        </div>
      )}

      {/* Render the selected view */}
      <div className="view-container">
        {view === "graphview" && (
          <GraphView
            theme={shuffledGraphViews[0].theme}
            onGraphComplete={() => {}}
            indicator={shuffledGraphViews[0].indicator}
            question={shuffledGraphViews[0].question}
            url={shuffledGraphViews[0].savedQuery}
          />
        )}
        {view === "numberview" && <NumberGuess {...numberData.numberData[0]} />}
        {view === "UserRegistration" && <UserRegistration />}
        {view === "Leaderboard" && <Leaderboard />}
        {view === "Admin" && <Admin />}
        {view === "Game" && <Game party={party} />}
      </div>
    </>
  );
};
