const width = 240;
const height = 400;

const scale = Math.min(window.innerWidth / width, window.innerHeight / height);

let running = true;

let pixelMaps = {};
let whiteSprites;

const [canvas, ctx] = createCanvas(width, height);
const [sprites, spritesCtx] = createCanvas(256, 256);

canvas.style.width = width * scale;
canvas.style.height = height * scale;

let touchTarget = null;

const canvasPos = canvas.getBoundingClientRect();

const world = { x: width / 2, y: height / 2, width, height };
