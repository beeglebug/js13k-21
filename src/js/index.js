const width = 240;
const height = 400;

let running = true;

const [canvas, ctx] = createCanvas(width, height);
const [sprites, spritesCtx] = createCanvas(256, 256);

let pixelMaps = {};
let whiteSprites;

document.getElementById("g").appendChild(canvas);

bindInput(document);

document.addEventListener("visibilitychange", () => {
  running = document.visibilityState === "visible";
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

const scale = Math.min(window.innerWidth / width, window.innerHeight / height);

canvas.style.width = width * scale;
canvas.style.height = height * scale;

let touchTarget = null;
const canvasPos = canvas.getBoundingClientRect();

document.addEventListener("touchstart", (e) => {
  const x = (e.touches[0].clientX - canvasPos.x) / scale;
  const y = (e.touches[0].clientY - canvasPos.y) / scale;
  touchTarget = { x, y };
});

document.addEventListener("touchend", () => {
  touchTarget = null;
});

document.addEventListener("touchmove", (e) => {
  const x = (e.changedTouches[0].clientX - canvasPos.x) / scale;
  const y = (e.changedTouches[0].clientY - canvasPos.y) / scale;
  touchTarget = { x, y };
});

const img = new Image();
img.onload = init;
img.src = "sprites.png";

let starsPosition = 0 - height;
let planetPosition = -200;

let bullets = [];
let enemyBullets = [];
let enemies = [];

const scene = {
  x: 0,
  y: 0,
  children: [],
};

function init() {
  whiteSprites = tint(img, "#FFFFFF");
  spritesCtx.drawImage(img, 0, 0);

  // generate pixel map cache
  // TODO multiple enemies / player animation frames
  pixelMaps.player = getPixelMap(spritesCtx, 0, 0, 32, 32);
  pixelMaps.bullet = getPixelMap(spritesCtx, 32, 0, 4, 7);
  pixelMaps.enemyBullet = getPixelMap(spritesCtx, 32, 8, 5, 5);
  pixelMaps.enemy = getPixelMap(spritesCtx, 39, 0, 18, 18);

  createPlayer();

  loop();

  // drawPlanet();
  // drawGreebles();

  backgroundLayers = [
    {
      y: 0,
      img: drawStars(2, 30, 0.8),
      speed: 1.2,
    },
    {
      y: 0,
      img: drawStars(1, 100, 0.7),
      speed: 1,
    },
    {
      y: 0,
      img: drawStars(1, 200, 0.6),
      speed: 0.8,
    },
  ];

  spawnEnemies();
  setInterval(() => {
    spawnEnemies();
  }, 5000);
}

const world = { x: width / 2, y: height / 2, width, height };

function loop() {
  requestAnimationFrame(loop);
  let delta = tick();

  handleInput();

  scene.children.forEach((item) => {
    if (item.velocity) {
      item.x += item.velocity.x;
      item.y += item.velocity.y;
    }
  });

  shootingClock.update(delta);
  updateBackground();
  updateAnimations(delta);
  updateEnemies(delta);

  collision();

  render();
}
