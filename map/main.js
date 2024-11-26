import Game from "./game.js";
const gameWidth = 1980
const gameHeight = 1200
window.addEventListener("load",()=>{
  const canvas = document.querySelector("#mainCanvas");
  const canvasWidth = canvas.width = 1280
  const canvasHeight = canvas.height = 720
  const ctx = canvas.getContext("2d");

  const game = new Game(canvasWidth,canvasHeight,gameWidth,gameHeight);
  let i = 0, j= 0;

  const animate = () => {
    ctx.clearRect(0,0,canvasHeight,canvasWidth);
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});