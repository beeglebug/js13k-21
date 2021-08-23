function render() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  renderBackground();

  // ctx.drawImage(planetCanvas, 0, Math.floor(planetPosition), 512, 512);

  traverse(scene, { x: 0, y: 0 });

  renderBezier(testPath);

  // debug();
}

function traverse(entity, transform) {
  renderEntity(entity, transform);

  if (entity.children === undefined) return;

  for (let i = 0, l = entity.children.length; i < l; i++) {
    const localTransform = add(transform, entity);
    traverse(entity.children[i], localTransform);
  }
}

function renderEntity(entity, transform) {
  const { x, y, sx, sy, source, width, height } = entity;
  if (source === undefined) return; // non renderable
  const worldX = Math.floor(transform.x + x - width / 2);
  const worldY = Math.floor(transform.y + y - height / 2);
  ctx.drawImage(source, sx, sy, width, height, worldX, worldY, width, height);
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

function renderBezier(path) {
  const steps = 20;
  const accuracy = 1 / steps;
  const [p0, p1, p2, p3] = path;

  ctx.strokeStyle = "#FF00FF";
  ctx.lineWidth = 0.5;

  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  for (let i = 0; i <= 1; i += accuracy) {
    const v = bezier(path, i);
    ctx.lineTo(v.x, v.y);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(clamp(v.x, 0, width) - 1, clamp(v.y, 0, height) - 1, 2, 2);
  }
  ctx.lineTo(p3.x, p3.y);

  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = "#FF0000";
  ctx.fillRect(clamp(p0.x, 0, width) - 1, clamp(p0.y, 0, height) - 1, 2, 2);
  ctx.fillRect(clamp(p3.x, 0, width) - 1, clamp(p3.y, 0, height) - 1, 2, 2);
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(clamp(p1.x, 0, width) - 1, clamp(p1.y, 0, height) - 1, 2, 2);
  ctx.fillRect(clamp(p2.x, 0, width) - 1, clamp(p2.y, 0, height) - 1, 2, 2);
}
