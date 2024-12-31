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
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);
    this.input = new Input();

    this.obj = new GameObject("player", 0, 0, 64, 64, 32, 32);
    this.obj2 = new DynamicOjbects("player", 32, 32, 64, 64, 32, 32);
    const func = function() {
      this.frameY = 20;
      this.maxFrameX = 6;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj);
    this.obj.eventSet("fall", func);
    this.obj.eventSet("jump", function() {
      if (this.currentFrameKey === "jump" && this.frameX === 0) this.currentFrameKey = "";
      this.frameY = 2;
      this.maxFrameX = 7;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj));
    this.obj.eventSet("thrust", function() {
      this.frameY = 5;
      this.maxFrameX = 8;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj));
    this.obj2.eventSet("moveRight", function() {
      if (this.speed.x == 0) this.speed.x += 32;
    }.bind(this.obj2));
    this.obj2.eventSet("moveUp", function() {
      if (this.speed.y == 0) this.speed.y -= 32;
    }.bind(this.obj2));
    this.obj2.eventSet("moveLeft", function() {
      if (this.speed.x == 0) this.speed.x -= 32;
    }.bind(this.obj2));
    this.obj2.eventSet("moveDown", function() {
      if (this.speed.y == 0) this.speed.y += 32;
    }.bind(this.obj2));


  }
  drawGrid(ctx, size) {
    for (let row = 0; row < this.gameWidth; row += size) {
      for (let col = 0; col < this.gameWidth; col += size) {
        ctx.strokeRect(col, row, col + size, row + size);
      }
    }
  }
  render(ctx) {
    this.camera.checkUpdate(this.input.getKey);
    this.floorMap.draw(this.camera);
    this.drawGrid(ctx, 32);
    let flag = 1;
    for (let a of this.input.getKey) {
      if (a === 'h') {
        this.obj2.eventSet("moveLeft");
        flag = 0;
        break;
      }
      if (a === 'l') {
        this.obj2.eventSet("moveRight");
        flag = 0;
        break;
      }
      if (a === 'k') {
        this.obj2.eventSet("moveUp");
        flag = 0;
        break;
      }
      if (a === 'j') {
        this.obj2.eventSet("moveDown");
        flag = 0;
        break;
      }
    }
    if (flag) {
      this.obj2.speed.x = 0;
      this.obj2.speed.y = 0;
    }
    //this.obj2.helperGrid(this.camera);
    this.obj.draw(this.camera);
    this.obj2.draw(this.camera, this.collisionMap.arr);
    this.obj2.log();
    this.chairMap.draw(this.camera);
    this.tableMap.draw(this.camera);
  }
}

