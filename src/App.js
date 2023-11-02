import "./reset.css";
import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import GameBoard from "./classes/GameBoard";
import ColorTile from "./classes/ColorTile";
import NinjaSe from "./classes/NinjaSe";
import ConfigSwitch from "./components/ConfigSwitch";
import * as configs from "./configs/configs";

function App() {
  const [gameBoard, setGameBoard] = useState();

  useEffect(() => {
    console.log(gameBoard);
  }, [gameBoard]);

  return (
    <>
      <ConfigSwitch
        configs={Object.values(configs)}
        setGameBoard={setGameBoard}
      />
    </>
  );
}

export default App;
