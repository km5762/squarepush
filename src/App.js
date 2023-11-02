import "./reset.css";
import "./App.css";
import { useState } from "react";
import ConfigSwitch from "./components/ConfigSwitch";
import * as configs from "./configs/configs";
import GameCanvas from "./components/GameCanvas";

function App() {
  const [gameBoard, setGameBoard] = useState();
  const [configList] = useState(() =>
    Object.values(configs).sort((a, b) => a.name.localeCompare(b.name))
  );

  return (
    <>
      <ConfigSwitch configs={configList} setGameBoard={setGameBoard} />
      <GameCanvas gameBoard={gameBoard} width={600} height={600} />
    </>
  );
}

export default App;
