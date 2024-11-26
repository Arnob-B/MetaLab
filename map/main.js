import Game from "./game.js";
const gameWidth = 1980
const gameHeight = 1200
window.addEventListener("load",()=>{
  const canvas = document.querySelector("#mainCanvas");
  const canvasWidth = canvas.width = window.innerWidth;
  const canvasHeight = canvas.height = window.innerHeight;
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