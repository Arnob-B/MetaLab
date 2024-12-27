export default class Input {
  constructor() {
    this.keys = [];
    this.listenerFunctions = [{}];
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") this.addKey(e.key);
      if (e.key === "ArrowDown") this.addKey(e.key);
      if (e.key === "ArrowRight") this.addKey(e.key);
      if (e.key === "ArrowLeft") this.addKey(e.key);
      //logging
      document.querySelector("#inputLog").innerHTML = `${this.keys}`;
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp") this.delKey(e.key);
      if (e.key === "ArrowDown") this.delKey(e.key);
      if (e.key === "ArrowRight") this.delKey(e.key);
      if (e.key === "ArrowLeft") this.delKey(e.key);
      //logging
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
