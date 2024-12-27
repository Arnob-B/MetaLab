import Input from "./keyInput.js"
import TileSet from "./TileSet.js";
import CollisionMap from "./CollisionMap.js";
import GameObject from "./GameObject.js"
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

    this.obj = new GameObject("player",0,0, 64,64,32,32);
    const func=function(){
      this.frameY = 20;
      this.maxFrameX = 6;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj);
    this.obj.frameSet("fall",func);
    this.obj.frameSet("jump",function(){
      this.frameY = 2;
      this.maxFrameX = 7;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj));
    this.obj.frameSet("thrust",function(){
      this.frameY = 5;
      this.maxFrameX = 8;
      this.frameX = (this.frameX + 1) % this.maxFrameX;
    }.bind(this.obj));


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
    this.chairMap.draw(this.camera);
    this.tableMap.draw(this.camera);
    for (let a of this.input.getKey) {
      if (a === 'h') {this.obj.frameSet("fall");break;}
      if (a === 'l') this.obj.frameSet("jump");
    }
    this.obj.draw(this.camera);
    this.drawGrid(ctx, 32);
  }
}
