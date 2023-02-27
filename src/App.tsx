import React from "react";
import "./App.css";
import "./index.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Board />
    </div>
  );
}

export default App;
