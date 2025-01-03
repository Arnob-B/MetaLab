import GameObject from "../lib/GameObject.js";

export default class Monitor {
  constructor(x, y) {
    this.object = new GameObject("mon", x * 32, y * 32, 128, 128, 32, 32, 32);
    this.object.frameX = 0;
    this.object.frameY = 0;
    this.fireAnimation = 0;
    this.isLocked = 0;
    this.lockerId = 0;
    this.alert = 0;
    this.textArea = document.createElement("textarea");
    this.textArea.hidden = true;
    document.querySelector("#text-container").appendChild(this.textArea);
  }
  toggleLock(userId, keys) {
    let ind = keys.findIndex(e => e === 'j')
    if (ind != -1) {
      if (this.isLocked) {
        if (this.lockerId === userId) {
          console.log("unlocked");
          this.isLocked = 0;
        }
      }
      else {
        console.log("locked");
        this.lockerId = userId;
        this.isLocked = 1;
      }
    }
  }
  animate() {
    this.object.frameY = 1;
    this.object.maxFrameX = 8;
    this.object.frameX = (this.object.frameX + 1) % this.object.maxFrameX;
  }
  isTouched(hero, keys) { // grid system
    if (hero.obj.grid.x == this.object.grid.x && (hero.obj.grid.y == this.object.grid.y + 1)) {
      this.fireAnimation = 1;
      this.toggleLock(hero.userId, keys);
      if (hero.userId === this.lockerId) {
        this.textArea.hidden = false;
        this.textArea.disabled = false;
      }
      else {
        this.textArea.hidden = false;
        this.textArea.disabled = true;
      }
    }
    else {
      this.fireAnimation = 0;
      this.textArea.hidden = true;
    }
  }
  render(camera) {
    if (this.fireAnimation == 1 || this.isLocked) {
      //this.object.eventSet("boom", this.animate.bind(this));
      this.animate();
    }
    else {
      this.object.frameY = 0;
      this.object.frameX = 0;
    }
    //this.object.checkEvent();
    this.object.draw(camera);
  }
}
