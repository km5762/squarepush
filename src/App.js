import "./reset.css";
import "./App.css";
import { useMemo, useState } from "react";
import ConfigSwitch from "./components/ConfigSwitch";
import * as configs from "./configs/configs";
import GameCanvas from "./components/GameCanvas";
import MovementControls from "./components/MovementControls";

function App() {
  const [gameBoard, setGameBoard] = useState();
  const [moveCount, setMoveCount] = useState(0);
  const [score, setScore] = useState(0);
  const configList = useMemo(
    () => Object.values(configs).sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const incrementMoveCount = () => setMoveCount(moveCount + 1);
  const updateScore = (affectedTiles) =>
    setScore((prevScore) => prevScore + affectedTiles);

  return (
    <>
      <ConfigSwitch configs={configList} setGameBoard={setGameBoard} />
      <GameCanvas gameBoard={gameBoard} width={500} height={500} />
      <MovementControls
        gameBoard={gameBoard}
        setGameBoard={setGameBoard}
        incrementMoveCount={incrementMoveCount}
        updateScore={updateScore}
      />
      <p>{moveCount}</p>
      <p>{score}</p>
    </>
  );
}

export default App;
