export default class Player{
    constructor(canvasHeight, canvasWidth){
        // 32 x 32 player
        this.width = 32;
        this.height = 32;

        // placing player in the middle of the screen
        // this.x = canvasWidth/2 - this.width/2;
        this.x=2;
        this.y=1;
        // this.y = canvasHeight/2 - this.height/2;

        // for spritesheet animations
        this.frameX = 1;
        this.frameY = 2;

        // player sprite
        this.img = document.getElementById("player");
    }

    update(x, y){
      this.x = x;
      this.y = y;
        document.querySelector("#playerLog").innerHTML = ` x->${this.x},y->${this.y}`
    }

    draw(ctx){
        console.log("draw");
        ctx.drawImage(this.img, this.frameX * 64, this.frameY * 64, 64, 64, this.x*this.width, this.y*this.height, 32, 32);
    }

}
