export default class Camera {
  constructor(gameWidth , gameHeight){
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.x = 0;
    this.y = 0;
    this.height = 700;
    this.width = 600;
    this.speedx = 0;
    this.speedy = 0;
    this.speedFactor = 7;
  }
  update(speedx, speedy){
    this.speedx=speedx;
    this.speedy=speedy;
    this.x += this.speedx * this.speedFactor;
    this.y += this.speedy * this.speedFactor;
  }
}