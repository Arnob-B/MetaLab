import Map from "./map.js";

export default class CollisionMap extends Map {
  constructor(gameWidth, gameHeight, tileArray) {
    super(gameWidth, gameHeight, tileArray);
  }
  setCol(x, y) {
    if (x >= 0 && x < this.arr[0].length && y >= 0 && y < this.arr.length)
      this.arr[y][x] = 1;
  }
  unSetCol(x, y) {
    if (x >= 0 && x < this.arr[0].length && y >= 0 && y < this.arr.length)
      this.arr[y][x] = 0;
  }
  getCol(x, y) {
    if (x >= 0 && x < this.arr[0].length && y >= 0 && y < this.arr.length)
      return this.arr[y][x];
  }
}
