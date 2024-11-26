import map from "./map.js";
export default class Game{
  constructor( canvasWidth,canvasHeight){
    console.log("game constructed");
    this.canvasHeight =canvasHeight
    this.canvasWidth =canvasWidth
    this.tableMap = new map();
  }
  render(ctx){
    this.tableMap.draw(ctx);
  }
}