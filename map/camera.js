export default class Camera {
  constructor({ gameWidth, gameHeight, canvasWidth, canvasHeight, context }) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.height = canvasWidth
    this.width = canvasHeight
    this.ctx = context;
    this.x = 0;
    this.y = 0;

    this.speedx = 0;
    this.speedy = 0;
    this.speedFactor = 32;
    this.update(0, 0);
  }
  update(speedx, speedy) {
    this.speedx = speedx * this.speedFactor;
    this.speedy = speedy * this.speedFactor;
    document.querySelector("#camera").innerHTML = `x->${this.x},y->${this.y},speedX->${this.speedx},speedY->${this.speedy},speedFactor->${this.speedFactor}`
    if (this.x + this.speedx >= 0 && this.x + this.speedx <= this.gameWidth - this.width) {
      if (this.y + this.speedy >= 0 && this.y + this.speedy <= this.gameHeight - this.height) {
        this.x = this.x + this.speedx;
        this.y = this.y + this.speedy;
        document.querySelector("#camera").innerHTML = `hit x->${this.x},y->${this.y},speedX->${this.speedx},speedY->${this.speedy},speedFactor->${this.speedFactor}`
      }
    }
  }
  checkUpdate(keys) {
    for (let a of keys) {
      switch (a) {
        case "ArrowUp":
          this.update(0, -1);
          break;
        case "ArrowDown":
          this.update(0, 1);
          break;
        case "ArrowRight":
          this.update(1, 0);
          break;
        case "ArrowLeft":
          this.update(-1, 0);
          break;
      }
    }
  }
}
