import GameObject from "./GameObject.js";

export default class StaticObject extends GameObject {
  constructor(spriteId = "", x = 0, y = 0, width = 32, height = 32, renderWidth = 32, renderHeight = 32) {
    super(spriteId, x, y, width, height, renderWidth, renderHeight);
  }
}
