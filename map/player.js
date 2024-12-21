import GameObject from "./GameObject.js";
import Game from "./game.js";
export default class Player extends GameObject {
    constructor(canvasHeight, canvasWidth) {
        super(2, 1, 64, 64, "player");
        
        // Player specific properties
        this.gridX = 2;        // Current grid X position
        this.gridY = 1;        // Current grid Y position
        this.moveSpeed = 1;    // Grid cells per move
        this.facingDirection = "down"; // Track player direction
        // Animation frame mappings for each direction
        this.animations = {
            down:  { startRow: 0, frames: 5 },
            left:  { startRow: 1, frames: 5 },
            right: { startRow: 2, frames: 5 },
            up:    { startRow: 3, frames: 5 },
            idle:  { startRow: 0, frames: 1 }
        };
        
        // Set initial animation state
        this.frameY = this.animations.down.startRow;
    }

    // Handle player movement and update animations
    update(deltaX, deltaY) {
        // Update grid position
        if (deltaX !== 0 || deltaY !== 0) {
            this.gridX += deltaX * this.moveSpeed;
            this.gridY += deltaY * this.moveSpeed;
            
            // Update facing direction based on movement
            if (deltaX > 0) this.facingDirection = "right";
            else if (deltaX < 0) this.facingDirection = "left";
            else if (deltaY > 0) this.facingDirection = "down";
            else if (deltaY < 0) this.facingDirection = "up";
            
            // Set animation row based on direction
            this.frameY = this.animations[this.facingDirection].startRow;
            
            // Call parent update with grid position and animation frames
            super.update(
                this.gridX, 
                this.gridY, 
                this.animations[this.facingDirection].frames,
                1
            );
        } else {
            // If not moving, show idle animation
            this.frameY = this.animations.idle.startRow;
            super.update(this.gridX, this.gridY, 1, 1);
        }
    }

    // Optional: Add collision handling
    handleCollision(gameObjects) {
        for (let obj of gameObjects) {
            if (this.intersects(obj)) {
                // Handle collision response here
                return true;
            }
        }
        return false;
    }

    // Override draw to add any player-specific rendering
    draw(context, camera) {
        super.draw(context, camera);
        
        // Add any additional player-specific rendering here
        // For example, drawing player name, health bar, etc.
    }
}