const width = 240;
const height = 426;
const scale = 2;

let running = true;

const [canvas, ctx] = createCanvas(width, height);
const [outputCanvas, outputCtx] = createCanvas(width * scale, height * scale);
const [sprites, spritesCtx] = createCanvas(256, 256);

let pixelMaps = {};
let whiteSprites;

outputCtx.imageSmoothingEnabled = false;

document.getElementById("g").appendChild(outputCanvas);

bindInput(document);

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
  source: img,
  sx: 0,
  sy: 0,
  velocity: {
    x: 0,
    y: 0,
  },
};

let starsPosition = 0 - height;
let planetPosition = -200;

let bullets = [];
let enemyBullets = [];
let enemies = [
  {
    x: width / 2,
    y: 50,
    width: 14,
    height: 14,
    alive: true,
    hp: 5,
    velocity: {
      x: 0,
      y: 0,
    },
    source: img,
    sx: 37,
    sy: 0,
  },
];

const eFrame = engineFrames[0];
const engineTrail1 = {
  x: player.x,
  y: player.y,
  width: eFrame.width,
  height: eFrame.height,
  alive: true,
  source: sprites,
  sx: eFrame.x,
  sy: eFrame.y,
  frames: engineFrames,
  currentFrame: 0,
  counter: 0,
  speed: 80,
  loop: true,
};

const engineTrail2 = {
  x: player.x,
  y: player.y,
  width: eFrame.width,
  height: eFrame.height,
  alive: true,
  source: sprites,
  sx: eFrame.x,
  sy: eFrame.y,
  frames: engineFrames,
  currentFrame: 0,
  counter: 0,
  speed: 80,
  loop: true,
};

animated.push(engineTrail1, engineTrail2);

const scene = {
  x: 0,
  y: 0,
  children: [
    player,
    ...bullets,
    ...enemies,
    ...enemyBullets,
    engineTrail1,
    engineTrail2,
  ],
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

  player.pixelMap = pixelMaps.player;
  enemies.forEach((enemy) => (enemy.pixelMap = pixelMaps.enemy));

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

  setInterval(() => {
    if (!running) return;
    enemies.forEach((enemy) => enemyShoot(enemy));
  }, 1000);
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

  // TODO remove when scene graph works
  engineTrail1.x = player.x - 10;
  engineTrail1.y = player.y + 7;

  engineTrail2.x = player.x + 10;
  engineTrail2.y = player.y + 7;

  updateBackground();
  updateAnimations(delta);

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
