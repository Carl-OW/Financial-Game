import background1 from "./assets/background1.jpg";
import "./App.css";
import { useState } from "react";
import { GraphView } from "./components/GraphView/GraphView";
import Quiz from "./components/Quiz/Quiz";

function App() {
  const [view, setView] = useState("home");

  return (
    <>
      <button onClick={() => setView("graphview")}>Go to graphview</button>
      <button onClick={() => setView("quizview")}>Go to quizview</button>
      {view === "home" && (
        <div
          className="App"
          style={{ backgroundImage: `url(${background1})` }}
        ></div>
      )}
      {view === "graphview" && <GraphView />}
      {view === "quizview" && <Quiz></Quiz>}
    </>
  );
}

export default App;
