export default class map {
  constructor(gameWidth, gameHeight, tileArray = 32) {
    this.gameHeight = gameHeight // in px
    this.gameWidth = gameWidth // in px

    this.arr = tileArray;
  }
}
