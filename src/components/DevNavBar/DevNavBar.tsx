import { useState } from "react";
import { GraphView } from "../GraphView/GraphView";
import UserRegistration from "../UserRegistration/UserRegistration";
import Leaderboard from "../Leaderboard/Leaderboard";
import Quiz from "../Quiz/Quiz";
import Admin from "../Admin/Admin";
import Game from "../Game/Game";

function DevNavBar() {
  const [view, setView] = useState<string | null>(null);

  const handleClick = (selectedView: string) => {
    setView(selectedView); // Set the selected view and hide the navbar
  };

  return (
    <>
      {/* Only render the navbar if no view is selected */}
      {!view && (
        <div className="dev-navbar">
          <button onClick={() => handleClick("graphview")}>Graph View</button>
          <button onClick={() => handleClick("quizview")}>Quiz View</button>
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
        {view === "graphview" && <GraphView />}
        {view === "quizview" && (
          <Quiz onQuizEnd={(scoreObject) => console.log(scoreObject)} />
        )}
        {view === "UserRegistration" && <UserRegistration />}
        {view === "Leaderboard" && <Leaderboard />}
        {view === "Admin" && <Admin />}
        {view === "Game" && <Game />}
      </div>
    </>
  );
}

export default DevNavBar;
