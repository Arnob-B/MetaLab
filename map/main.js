import Game from "./game.js";
import specs from "./specs.js";
import vec2 from "./vec2.js";
const TILE_SIZE = specs.TILE_SIZE;
const gameWidth = specs.TILE_SIZE * specs.GAME_WIDTH;
const gameHeight = specs.TILE_SIZE * specs.GAME_HEIGHT;
window.addEventListener("load", () => {
  const canvas = document.querySelector("#mainCanvas");
  const canvasWidth = canvas.width = TILE_SIZE * specs.CANVAS_WIDTH;
  const canvasHeight = canvas.height = TILE_SIZE * specs.CANVAS_HEIGHT;
  const canvasPos = new vec2;

  const ctx = canvas.getContext("2d");
  const game = new Game({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    gameWidth: gameWidth,
    gameHeight: gameHeight,
    TILE_SIZE: TILE_SIZE
  });

  let x = 0;
  const animate = () => {
    ctx.clearRect(canvasPos.x, canvasPos.y, canvasHeight, canvasWidth);
    game.render(ctx);
    requestAnimationFrame(animate);
    x++;
  }
  animate();
});
