export default class map {
  constructor(gameWidth, gameHeight, imgId, tileArray, imgWidth = 32, imgHeight = 32) {
    this.gameHeight = gameHeight // in px
    this.gameWidth = gameWidth // in px

    this.img = document.querySelector(imgId);

    this.imgHeight = imgWidth; // in px
    this.imgWidth = imgHeight; // in px

    this.row = this.img.height / this.imgHeight; // in grids
    this.col = this.img.width / this.imgWidth; // in grids

    this.arr = tileArray;
    /*
    this.arr = [
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    ];
    */
  }
  draw(context, canvX, canvY, canvW, canvH) {
    //drawImage(img, imgx, imgy, imgw, imgh, dx, dy, dw, dh)
    //row , height -> px,px
    document.querySelector("#canvasPops").innerHTML = `canvX->${canvX},canvy${canvY},canvw${canvW},canvh${canvH},row${this.row},col${this.col}
    \n
    ${Math.floor(canvY / this.imgHeight)}->${canvH / this.imgHeight}\n
    ${Math.floor(canvX / this.imgWidth)}->${canvW / this.imgWidth}
    `;

    for (let row = Math.floor(canvY / this.imgHeight); row < (canvY + canvH) / this.imgHeight; row++) {
      for (let col = Math.floor(canvX / this.imgWidth); col < (canvX + canvW) / this.imgWidth; col++) {
        const tileNo = this.arr[row][col];
        const x = (tileNo % this.col);
        const y = Math.floor(tileNo / this.col);
        // console.log(tileNo,x,y);
        context.drawImage(
          this.img,
          x * 32, y * 32,
          this.imgWidth, this.imgHeight,

          (col - Math.floor(canvX / this.imgWidth)) * this.imgWidth, (row - Math.floor(canvY / this.imgHeight)) * this.imgHeight,
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
