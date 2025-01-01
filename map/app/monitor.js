import GameObject from "../lib/GameObject.js";

export default class Monitor {
  constructor(x, y) {
    this.object = new GameObject("fire", x * 32, y * 32, 128, 128, 32, 32, 32);
    this.fireAnimation = 0;
    this.alert = 0;
  }
  animate() {
    this.object.frameY = 0;
    this.object.maxFrameX = 7;
    this.object.frameX = (this.object.frameX + 1) % this.object.maxFrameX;
    //document.querySelector('#textbox').removeAttribute("hidden", "")
  }
  isTouched(x, y) { // grid system
    if (x == this.object.grid.x && (y == this.object.grid.y + 1)) {
      this.fireAnimation = 1;
    }
    else {
      this.fireAnimation = 0;
      document.querySelector('#textbox').setAttribute("hidden", "")
    }
  }
  render(camera) {
    if (this.fireAnimation == 1) {
      this.object.eventSet("boom", this.animate.bind(this));
    }
    this.object.checkEvent();
    this.object.draw(camera);
  }
}
