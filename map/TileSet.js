import Map from "./map.js";

export default class TileSet extends Map {
  constructor(gameWidth, gameHeight, imgId, tileArray, imgWidth = 32, imgHeight = 32) {
    super(gameWidth, gameHeight, tileArray);

    this.img = document.querySelector(imgId);

    this.imgHeight = imgWidth; // in px
    this.imgWidth = imgHeight; // in px

    this.row = this.img.height / this.imgHeight; // in grids
    this.col = this.img.width / this.imgWidth; // in grids

  }

  draw(camera) {
    for (let row = Math.floor(camera.pos.y / this.imgHeight); row < (camera.pos.y + camera.height) / this.imgHeight; row++) {
      for (let col = Math.floor(camera.pos.x / this.imgWidth); col < (camera.pos.x + camera.width) / this.imgWidth; col++) {
        const tileNo = this.arr[row][col];
        const x = (tileNo % this.col);
        const y = Math.floor(tileNo / this.col);
        // console.log(tileNo,x,y);
        camera.ctx.drawImage(
          this.img,
          x * 32, y * 32,
          this.imgWidth, this.imgHeight,
          (col - Math.floor(camera.pos.x / this.imgWidth)) * this.imgWidth, (row - Math.floor(camera.pos.y / this.imgHeight)) * this.imgHeight,
          this.imgWidth, this.imgHeight);
      }
    }
  }
  fill(context) {
    for (let i = 0; i < this.gameHeight; i += this.imgHeight) {
      for (let j = 0; j < this.gameWidth; j += this.imgWidth) {
        context.drawImage(this.img, 0, 0, this.img.width, this.img.height, j, i, this.imgWidth, this.imgHeight);
      }
    }
  }
}
