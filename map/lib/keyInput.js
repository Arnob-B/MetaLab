export default class Input {
  constructor() {
    this.validKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "h", "l", "j", "k", "w", "a", "s", "d"];
    this.keys = [];
    this.keyDown = function(e) {
      if (this.validKeys.findIndex((a) => a === e.key) != -1) this.addKey(e.key);
      document.querySelector("#inputLog").innerHTML = `${this.keys}`;
    }.bind(this);
    this.keyUp = function(e) {
      if (this.validKeys.findIndex((a) => a === e.key) != -1) this.delKey(e.key);
      document.querySelector("#inputLog").innerHTML = `${this.keys}`;
    }.bind(this);
    this.add();
    document.querySelector("#choice").addEventListener("change", function(event) {
      if (event.target.value === 'canvas') {
        this.add();
      }
      else {
        this.remove();
      }
    }.bind(this)
    )

  }
  remove() {
    document.removeEventListener("keyup", this.keyUp);
    document.removeEventListener("keydown", this.keyDown);
  }
  add() {
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  }
  delKey(key) {
    const ind = this.keys.findIndex((e) => e === key);
    if (ind == -1) return;
    this.keys.splice(ind, 1);
  }
  addKey(key) {
    this.delKey(key);
    this.keys.unshift(key);
  }
  get getKey() {
    return this.keys;
  }
}
