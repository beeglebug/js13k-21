/** @global */
function createCanvas(width, height) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  //ctx.imageSmoothingEnabled = false
  return [canvas, ctx];
}

/** @global */
function tint(image, fill, operation = "source-atop") {
  const [canvas, ctx] = createCanvas(image.width, image.height);
  ctx.drawImage(image, 0, 0);
  ctx.globalCompositeOperation = operation;
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, image.width, image.height);
  return canvas;
}

/** @global */
function times(count, fn) {
  for (let i = 0; i < count; i++) {
    fn(i);
  }
}

/** @global */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** @global */
function rgba(r, g, b, a) {
  return `rgba(${r},${g},${b},${a})`;
}

let time = 0;
let oldTime = 0;

/** @global */
function tick() {
  // timing for input and FPS counter
  oldTime = time;
  time = performance.now();
  let delta = (time - oldTime) / 1000; // time the last frame took in seconds
  fps = 1 / delta;
  return delta;
}

function isAlive(item) {
  return item.alive;
}
