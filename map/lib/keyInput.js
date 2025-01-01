export default class Input {
  constructor() {
    this.validKeys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "h", "l", "j", "k", "w", "a", "s", "d"];
    this.keys = [];
    document.addEventListener("keydown", (e) => {
      if (this.validKeys.findIndex((a) => a === e.key) != -1) this.addKey(e.key);
      document.querySelector("#inputLog").innerHTML = `${this.keys}`;
    });
    document.addEventListener("keyup", (e) => {
      if (this.validKeys.findIndex((a) => a === e.key) != -1) this.delKey(e.key);
      document.querySelector("#inputLog").innerHTML = `${this.keys}`;
    });
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
