export default class GameObject {
    constructor(x = 0, y = 0, width = 32, height = 32, spriteId = "") {
      this.x = x * 32; // Convert grid position to pixels
      this.y = y * 32;
      this.width = width;
      this.height = height;
      this.sprite = document.querySelector(`#${spriteId}`);
      
      // Animation properties
      this.frameX = 0;
      this.frameY = 0;
      this.animationTimer = 0;
      this.animationInterval = 100; // Time between frame changes in ms
      this.lastUpdate = Date.now();
      
      // Add boundary properties
      this.maxX = 14; // GAME_WIDTH - 1
      this.maxY = 9;  // GAME_HEIGHT - 1
    }
  
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
  
    draw(context, camera) {
      // Only draw if we have a valid sprite
      if (!this.sprite) return;
  
      // Calculate screen position based on camera
      const screenX = this.x - camera.x;
      const screenY = this.y - camera.y;
  
      // Only draw if object is visible on screen
      if (screenX + this.width < 0 || 
          screenY + this.height < 0 || 
          screenX > camera.canvasWidth || 
          screenY > camera.canvasHeight) {
        return;
      }
  
      // Draw the current frame
      context.drawImage(
        this.sprite,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        screenX,
        screenY,
        this.width,
        this.height
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