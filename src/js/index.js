const [canvas, ctx] = createCanvas(360, 640);

document.getElementById("g").appendChild(canvas);

bindInput(document);

const img = new Image();
img.onload = init;
img.src = "sprites.png";

const player = {
  x: 180,
  y: 600,
};

const bullets = [];

function init() {
  loop();
}

function loop() {
  requestAnimationFrame(loop);

  bullets.forEach((bullet) => {
    const speed = 5;
    bullet.y -= speed;
  });

  handleInput();
  render();
}

function shoot() {
  bullets.push({
    x: player.x,
    y: player.y,
  });
}

function render() {
  ctx.fillRect(0, 0, 360, 640);

  ctx.drawImage(img, 0, 0, 32, 32, player.x - 16, player.y, 32, 32);

  bullets.forEach((bullet) => {
    ctx.drawImage(img, 32, 0, 3, 5, bullet.x - 1, bullet.y, 3, 5);
  });
}
