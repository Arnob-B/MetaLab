import TileSet from "./TileSet.js";
import Vec2 from "./utils/vec2.js";

export default class Camera {
  constructor({ gameWidth, gameHeight, canvasWidth, canvasHeight, context, tileSize = 32 }) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.height = canvasWidth
    this.width = canvasHeight
    this.ctx = context;
    this.pos = new Vec2(0, 0);
    this.TILE_SIZE = tileSize;
    this.grid = new Vec2(Math.floor(0 / this.TILE_SIZE), Math.floor(0 / this.TILE_SIZE));

    this.speed = new Vec2(0, 0); // pixel based
    this.speedFactor = 32; // helps for grid conversion
    this.update(0, 0);
  }
  update(speedx, speedy) {
    this.speed.x = speedx * this.speedFactor;
    this.speed.y = speedy * this.speedFactor;
    document.querySelector("#camera").innerHTML = `
        hit ${JSON.stringify(this)}
      `
    // calculation based on pixels
    if (this.pos.x + this.speed.x >= 0 && this.pos.x + this.speed.x <= this.gameWidth - this.width) {
      if (this.pos.y + this.speed.y >= 0 && this.pos.y + this.speed.y <= this.gameHeight - this.height) {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
        this.grid.update(Math.floor(this.pos.x / this.TILE_SIZE), Math.floor(this.pos.y / this.TILE_SIZE));
        document.querySelector("#camera").innerHTML = `
        hit ${JSON.stringify(this)}
      `
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
