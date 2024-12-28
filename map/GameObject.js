import Vec2 from "./utils/vec2.js";

export default class GameObject {
  // x,y,height, width, renderWidth, renderHeight, tileSize -->> pixel base
  constructor(spriteId = "", x = 0, y = 0, width = 32, height = 32, renderWidth = 32, renderHeight = 32, tileSize = 32) {
    this.pos = new Vec2(x, y)
    this.grid = new Vec2(Math.floor(x / tileSize), Math.floor(y / tileSize));
    this.width = width;
    this.height = height;
    this.renderHeight = renderHeight;
    this.TILESIZE = tileSize
    this.renderWidth = renderWidth;
    this.sprite = document.querySelector(`#${spriteId}`);

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrameX = this.sprite.naturalWidth / this.width;
    this.maxFrameY = this.sprite.naturalHeight / this.height;

    this.triggerEvents = [{
      key : "",
      func : ()=>{}
    }]
    this.currentFrameKey = "";
  }

  changeFrame() {
    this.frameX = (this.frameX + 1) % this.maxFrameX;
    //this.frameY = (this.frameY + 1) % this.maxFrameY;
  }
  frameSet(key,func){
    for(let a of this.triggerEvents){
      if( a.key === key  )
      {
        this.currentFrameKey = key;
        a.func();
        return;
      }
    }
    // adding new key
    if(func === undefined) return;
    this.triggerEvents.push({key:key, func :func});
    this.currentFrameKey = key;
  }

  draw(camera) {
    document.querySelector("#playerLog").innerHTML = `
        ----------------------------------${this.spriteId}
        ----------------------------------
        ${JSON.stringify(this)}
        ----------------------------------
      `
    // Only draw if we have a valid sprite
    if (!this.sprite) return;
    this.frameSet(this.currentFrameKey);
    // Calculate screen position based on camera
    const screenX = this.pos.x - camera.pos.x;
    const screenY = this.pos.y - camera.pos.y;

    // Only draw if object is visible on screen
    if (screenX + this.width < 0 ||
      screenY + this.height < 0 ||
      screenX > camera.canvasWidth ||
      screenY > camera.canvasHeight) {
      return;
    }

    // Draw the current frame
    camera.ctx.drawImage(
      this.sprite,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      screenX,
      screenY,
      this.renderWidth,
      this.renderHeight
    );
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }

  intersects(other) {
    const bounds = this.getBounds();
    const otherBounds = other.getBounds();

    return bounds.left < otherBounds.right &&
      bounds.right > otherBounds.left &&
      bounds.top < otherBounds.bottom &&
      bounds.bottom > otherBounds.top;
  }
}
