import Colortile from "./ColorTile";
import NinjaSe from "./NinjaSe";

export default class GameBoard {
  constructor(rows, cols, ninjaSe, colorTiles) {
    this.rows = rows;
    this.cols = cols;
    this.ninjaSe = ninjaSe;
    this.colorTiles = colorTiles;
  }
}
