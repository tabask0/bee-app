import React from "react";
import Game from "./components/Game";
import "./app.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Game />
      <p>this is a paragraph</p>
    </div>
  );
};

export default App;
