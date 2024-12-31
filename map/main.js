import Camera from "./camera.js";
import Game from "./game.js";
import specs from "./specs.js";
import Vec2 from "./utils/vec2.js";
const TILE_SIZE = specs.TILE_SIZE;
const gameWidth = specs.TILE_SIZE * specs.GAME_WIDTH;
const gameHeight = specs.TILE_SIZE * specs.GAME_HEIGHT;
window.addEventListener("load", () => {
  const canvas = document.querySelector("#mainCanvas");
  const canvasWidth = canvas.width = TILE_SIZE * specs.CANVAS_WIDTH;
  const canvasHeight = canvas.height = TILE_SIZE * specs.CANVAS_HEIGHT;

  const ctx = canvas.getContext("2d");
  const camera = new Camera({ gameWidth: gameWidth, gameHeight: gameHeight, canvasWidth: canvasWidth, canvasHeight: canvasHeight, context: ctx });
  const game = new Game({
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    gameWidth: gameWidth,
    gameHeight: gameHeight,
    TILE_SIZE: TILE_SIZE,
    camera: camera
  });

  let x = 0;
  let delta = 0;
  const animate = (whatisit) => {
    if (x % 8 == 0) {
      ctx.clearRect(0, 0, canvasHeight, canvasWidth);
      game.render();
    }
    delta = whatisit;
    requestAnimationFrame(animate);
    x++;
  }
  animate();
});
