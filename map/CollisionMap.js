import Map from "./map.js";

export default class CollisionMap extends Map {
  constructor(gameWidth, gameHeight, tileArray) {
    super(gameWidth, gameHeight, tileArray);
  }
}
