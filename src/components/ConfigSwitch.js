import React from "react";
import NinjaSe from "../classes/NinjaSe";
import ColorTile from "../classes/ColorTile";
import GameBoard from "../classes/GameBoard";

export default function ConfigSwitch({ configs, setGameBoard }) {
  return configs.map((config, index) => (
    <button key={index} onClick={() => chooseConfig(config)}>
      Config {index}
    </button>
  ));

  function chooseConfig(config) {
    const rows = config.numRows;
    const cols = config.numCols;
    const ninjaSe = new NinjaSe(config.ninjaRow, config.ninjaColumn);
    const colorTiles = config.initial.map(
      (colorTile) =>
        new ColorTile(
          colorTile.row,
          colorTile.column,
          colorTile.color.toUpperCase()
        )
    );

    setGameBoard(new GameBoard(rows, cols, ninjaSe, colorTiles));
  }
}
