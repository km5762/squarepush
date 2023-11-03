import "./reset.css";
import "./App.css";
import { useMemo, useState } from "react";
import ConfigSwitch from "./components/ConfigSwitch";
import * as configs from "./configs/configs";
import GameCanvas from "./components/GameCanvas";
import MovementControls from "./components/MovementControls";

function App() {
  const [gameBoard, setGameBoard] = useState();
  const configList = useMemo(
    () => Object.values(configs).sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  return (
    <>
      <ConfigSwitch configs={configList} setGameBoard={setGameBoard} />
      <GameCanvas gameBoard={gameBoard} width={500} height={500} />
      <MovementControls gameBoard={gameBoard} setGameBoard={setGameBoard} />
    </>
  );
}

export default App;
