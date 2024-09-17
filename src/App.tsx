import background1 from "./assets/background1.jpg";
import "./App.css";
import React, { useState } from "react";
import { GraphView } from "./components/GraphView/GraphView";

function App() {
  const [view, setView] = useState("home");

  return (
    <>
      <button onClick={() => setView("graphview")}>Go to graphview</button>
      {view === "home" && (
        <div
          className="App"
          style={{ backgroundImage: `url(${background1})` }}
        ></div>
      )}
      {view === "graphview" && <GraphView />}
    </>
  );
}

export default App;
