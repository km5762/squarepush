import "./reset.css";
import "./App.css";
import { useMemo, useState, useCallback, useEffect } from "react";
import ConfigSwitch from "./components/ConfigSwitch";
import * as configs from "./configs/configs";
import GameCanvas from "./components/GameCanvas";
import NinjaSe from "./classes/NinjaSe";
import ColorTile from "./classes/ColorTile";
import GameBoard from "./classes/GameBoard";
import GameControls from "./components/GameControls";

function App() {
  const [gameBoard, setGameBoard] = useState();
  const [moveCount, setMoveCount] = useState(0);
  const [score, setScore] = useState(0);
  const [configNum, setConfigNum] = useState();
  const [isWon, setIsWon] = useState(false);
  const configList = useMemo(
    () => Object.values(configs).sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const incrementMoveCount = () =>
    setMoveCount((prevMoveCount) => prevMoveCount + 1);
  const updateScore = (affectedTiles) =>
    setScore((prevScore) => prevScore + affectedTiles);

  const chooseConfig = useCallback(
    (num) => {
      const config = configList[num];
      const rows = parseInt(config.numRows);
      const cols = parseInt(config.numColumns);
      const ninjaSe = new NinjaSe(
        parseInt(config.ninjaRow) - 1,
        config.ninjaColumn.toLowerCase().charCodeAt(0) - 97
      );

      const colorTiles = config.initial.map(
        (colorTile) =>
          new ColorTile(
            parseInt(colorTile.row) - 1,
            colorTile.column.toLowerCase().charCodeAt(0) - 97,
            colorTile.color.toUpperCase()
          )
      );

      setConfigNum(num);
      setIsWon(false);
      setMoveCount(0);
      setScore(0);
      setGameBoard(new GameBoard(rows, cols, ninjaSe, colorTiles));
    },
    [configList]
  );

  function resetGame() {
    setIsWon(false);
    setMoveCount(0);
    setScore(0);
    chooseConfig(configNum);
  }

  /// set default config on mount
  useEffect(() => {
    chooseConfig(0);
  }, [chooseConfig]);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <ConfigSwitch configList={configList} chooseConfig={chooseConfig} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "10rem" }}>
            <p>Moves:{moveCount}</p>
            <p>Score:{score}</p>
          </div>
          <div>
            <GameCanvas gameBoard={gameBoard} width={600} height={600} />
            {isWon && <p>you win 🙂</p>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <GameControls
            isWon={isWon}
            setIsWon={setIsWon}
            gameBoard={gameBoard}
            setGameBoard={setGameBoard}
            incrementMoveCount={incrementMoveCount}
            updateScore={updateScore}
          />
          <button onClick={resetGame}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
