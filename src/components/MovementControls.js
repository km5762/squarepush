import GameBoard from "../classes/GameBoard";
import NinjaSe from "../classes/NinjaSe";
import Direction from "../enums/Direction";

export default function MovementControls({ gameBoard, setGameBoard }) {
  function moveNinjaSe(direction) {
    let xChange = 0;
    let yChange = 0;

    switch (direction) {
      case Direction.UP:
        yChange = -1;
        break;
      case Direction.DOWN:
        yChange = 1;
        break;
      case Direction.LEFT:
        xChange = -1;
        break;
      case Direction.RIGHT:
        xChange = 1;
        break;
      default:
        break;
    }

    const oldNinjaSe = gameBoard.ninjaSe;

    const newNinjaSe = new NinjaSe(
      oldNinjaSe.anchorRow + yChange,
      oldNinjaSe.anchorCol + xChange
    );

    const newGameBoard = new GameBoard(
      gameBoard.rows,
      gameBoard.cols,
      newNinjaSe,
      gameBoard.colorTiles
    );

    setGameBoard(newGameBoard);
  }

  return (
    <>
      <button onClick={() => moveNinjaSe(Direction.LEFT)}>Left</button>
      <button onClick={() => moveNinjaSe(Direction.UP)}>Up</button>
      <button onClick={() => moveNinjaSe(Direction.DOWN)}>Down</button>
      <button onClick={() => moveNinjaSe(Direction.RIGHT)}>Right</button>
    </>
  );
}
