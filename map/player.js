import map from "./map.js"
export default class Player {
  constructor(canvasHeight, canvasWidth) {
    // 32 x 32 player
    this.width = 32;
    this.height = 32;

    // placing player in the middle of the screen
    // this.x = canvasWidth/2 - this.width/2;
    this.x = 2;
    this.y = 1;
    // this.y = canvasHeight/2 - this.height/2;

    // for spritesheet animations
    this.frameX = 1;
    this.frameY = 5;

    // player sprite
    this.img = document.getElementById("player");
  }

  update(x, y) {
    this.frameY = (this.frameY + 1) % 5;
    this.frameX = (this.frameX + 1) % 5;
    this.x += x;
    this.y += y;
    document.querySelector("#playerLog").innerHTML = ` x->${this.x},y->${this.y}`
  }

  draw(ctx, camera) {
    //console.log("draw");

    // drawImage(sourceimg, sourcx, source y, source width , source heigh, canvx, canvy, dispwidth, dispwidth)
    if (((this.x * this.width >= camera.x) && (this.x * this.width <= camera.x + camera.canvasWidth))
      &&
      ((this.y * this.height >= camera.y) && (this.y * this.height <= camera.y + camera.canvasHeight))
    ) {
      //console.log("here");
      ctx.drawImage(this.img, this.frameX * 64, this.frameY * 64, 64, 64, this.x * this.width - camera.x, this.y * this.height - camera.y, 64, 64);
    }
  }

}
