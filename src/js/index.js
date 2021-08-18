const width = 240;
const height = 426;
const scale = 2;

const [canvas, ctx] = createCanvas(width, height);
const [outputCanvas, outputCtx] = createCanvas(width * scale, height * scale);

outputCtx.imageSmoothingEnabled = false;

document.getElementById("g").appendChild(outputCanvas);

bindInput(document);

let running = true;

document.addEventListener("visibilitychange", () => {
  running = document.visibilityState === "visible";
});

const img = new Image();
img.onload = init;
img.src = "sprites.png";

const player = {
  x: width / 2,
  y: height - 50,
  width: 32,
  height: 32,
  alive: true,

  sprite: {
    source: img,

    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
};

let bullets = [];
let enemyBullets = [];
let enemies = [
  {
    x: width / 2,
    y: 50,
    width: 18,
    height: 18,
    alive: true,
    hp: 5,
    velocity: {
      x: 0,
      y: 0.5,
    },
    sprite: {
      source: img,
      x: 39,
      y: 0,
    },
  },
];

const scene = {
  x: 0,
  y: 0,
  children: [player, ...bullets, ...enemies, ...enemyBullets],
};

let whiteSprites;
let [sprites, spritesCtx] = createCanvas(256, 256);
let pixelMaps = {};

function init() {
  whiteSprites = tint(img, "#FFFFFF");
  spritesCtx.drawImage(img, 0, 0);

  // generate pixel map cache
  // TODO multiple enemies / player animation frames
  pixelMaps.player = getPixelMap(spritesCtx, 0, 0, 32, 32);
  pixelMaps.bullet = getPixelMap(spritesCtx, 32, 0, 4, 7);
  pixelMaps.enemyBullet = getPixelMap(spritesCtx, 32, 8, 5, 5);
  pixelMaps.enemy = getPixelMap(spritesCtx, 39, 0, 18, 18);

  player.pixelMap = pixelMaps.player;
  enemies[0].pixelMap = pixelMaps.enemy;

  loop();
  drawPlanet();
  drawGreebles();
  setInterval(() => {
    if (!running) return;
    enemies.forEach((enemy) => enemyShoot(enemy));
  }, 1000);
}

const world = { x: width / 2, y: height / 2, width, height };

function loop() {
  requestAnimationFrame(loop);

  handleInput();

  scene.children.forEach((item) => {
    if (item.velocity) {
      item.x += item.velocity.x;
      item.y += item.velocity.y;
    }
  });

  collision();

  render();

  flip();
}

function flip() {
  outputCtx.drawImage(
    canvas,
    0,
    0,
    width,
    height,
    0,
    0,
    width * scale,
    height * scale
  );
}

const isAlive = (item) => item.alive;
