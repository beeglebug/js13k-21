/** @global */
function render() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  renderBackground();

  // ctx.drawImage(planetCanvas, 0, Math.floor(planetPosition), 512, 512);

  scene.children.forEach((child) => {
    const { x, y, sx, sy, source, width, height } = child;
    ctx.drawImage(
      source,
      sx,
      sy,
      width,
      height,
      Math.floor(x - Math.floor(width / 2)),
      Math.floor(y - Math.floor(height / 2)),
      width,
      height
    );
  });

  // debug();
}

function flashSprite(target, delay = 100) {
  const original = target.source;
  if (original === whiteSprites) return;
  target.source = whiteSprites;
  setTimeout(() => (target.source = original), delay);
}

function debug() {
  debugRect(player, "rgba(255,0,255,0.8)");

  enemyBullets.forEach((bullet) => {
    debugRect(bullet, "rgba(0,255,255,0.8)");
  });
}

function debugRect(rect, color) {
  const fillStyle = ctx.fillStyle;
  ctx.fillStyle = color;
  ctx.fillRect(
    rect.x - rect.width / 2,
    rect.y - rect.height / 2,
    rect.width,
    rect.height
  );
  ctx.fillStyle = fillStyle;
}
