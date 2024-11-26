import Game from "./game.js";
const gameHeight = 1980
const gameWidth = 1200
window.addEventListener("load",()=>{
  const canvas = document.querySelector("#mainCanvas");
  const canvasWidth = canvas.width = 700
  const canvasHeight = canvas.height = 600
  const ctx = canvas.getContext("2d");

  const game = new Game();
  const animate = () => {
    ctx.clearRect(0,0,canvasHeight,canvasWidth);
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});