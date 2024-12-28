import GameObject from "./GameObject.js";
import Vec2 from "./utils/vec2.js";

export default class DynamicOjbects extends GameObject {
  constructor(spriteId = "", x = 0, y = 0, width = 32, height = 32, renderWidth = 32, renderHeight = 32, tileSize = 32) {
    super(spriteId, x, y, width, height, renderWidth, renderHeight, tileSize);
    this.frameX = 0;
    this.frameY = 0;
    this.guides = [];
    this.guides.push(new GameObject("rgbStrip",this.pos.x+32, this.pos.y ,32, 32,32, 32 ));
    this.guides.push(new GameObject("rgbStrip",this.pos.x-32, this.pos.y ,32, 32,32, 32 ));
    this.guides.push(new GameObject("rgbStrip",this.pos.x, this.pos.y-32,32, 32,32, 32 ));
    this.guides.push(new GameObject("rgbStrip",this.pos.x, this.pos.y+32,32, 32,32, 32 ));
    this.speed = new Vec2(0,0);
  }
  move(x = 0, y = 0){
    this.x += this.x + x;
    this.y += this.y + x;
    for(let a of this.guides) a.draw(camera);
  }
  helperGrid(camera){
    this.guides[0].pos.x= this.pos.x+32;
    this.guides[0].pos.y= this.pos.y;
    this.guides[1].pos.x= this.pos.x+32;
    this.guides[1].pos.y= this.pos.y;
    this.guides[2].pos.x= this.pos.x;
    this.guides[2].pos.y= this.pos.y-32;
    this.guides[3].pos.x= this.pos.x;
    this.guides[3].pos.y= this.pos.y+32;
    for(let a of this.guides) {
      a.draw(camera);
    }
  }
  draw(camera){
    this.move();
    super.draw(camera);
    this.helperGrid.call(this,camera);
  };
}
