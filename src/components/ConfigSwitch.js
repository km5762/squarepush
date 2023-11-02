import React, { useEffect } from "react";
import NinjaSe from "../classes/NinjaSe";
import ColorTile from "../classes/ColorTile";
import GameBoard from "../classes/GameBoard";

export default function ConfigSwitch({ configs, setGameBoard }) {
  /// set default config on mount
  useEffect(() => {
    chooseConfig(configs[0]);
  }, []);

  return configs.map((config, index) => (
    <button key={index} onClick={() => chooseConfig(config)}>
      Config {index}
    </button>
  ));

  function chooseConfig(config) {
    console.log(config.initial);

    const rows = config.numRows;
    const cols = config.numColumns;
    const ninjaSe = new NinjaSe(config.ninjaRow, config.ninjaColumn);
    const colorTiles = config.initial.map(
      (colorTile) =>
        new ColorTile(
          parseInt(colorTile.row) - 1,
          colorTile.column.toLowerCase().charCodeAt(0) - 97,
          colorTile.color.toUpperCase()
        )
    );

    setGameBoard(new GameBoard(rows, cols, ninjaSe, colorTiles));
  }
}
