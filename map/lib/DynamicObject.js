import GameObject from "./GameObject.js";
import Vec2 from "../utils/vec2.js";

export default class DynamicOjbects extends GameObject {
  constructor(spriteId = "", x = 0, y = 0, width = 32, height = 32, renderWidth = 32, renderHeight = 32, tileSize = 32) {
    super(spriteId, x, y, width, height, renderWidth, renderHeight, tileSize);
    this.frameX = 0;
    this.frameY = 0;
    /*
    this.guides = [];
    this.guides.push(new GameObject("rgbStrip", this.pos.x + 32, this.pos.y, 32, 32, 32, 32));
    this.guides.push(new GameObject("rgbStrip", this.pos.x - 32, this.pos.y, 32, 32, 32, 32));
    this.guides.push(new GameObject("rgbStrip", this.pos.x, this.pos.y - 32, 32, 32, 32, 32));
    this.guides.push(new GameObject("rgbStrip", this.pos.x, this.pos.y + 32, 32, 32, 32, 32));
    */
    this.speed = new Vec2(0, 0);
  }
  changeVel(delX, delY) {
    this.speed.x += delX;
    this.speed.y += delY;
  }
  /*
    helperGrid(camera) {
      this.guides[0].pos.x = this.pos.x + 32;
      this.guides[0].pos.y = this.pos.y;
      this.guides[1].pos.x = this.pos.x - 32;
      this.guides[1].pos.y = this.pos.y;
      this.guides[2].pos.x = this.pos.x;
      this.guides[2].pos.y = this.pos.y - 32;
      this.guides[3].pos.x = this.pos.x;
      this.guides[3].pos.y = this.pos.y + 32;
      for (let a of this.guides) {
        a.draw(camera);
      }
    }
    */
  move(collisionMap) {
    //collision check
    const newGrid = new Vec2(this.grid.x + (this.speed.x / this.TILESIZE), this.grid.y + (this.speed.y / this.TILESIZE));
    if (collisionMap[newGrid.y] === undefined || collisionMap[newGrid.y][newGrid.x] === undefined || collisionMap[newGrid.y][newGrid.x] == 1)
      return; // collision occured
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    const newGridX = Math.floor(this.pos.x / this.TILESIZE);
    const newGridY = Math.floor(this.pos.y / this.TILESIZE);
    if (newGridX != this.grid.x || newGridY != this.grid.y) {
      // send to server about position
      this.grid.x = newGridX;
      this.grid.y = newGridY;
      return true;
    }
    else return false;
  }
  draw(camera, collisionMap) {
    // validity checks
    super.draw(camera);
    //this.helperGrid(camera);
  };
}
