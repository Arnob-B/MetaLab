import Input from "../lib/keyInput.js"
import TileSet from "../lib/TileSet.js";
import CollisionMap from "../lib/CollisionMap.js";
import GameObject from "../lib/GameObject.js"
import DynamicOjbects from "../lib/DynamicObject.js";
import Monitor from "./monitor.js";
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

    this.obj2 = new DynamicOjbects("player", 32, 32, 64, 64, 32, 32);
    this.fire = new GameObject("fire", -1 * this.TILE_SIZE, -1 * this.TILE_SIZE, 128, 128, 32, 32);

    this.fire.eventSet("boom", function() {
      this.frameY = 0;
      this.maxFrameX = 7;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
      this.eventSet("boom");
    }.bind(this.fire));

    this.obj2.eventSet("moveRight", function() {
      if (this.speed.x == 0) this.speed.x += 32;
      this.maxFrameX = 9;
      this.frameY = 11;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj2));
    this.obj2.eventSet("moveUp", function() {
      if (this.speed.y == 0) this.speed.y -= 32;
      this.maxFrameX = 9;
      this.frameY = 8;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj2));
    this.obj2.eventSet("moveLeft", function() {
      if (this.speed.x == 0) this.speed.x -= 32;
      this.maxFrameX = 9;
      this.frameY = 9;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj2));
    this.obj2.eventSet("moveDown", function() {
      if (this.speed.y == 0) this.speed.y += 32;
      this.maxFrameX = 9;
      this.frameY = 10;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj2));
    this.mon = new Monitor(2, 3);
    this.collisionMap.setCol(2, 3);
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
      if (a === 'h') {
        //this.fire.pos = this.obj2.pos;
        this.fire.pos.update(this.obj2.pos.x, this.obj2.pos.y);
        if (this.fire.currentEvents.arr.find(e => e === "boom"));
        else this.fire.eventSet("boom");

        flag = 0;
      }
    }
    if (flag) {
      this.obj2.speed.x = 0;
      this.obj2.speed.y = 0;
    }
    this.obj2.checkEvent();
    this.obj2.log();
    this.obj2.draw(this.camera, this.collisionMap.arr);
    this.fire.checkEvent();
    this.fire.draw(this.camera);
    this.fire.log();
    this.mon.isTouched(this.obj2.grid.x, this.obj2.grid.y);
    this.mon.render(this.camera)
  }
}

