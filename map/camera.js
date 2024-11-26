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
    this.speedFactor = 20;
  }
  update(speedx, speedy){
    this.speedx=speedx;
    this.speedy=speedy;
    /*
      this.x = this.x + this.speedx * this.speedFactor;
      this.y = this.y + this.speedy * this.speedFactor;
      */
      this.x = Math.min(this.x + this.speedx * this.speedFactor, this.gameWidth-this.canvasWidth);
      this.y = Math.min(this.y + this.speedy * this.speedFactor, this.gameHeight-this.canvasHeight);
  }
}