import ReactConfetti from "react-confetti";
import "./App.css";
// import Game from "./components/Game/Game"; // Commented out Game component
import { DevNavBar } from "./components/DevNavBar/DevNavBar"; // Import DevNavBar
import React from "react";

function App() {
  const [showConfetti, setShowConfetti] = React.useState<boolean>(false);

  const party = (ms?: number) => {
    setShowConfetti(true);
    if (ms) {
      setTimeout(() => {
        setShowConfetti(false);
      }, ms);
    }
  };

  return (
    <div className="App">
      {showConfetti && <ReactConfetti />}
      {/* <Game /> */} {/* Commented out Game component */}
      <DevNavBar party={party} /> {/* Render DevNavBar instead */}
    </div>
  );
}

export default App;
