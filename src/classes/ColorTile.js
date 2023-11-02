import Color from "../enums/Color.js";

export default class ColorTile {
  constructor(row, col, color) {
    if (Color.hasOwnProperty(color)) {
      this.row = row;
      this.col = col;
      this.color = color;
    } else {
      throw new Error(`Invalid color: ${color}`);
    }
  }
}
