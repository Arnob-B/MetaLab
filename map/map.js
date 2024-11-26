export default class map{
  constructor(gameWidth,gameHeight){
    this.gameHeight =gameHeight
    this.gameWidth =gameWidth

    this.img = document.querySelector("#floor");
    this.imgHeight = this.img.height;
    this.imgWidth = this.img.width;
    this.tileMap = [ // x and y
      [0,0],
      [50,0],
      [0,0],
      [0,0],
      [0,0],
    ]
  }
  draw(context){
    this.tileMap.forEach((e)=>{
       context.drawImage(this.img, 0, 0, this.img.width, this.img.height, e[0], e[1], this.imgWidth, this.imgHeight);
    })
  }
  fill(context){
    for (let i = 0; i < this.gameHeight; i += this.imgHeight) {
      for (let j = 0; j < this.gameWidth; j += this.imgWidth) {
        context.drawImage(this.img, 0, 0, this.img.width, this.img.height, j, i,this.imgWidth,this.imgHeight);
      }
    }
  }
}