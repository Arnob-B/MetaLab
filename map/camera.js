export default class Camera {
  constructor(gameWidth , gameHeight, canvasWidth, canvasHeight){
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = 0;
    this.y = 0;

    this.speedx = 22;
    this.speedy = 0;
    this.speedFactor = 32;
    this.update(0,0);
  }
  update(speedx, speedy){
    this.speedx=speedx*this.speedFactor;
    this.speedy=speedy*this.speedFactor;
    document.querySelector("#camera").innerHTML = `x->${this.x},y->${this.y},speedX->${this.speedx},speedY->${this.speedy},speedFactor->${this.speedFactor}`
    if (this.x + this.speedx >= 0 && this.x + this.speedx <= this.gameWidth - this.canvasWidth) {
      if (this.y + this.speedy >= 0 && this.y + this.speedy <= this.gameHeight - this.canvasHeight) {
        this.x = this.x + this.speedx;
        this.y = this.y + this.speedy;
        document.querySelector("#camera").innerHTML = `hit x->${this.x},y->${this.y},speedX->${this.speedx},speedY->${this.speedy},speedFactor->${this.speedFactor}`
      }
    }
  }
}
