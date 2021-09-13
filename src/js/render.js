function render() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  renderBackground();

  player.render();
  enemies.forEach((entity) => entity.render());
  enemyBullets.forEach((entity) => entity.render());
  bullets.forEach((entity) => entity.render());
  effects.forEach((entity) => entity.render());

  renderUI();
  // debug();
}

function renderEntity(entity, offset) {
  let { x, y, sx, sy, source, width, height } = entity;
  if (offset) {
    x += offset.x;
    y += offset.y;
  }
  ctx.drawImage(
    source,
    sx,
    sy,
    width,
    height,
    Math.floor(x - width / 2),
    Math.floor(y - height / 2),
    width,
    height
  );
}

function flashSprite(target, delay = 100) {
  const original = target.source;
  if (original === target.flashSprite) return;
  target.source = target.flashSprite;

  setTimeout(() => {
    target.source = original;
  }, delay);
}

function getTouchAreas(menu) {
  menu.items.forEach((item, i) => {
    // pad out just in case selected
    let text = "- " + item.text + " -";
    const scale = 2;
    const metrics = getTextMetrics(text, scale);
    const x = width / 2;

    item.rect = {
      x,
      y: menu.y + i * 30 + metrics.height / 2,
      width: metrics.width + 20,
      height: metrics.height + 20,
    };
  });
}

function debug() {
  if (state === STATE_MAIN_MENU) {
    menu.items.forEach((item) => debugRect(item.rect, "rgba(255,255,255,0.2)"));
  }

  if (state === STATE_GAME) {
    enemies.forEach((enemy) => {
      renderPath(enemy.path);
      debugRect(enemy, "rgba(255,0,255,0.3)");
    });

    debugRect(player, "rgba(255,0,255,0.3)");

    bullets.forEach((bullet) => {
      debugRect(bullet, "rgba(0,255,255,0.8)");
    });

    enemyBullets.forEach((bullet) => {
      debugRect(bullet, "rgba(0,255,255,0.8)");
    });
  }
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

function renderPath(path) {
  const [start, ...rest] = path;
  const end = rest.pop();

  ctx.strokeStyle = "#FF00FF";
  ctx.lineWidth = 0.5;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);

  rest.forEach((v) => {
    ctx.lineTo(v.x, v.y);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(clamp(v.x, 0, width) - 1, clamp(v.y, 0, height) - 1, 2, 2);
  });

  ctx.lineTo(end.x, end.y);

  ctx.stroke();
  ctx.closePath();

  ctx.fillStyle = "#FF0000";
  ctx.fillRect(
    clamp(start.x, 0, width) - 1,
    clamp(start.y, 0, height) - 1,
    2,
    2
  );
  ctx.fillRect(clamp(end.x, 0, width) - 1, clamp(end.y, 0, height) - 1, 2, 2);

  ctx.fillStyle = "#00FF00";
  rest.forEach((v) => {
    ctx.fillRect(clamp(v.x, 0, width) - 1, clamp(v.y, 0, height) - 1, 2, 2);
  });
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
