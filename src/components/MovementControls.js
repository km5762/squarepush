import ColorTile from "../classes/ColorTile";
import GameBoard from "../classes/GameBoard";
import NinjaSe from "../classes/NinjaSe";
import Direction from "../enums/Direction";

export default function MovementControls({
  gameBoard,
  setGameBoard,
  incrementMoveCount,
  updateScore,
}) {
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

    const newAnchorRow = oldNinjaSe.anchorRow + yChange;
    const newAnchorCol = oldNinjaSe.anchorCol + xChange;

    console.log(newAnchorCol);
    if (
      newAnchorRow < 0 ||
      newAnchorRow > gameBoard.rows - 2 ||
      newAnchorCol < 0 ||
      newAnchorCol > gameBoard.cols - 2
    ) {
      return;
    }

    const newNinjaSe = new NinjaSe(newAnchorRow, newAnchorCol);

    const oldColorTiles = gameBoard.colorTiles;
    const newColorTiles = oldColorTiles.map(
      (colorTile) =>
        new ColorTile(colorTile.row, colorTile.col, colorTile.color)
    );
    let affectedVectors;
    let firstAffectedCrossVector;
    let lastAffectedCrossVector;

    if (yChange === 0) {
      affectedVectors = [newNinjaSe.anchorRow, newNinjaSe.anchorRow + 1];

      if (direction === Direction.LEFT) {
        firstAffectedCrossVector = newNinjaSe.anchorCol;
        lastAffectedCrossVector = newNinjaSe.anchorCol + 3;
      } else {
        firstAffectedCrossVector = newNinjaSe.anchorCol + 1;
        lastAffectedCrossVector = newNinjaSe.anchorCol - 2;
      }
    } else {
      affectedVectors = [newNinjaSe.anchorCol, newNinjaSe.anchorCol + 1];

      if (direction === Direction.UP) {
        firstAffectedCrossVector = newNinjaSe.anchorRow;
        lastAffectedCrossVector =
          newNinjaSe.anchorRow + 3 > gameBoard.cols - 1
            ? 0
            : newNinjaSe.anchorRow + 3;
      } else {
        firstAffectedCrossVector = newNinjaSe.anchorRow + 1;
        lastAffectedCrossVector = newNinjaSe.anchorRow - 2;
      }
    }

    for (const vector of affectedVectors) {
      for (
        let i = firstAffectedCrossVector;
        i !==
        (((lastAffectedCrossVector + yChange + xChange) % gameBoard.rows) +
          gameBoard.rows) %
          gameBoard.rows;
        i =
          (((i + yChange + xChange) % gameBoard.rows) + gameBoard.rows) %
          gameBoard.rows
      ) {
        const affectedTileIndex = oldColorTiles.findIndex((colorTile) =>
          yChange === 0
            ? colorTile.row === vector && colorTile.col === i
            : colorTile.col === vector && colorTile.row === i
        );

        if (affectedTileIndex === -1) {
          break;
        }

        updateScore(1);

        newColorTiles[affectedTileIndex].row =
          (((newColorTiles[affectedTileIndex].row + yChange) % gameBoard.rows) +
            gameBoard.rows) %
          gameBoard.rows;
        newColorTiles[affectedTileIndex].col =
          (((newColorTiles[affectedTileIndex].col + xChange) % gameBoard.cols) +
            gameBoard.cols) %
          gameBoard.cols;
      }
    }

    const newGameBoard = new GameBoard(
      gameBoard.rows,
      gameBoard.cols,
      newNinjaSe,
      newColorTiles
    );

    incrementMoveCount();
    setGameBoard(newGameBoard);
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button onClick={() => moveNinjaSe(Direction.LEFT)}>Left</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <button onClick={() => moveNinjaSe(Direction.UP)}>Up</button>
        <button onClick={() => moveNinjaSe(Direction.DOWN)}>Down</button>
      </div>
      <button onClick={() => moveNinjaSe(Direction.RIGHT)}>Right</button>
    </div>
  );
}
