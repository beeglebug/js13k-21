const width = 240;
const height = 400;

const scale = Math.min(window.innerWidth / width, window.innerHeight / height);

let running = true;

let pixelMaps = {};
let whiteSprites;

const [canvas, ctx] = createCanvas(width, height);
const [sprites, spritesCtx] = createCanvas(256, 256);
const [whiteFontCanvas, whiteFontCtx] = createCanvas(132, 5);

canvas.style.width = width * scale;
canvas.style.height = height * scale;

let touchTarget = null;

const canvasPos = canvas.getBoundingClientRect();

const world = { x: width / 2, y: height / 2, width, height };

let currentLevel;
let score = 0;
let lives = 3;
