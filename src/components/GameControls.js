import React from "react";
import MovementControls from "./MovementControls";
import GameBoard from "../classes/GameBoard";
import ColorTile from "../classes/ColorTile";

export default function GameControls({
  gameBoard,
  setGameBoard,
  incrementMoveCount,
  updateScore,
  setIsWon,
  isWon,
}) {
  function removeGroups() {
    const newColorTiles = gameBoard.colorTiles.map(
      (colorTile) =>
        new ColorTile(colorTile.row, colorTile.col, colorTile.color)
    );

    const indicesToRemove = [];

    for (let i = 0; i < gameBoard.colorTiles.length; i++) {
      const topLeftTile = gameBoard.colorTiles[i];
      const anchorColor = topLeftTile.color;
      const topRightTile = gameBoard.colorTiles.findIndex(
        (colorTile) =>
          colorTile.col === topLeftTile.col + 1 &&
          colorTile.row === topLeftTile.row &&
          colorTile.color === anchorColor
      );
      const bottomLeftTile = gameBoard.colorTiles.findIndex(
        (colorTile) =>
          colorTile.row === topLeftTile.row + 1 &&
          colorTile.col === topLeftTile.col &&
          colorTile.color === anchorColor
      );
      const bottomRightTile = gameBoard.colorTiles.findIndex(
        (colorTile) =>
          colorTile.row === topLeftTile.row + 1 &&
          colorTile.col === topLeftTile.col + 1 &&
          colorTile.color === anchorColor
      );

      if (
        topLeftTile !== -1 &&
        topRightTile !== -1 &&
        bottomLeftTile !== -1 &&
        bottomRightTile !== -1
      ) {
        indicesToRemove.push(i, topRightTile, bottomLeftTile, bottomRightTile);
      }
    }

    indicesToRemove.sort((a, b) => b - a);

    indicesToRemove.forEach((index) => {
      updateScore(1);
      newColorTiles.splice(index, 1);
    });

    const newGameBoard = new GameBoard(
      gameBoard.rows,
      gameBoard.cols,
      gameBoard.ninjaSe,
      newColorTiles
    );

    setGameBoard(newGameBoard);
    setIsWon(newColorTiles.length === 0);
  }

  return (
    <>
      <button onClick={removeGroups}>Remove Groups</button>
      <MovementControls
        isWon={isWon}
        gameBoard={gameBoard}
        setGameBoard={setGameBoard}
        incrementMoveCount={incrementMoveCount}
        updateScore={updateScore}
      />
    </>
  );
}
