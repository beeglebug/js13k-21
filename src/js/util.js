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
function getImageData(image) {
  const [, ctx] = createCanvas(image.width, image.height);
  ctx.drawImage(image, 0, 0);
  return ctx.getImageData(0, 0, image.width, image.height);
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
