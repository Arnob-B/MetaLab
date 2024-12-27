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
    this.maxFrameX = this.sprite.naturalWidth / this.width;
    this.maxFrameY = this.sprite.naturalHeight / this.height;

    // Animation properties
    this.i = 1;
    this.frameX = 0;
    this.frameY = 0;
    this.animationTimer = 0;
    this.animationInterval = 100; // Time between frame changes in ms
    this.lastUpdate = Date.now();

    // Add boundary properties
    //this.maxX = 14; // GAME_WIDTH - 1
    //this.maxY = 9;  // GAME_HEIGHT - 1
  }

  changeFrame() {
    this.frameX = (this.frameX + 1) % this.maxFrameX;
    this.frameY = (this.frameY + 1) % this.maxFrameY;
  }
  /*
  update(x, y, maxFrameX = 1, maxFrameY = 1) {
    // Boundary checking
    const newX = Math.max(0, Math.min(x, this.maxX));
    const newY = Math.max(0, Math.min(y, this.maxY));


    // Update position
    this.x = newX * 32;
    this.y = newY * 32;

    // Update animation frame
    const currentTime = Date.now();
    this.animationTimer += currentTime - this.lastUpdate;
    this.lastUpdate = currentTime;

    if (this.animationTimer >= this.animationInterval) {
      // Reset timer
      this.animationTimer = 0;

      // Update frame
      this.frameX = (this.frameX + 1) % maxFrameX;

      // If we've completed a row, move to next row
      if (this.frameX === 0) {
        this.frameY = (this.frameY + 1) % maxFrameY;
      }
    }
    return { x: newX, y: newY }; // Return the actual position after boundary checking
  }
  */

  draw(camera) {
    // Only draw if we have a valid sprite
    if (!this.sprite) return;
    this.changeFrame();

    // Calculate screen position based on camera
    const screenX = this.grid.x - camera.x;
    const screenY = this.grid.y - camera.y;

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
