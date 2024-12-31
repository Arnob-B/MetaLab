import Input from "./keyInput.js"
import TileSet from "./TileSet.js";
import CollisionMap from "./CollisionMap.js";
import GameObject from "./GameObject.js"
import DynamicOjbects from "./DynamicObject.js";
export default class Game {
  constructor({ canvasWidth, canvasHeight, gameWidth, gameHeight, TILE_SIZE, camera }) {
    console.log("game constructed");
    this.camera = camera;
    this.canvasHeight = canvasHeight // in px
    this.canvasWidth = canvasWidth // in px
    this.gameHeight = gameHeight // in px
    this.gameWidth = gameWidth // in px
    this.TILE_SIZE = TILE_SIZE // in px
    this.floorMap = new TileSet(gameWidth, gameHeight, "#floor2", [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    this.chairMap = new TileSet(gameWidth, gameHeight, "#chair", [ // 1 based
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1, -1, -1, -1, -1, 0, -1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    this.tableMap = new TileSet(gameWidth, gameHeight, "#table", [
      [-1, 0, 1, 0, 1, -1, -1, -1, 0, 1, 0, 1, 0, 1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, 0, 1, 0, 1, -1, -1, -1, 0, 1, 0, 1, 0, 1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [0, 1, -1, -1, -1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    ]);
    this.collisionMap = new CollisionMap(gameWidth, gameHeight, [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    this.input = new Input();

    this.obj = new GameObject("player", 2 * this.TILE_SIZE, 2 * this.TILE_SIZE, 64, 64, 32, 32);
    this.obj2 = new DynamicOjbects("player", 32, 32, 64, 64, 32, 32);

    this.obj.eventSet("thrust", function() {
      this.frameY = 5;
      this.maxFrameX = 8;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
      this.eventSet("thrust"); // loooper
    }.bind(this.obj));
    this.obj.eventSet("unthrust", function() {
      let ind = this.currentEvents.arr.indexOf("thrust");
      while (ind != -1) {
        this.currentEvents.arr.splice(ind, 1);
        ind = this.currentEvents.arr.indexOf("thrust");
      }
    }.bind(this.obj));

    this.obj2.eventSet("moveRight", function() {
      if (this.speed.x == 0) this.speed.x += 32;
      this.maxFrameX = 9;
      this.frameY = 11;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj2));
    this.obj2.eventSet("moveUp", function(obj) {
      if (this.speed.y == 0) this.speed.y -= 32;
      const nextY = this.pos.y + this.speed.y;
      const nextX = this.pos.x + this.speed.x;
      if (nextY == obj.pos.y && nextX == obj.pos.x) { obj.eventSet("thrust"); }
      this.maxFrameX = 9;
      this.frameY = 8;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj2, this.obj));
    this.obj2.eventSet("moveLeft", function() {
      if (this.speed.x == 0) this.speed.x -= 32;
      this.maxFrameX = 9;
      this.frameY = 9;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj2));
    this.obj2.eventSet("moveDown", function(obj) {
      if (this.speed.y == 0) this.speed.y += 32;
      const nextY = this.pos.y + this.speed.y;
      const nextX = this.pos.x + this.speed.x;
      if (nextY == obj.pos.y && nextX == obj.pos.x) { obj.eventSet("unthrust"); }
      this.maxFrameX = 9;
      this.frameY = 10;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj2, this.obj));
  }
  drawGrid(size) {
    for (let row = 0; row < this.gameWidth; row += size) {
      for (let col = 0; col < this.gameWidth; col += size) {
        this.camera.ctx.strokeRect(col, row, col + size, row + size);
      }
    }
  }
  render() {
    this.camera.checkUpdate(this.input.getKey);
    this.floorMap.draw(this.camera);
    this.chairMap.draw(this.camera);
    this.tableMap.draw(this.camera);
    this.drawGrid(this.TILE_SIZE);
    let flag = 1;
    for (let a of this.input.getKey) {
      if (a === 'a') {
        this.obj2.eventSet("moveLeft");
        flag = 0;
      }
      if (a === 'd') {
        this.obj2.eventSet("moveRight");
        flag = 0;
      }
      if (a === 'w') {
        this.obj2.eventSet("moveUp");
        flag = 0;
      }
      if (a === 's') {
        this.obj2.eventSet("moveDown");
        flag = 0;
      }
    }
    if (flag) {
      this.obj2.speed.x = 0;
      this.obj2.speed.y = 0;
    }
    this.obj2.checkEvent();
    this.obj.checkEvent();
    this.obj2.log();
    //this.obj2.helperGrid(this.camera);
    this.obj.draw(this.camera);
    this.obj2.draw(this.camera, this.collisionMap.arr);
  }
}

