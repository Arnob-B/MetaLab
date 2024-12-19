export default class Player{
    constructor(canvasHeight, canvasWidth){
        // 32 x 32 player
        this.width = 32;
        this.height = 32;

        // placing player in the middle of the screen
        // this.x = canvasWidth/2 - this.width/2;
        this.x = 0;
        this.y=0;
        // this.y = canvasHeight/2 - this.height/2;

        // for spritesheet animations
        this.frameX = 1;
        this.frameY = 2;

        // player sprite
        this.img = document.getElementById("player");
    }

    update(){
        console.log("update");
    }

    draw(ctx){
        console.log("draw");
        ctx.drawImage(this.img, this.frameX * 64, this.frameY * 64, 64, 64, this.x, this.y, 32, 32);
    }

}
