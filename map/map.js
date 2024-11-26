export default class map{
  constructor(gameWidth,gameHeight){
    this.gameHeight =gameHeight
    this.gameWidth =gameWidth

    this.img = document.querySelector("#floor2");
    console.log(this.img.height,this.img.width)

    this.img2 = document.querySelector("#chair");

    this.img2Height = 32;
    this.img2Width = 32;

    this.row2 = this.img2.height/32;
    this.col2 = this.img2.width/32;


    this.img3 = document.querySelector("#table");

    this.img3Height = 32;
    this.img3Width = 32;

    this.row3 = this.img3.height/32;
    this.col3 = this.img3.width/32;

    this.imgHeight = 32;
    this.imgWidth = 32;

    this.row = this.img.height/32;
    this.col = this.img.width/32;

    this.arr = [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
  }
  draw(context,canvX,canvY,canvW,canvH){
    //drawImage(img, imgx, imgy, imgw, imgh, dx, dy, dw, dh)
    //row , height -> px,px
    document.querySelector("#canvasPops").innerHTML = `${canvX},${canvY},${canvW},${canvH},${this.row},${this.col}`;
    for(let row = Math.floor(canvY/this.row);row<10;row++){ //
      for (let col = Math.floor(canvX/this.col); col<15; col++) {
        const tileNo = this.arr[row][col];
        const x = (tileNo%this.col) ;
        const y = Math.floor(tileNo/this.col);
        // console.log(tileNo,x,y);
        context.drawImage(
          this.img,
          x*32,y*32,
          this.imgWidth,this.imgHeight,

          (col - Math.floor(canvX/this.col) )* this.imgWidth,(row-Math.floor(canvY/this.row))* this.imgHeight,
          this.imgWidth,this.imgHeight);
      }
    }
  }
  fill(context){
    for (let i = 0; i < this.gameHeight; i += this.imgHeight) {
      for (let j = 0; j < this.gameWidth; j += this.imgWidth) {
        context.drawImage(this.img, 0, 0, this.img.width, this.img.height, j, i,this.imgWidth,this.imgHeight);
      }
    }
  }
}