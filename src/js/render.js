function render() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  renderBackground();

  // ctx.drawImage(planetCanvas, 0, Math.floor(planetPosition), 512, 512);

  traverse(scene, { x: 0, y: 0 });

  // ctx.drawImage(bossCanvas, 100, 10);

  renderUI();

  //debug();
}

function traverse(entity, transform) {
  if (entity.visible === false) return;
  renderEntity(entity, transform);

  if (entity.children === undefined) return;

  for (let i = 0, l = entity.children.length; i < l; i++) {
    const localTransform = add(transform, entity);
    traverse(entity.children[i], localTransform);
  }
}

function renderEntity(entity, transform) {
  const { x, y, sx, sy, source, width, height, visible } = entity;
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
    menu.touchAreas.forEach((item) => debugRect(item, "rgba(255,255,255,0.2)"));
  }

  if (state === STATE_GAME) {
    enemies.forEach((enemy) => {
      renderPath(enemy.path);
    });

    debugRect(player, "rgba(255,0,255,0.8)");

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
