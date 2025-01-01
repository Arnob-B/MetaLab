import DynamicOjbects from "../lib/DynamicObject.js";
import GameObject from "../lib/GameObject.js";

export default class Hero {
  constructor(x, y, colMap) {
    this.obj = new DynamicOjbects("player", x * 32, y * 32, 64, 64, 32, 32, 32);
    this.colmap = colMap;
  }
  moveUp() {
    if (this.obj.speed.y == 0) this.obj.speed.y -= 32;
    this.obj.maxFrameX = 9;
    this.obj.frameY = 8;
    this.obj.frameX = (this.obj.frameX + 1) % this.obj.maxFrameX;
  }
  moveDown() {
    if (this.obj.speed.y == 0) this.obj.speed.y += 32;
    this.obj.maxFrameX = 9;
    this.obj.frameY = 10;
    this.obj.frameX = (this.obj.frameX + 1) % this.obj.maxFrameX;
  }
  moveLeft() {
    if (this.obj.speed.x == 0) this.obj.speed.x -= 32;
    this.obj.maxFrameX = 9;
    this.obj.frameY = 9;
    this.obj.frameX = (this.obj.frameX + 1) % this.obj.maxFrameX;
  }
  moveRight() {
    if (this.obj.speed.x == 0) this.obj.speed.x += 32;
    this.obj.maxFrameX = 9;
    this.obj.frameY = 11;
    this.obj.frameX = (this.obj.frameX + 1) % this.obj.maxFrameX;
  }
  render(camera, collisionMap) {
    this.obj.log();
    this.obj.move(this.colmap);
    this.obj.draw(camera, collisionMap);
  }

};
