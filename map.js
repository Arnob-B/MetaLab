export default class map{
  constructor(){
    this.img = document.querySelector("#woodTile");
    this.imgHeight = this.img.height;
    this.imgWidth = this.img.width;
    this.tileMap = [ // x and y
      [0,0],
      [3,4],
      [0,0],
      [0,0],
      [0,0],
    ]
  }
  draw(context){
    console.log("here" ,context);
    this.tileMap.forEach((e)=>{
       context.drawImage(this.img, 0, 0, this.img.width, this.img.height, e[0], e[1], this.imgWidth, this.imgHeight);
    })
  }
}