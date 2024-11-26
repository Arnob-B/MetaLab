export default class Camera {
  constructor(gameWidth , gameHeight, canvasWidth, canvasHeight){
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = 0;
    this.y = 0;

    this.speedx = 0;
    this.speedy = 0;
    this.speedFactor = 32;
    this.update(0,0);
  }
  update(speedx, speedy){
    document.querySelector("#camera").innerHTML =`x->${this.x},y->${this.y},speedX->${this.speedx},speedY->${this.speedy},speedFactor->${this.speedFactor}` 
    this.speedx=speedx * this.speedFactor;
    this.speedy=speedy*this.speedFactor;
    /*
      this.x = this.x + this.speedx * this.speedFactor;
      this.y = this.y + this.speedy * this.speedFactor;
      */
      this.x = Math.min(this.x + this.speedx , this.gameWidth-this.canvasWidth);
      this.y = Math.min(this.y + this.speedy , this.gameHeight-this.canvasHeight);
  }
}