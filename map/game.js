import map from "./map.js";
import Camera from "./camera.js";
export default class Game{
  constructor( canvasWidth,canvasHeight, gameWidth, gameHeight){
    console.log("game constructed");
    this.canvasHeight =canvasHeight
    this.canvasWidth =canvasWidth
    this.gameHeight =gameHeight
    this.gameWidth =gameWidth
    this.tableMap = new map(gameWidth, gameHeight);
    this.camera = new Camera(gameWidth,gameHeight, canvasWidth,canvasHeight);



  document.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "ArrowUp") this.camera.update(0, -1);
    if (e.key === "ArrowDown") this.camera.update(0, 1);
    if (e.key === "ArrowRight") this.camera.update(1, 0);
    if (e.key === "ArrowLeft") this.camera.update(-1, 0);
  })

  }
  drawGrid(ctx,size){
    for (let row = 0; row < this.gameWidth; row += size) {
      for (let col = 0; col < this.gameWidth; col += size){
        ctx.strokeRect(col, row,col + size, row + size );
      }
    }
  }
  render(ctx){
    // this.tableMap.fill(ctx);
    /*
    ctx.drawImage(
      this.tableMap.img,
      this.camera.x,
      this.camera.y,
      this.canvasWidth,
      this.canvasHeight,
      0,
      0,
      this.gameWidth,
      this.gameHeight
    );
    */
    this.tableMap.draw(ctx, this.camera.x, this.camera.y, this.canvasWidth, this.canvasHeight);
    this.tableMap.draw2(ctx, this.camera.x, this.camera.y, this.canvasWidth, this.canvasHeight);
    this.tableMap.draw3(ctx, this.camera.x, this.camera.y, this.canvasWidth, this.canvasHeight);
    // this.drawGrid(ctx, 32);
  }
}