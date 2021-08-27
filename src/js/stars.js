function drawStars(size, count, opacity) {
  const layerHeight = height * 2;
  const [canvas, ctx] = createCanvas(width, layerHeight);

  for (let i = 0; i < count; i++) {
    const x = starsRng.randomIntBetween(0, width);
    // make sure theres a slight gap for tiling
    const y = starsRng.randomIntBetween(0, layerHeight - size);

    const modifier = starsRng.randomIntBetween(1, 3) / 10;

    ctx.fillStyle = rgba(
      starsRng.randomIntBetween(200, 255),
      starsRng.randomIntBetween(200, 255),
      starsRng.randomIntBetween(200, 255),
      opacity - modifier
    );

    ctx.fillRect(x, y, size, size);
  }

  return canvas;
}
