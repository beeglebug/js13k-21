const width = 240;
const height = 400;

const scale = Math.floor(
  Math.min(window.innerWidth / width, window.innerHeight / height)
);

let running = true;

let pixelMaps = {};
let whiteSprites;

const [canvas, ctx] = createCanvas(width, height);
const [sprites, spritesCtx] = createCanvas(256, 256);
const [whiteFontCanvas, whiteFontCtx] = createCanvas(132, 5);
const [logoCanvas, logoCtx] = createCanvas(width, 50);

canvas.style.width = width * scale;
canvas.style.height = height * scale;

let touchTarget = null;

const canvasPos = canvas.getBoundingClientRect();

const world = { x: width / 2, y: height / 2, width, height };

let currentLevel;
let score = 0;
let lives = 3;

let shoot = shootDouble;

let enemyTemplates = {};

const shootingClock = new Clock(300, () => {
  if (keyDown(KEY_SPACE) || touchTarget) {
    zzfxP(soundShoot);
    shoot();
  }
});

const starsRng = new RNG(2047356049);
// console.log(starsRng.seed);

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
