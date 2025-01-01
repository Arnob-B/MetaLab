import Map from "./map.js";

export default class CollisionMap extends Map {
  constructor(gameWidth, gameHeight, tileArray) {
    super(gameWidth, gameHeight, tileArray);
  }
  setCol(x, y) {
    if (x >= 0 && x < this.tileArray[0].length && y >= 0 && y < this.tileArray.length)
      this.tileArray[x][y] = 1;
  }
  unSetCol(x, y) {
    if (x >= 0 && x < this.tileArray[0].length && y >= 0 && y < this.tileArray.length)
      this.tileArray[x][y] = 0;
  }
  getCol(x, y) {
    if (x >= 0 && x < this.tileArray[0].length && y >= 0 && y < this.tileArray.length)
      return this.tileArray[x][y];
  }
}
