function outQuad(t) {
  return t * (2 - t)
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}

function remap(val, min, max, a, b) {
  if (max - min === 0) return a
  return a + ((val - min) * (b - a)) / (max - min)
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b
}

function flat(arr2d) {
  return [].concat(...arr2d)
}

function tick() {
  // timing for input and FPS counter
  oldTime = time
  time = performance.now()
  let delta = (time - oldTime) / 1000 // time the last frame took in seconds
  fps = 1 / delta
  return delta
}

/** @global */
function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  //ctx.imageSmoothingEnabled = false
  return [canvas, ctx]
}

function tint(image, fill, operation = 'source-atop') {
  const [canvas, ctx] = createCanvas(image.width, image.height)
  ctx.drawImage(image, 0, 0)
  ctx.globalCompositeOperation = operation
  ctx.fillStyle = fill
  ctx.fillRect(0, 0, image.width, image.height)
  return canvas
}

function getImageData(image) {
  const [, ctx] = createCanvas(image.width, image.height)
  ctx.drawImage(image, 0, 0)
  return ctx.getImageData(0, 0, image.width, image.height)
}

/** @global */
function times(count, fn) {
  for (let i = 0; i < count; i++) {
    fn(i)
  }
}
