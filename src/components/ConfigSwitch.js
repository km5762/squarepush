import React, { useCallback, useEffect } from "react";
import NinjaSe from "../classes/NinjaSe";
import ColorTile from "../classes/ColorTile";
import GameBoard from "../classes/GameBoard";

export default function ConfigSwitch({ configs, setGameBoard }) {
  const chooseConfig = useCallback(
    (config) => {
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

      setGameBoard(new GameBoard(rows, cols, ninjaSe, colorTiles));
    },
    [setGameBoard]
  );

  /// set default config on mount
  useEffect(() => {
    chooseConfig(configs[0]);
  }, [chooseConfig, configs]);

  return configs.map((config, index) => (
    <button key={index} onClick={() => chooseConfig(config)}>
      Config {index}
    </button>
  ));
}
