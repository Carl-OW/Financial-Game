import "./App.css";
// import Game from "./components/Game/Game"; // Commented out Game component
import DevNavBar from "./components/DevNavBar/DevNavBar"; // Import DevNavBar

function App() {
  return (
    <div className="App">
      {/* <Game /> */} {/* Commented out Game component */}
      <DevNavBar /> {/* Render DevNavBar instead */}
    </div>
  );
}

export default App;
