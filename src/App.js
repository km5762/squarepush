import "./reset.css";
import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import GameBoard from "./classes/GameBoard";
import ColorTile from "./classes/ColorTile";
import NinjaSe from "./classes/NinjaSe";
import ConfigSwitch from "./components/ConfigSwitch";
import * as configs from "./configs/configs";
import GameCanvas from "./components/GameCanvas";

function App() {
  const [gameBoard, setGameBoard] = useState();

  return (
    <>
      <ConfigSwitch
        configs={Object.values(configs)}
        setGameBoard={setGameBoard}
      />
      <GameCanvas gameBoard={gameBoard} width={600} height={600} />
    </>
  );
}

export default App;
