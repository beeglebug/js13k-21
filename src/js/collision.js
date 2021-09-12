function getPixelMapFromCanvas(canvas) {
  return getPixelMap(
    canvas.getContext("2d"),
    0,
    0,
    canvas.width,
    canvas.height
  );
}

function getPixelMap(ctx, sx, sy, width, height) {
  const map = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = ctx.getImageData(sx + x, sy + y, 1, 1);
      if (map[y] === undefined) map[y] = [];
      // opaque or transparent?
      map[y][x] = pixel.data[3] !== 0;
    }
  }
  return map;
}

function collidePixels(entity1, entity2, rect) {
  // calculate offsets from sprite to overlap
  const rx = rect.x - rect.width / 2;
  const ry = rect.y - rect.height / 2;

  const ox1 = Math.floor(rx - (entity1.x - entity1.width / 2));
  const oy1 = Math.floor(ry - (entity1.y - entity1.height / 2));
  const ox2 = Math.floor(rx - (entity2.x - entity2.width / 2));
  const oy2 = Math.floor(ry - (entity2.y - entity2.height / 2));

  // loop over the overlap pixels, if both are solid we have a collision
  for (let iy = 0; iy < Math.floor(rect.height); iy++) {
    for (let ix = 0; ix < Math.floor(rect.width); ix++) {
      // probably a better way to do this but whatever
      const x1 = clamp(ix + ox1, 0, Infinity);
      const y1 = clamp(iy + oy1, 0, Infinity);
      const x2 = clamp(ix + ox2, 0, Infinity);
      const y2 = clamp(iy + oy2, 0, Infinity);

      // dont know what causes this but no time to fix
      if (entity1.pixelMap[y1] === undefined) continue;
      if (entity2.pixelMap[y2] === undefined) continue;
      const p1 = entity1.pixelMap[y1][x1];
      const p2 = entity2.pixelMap[y2][x2];
      if (p1 === true && p2 === true) return true;
    }
  }
  return false;
}

function collideRectRect(r1, r2) {
  // work out the half widths and half heights
  // this is because our rect x/y is the center so we need to do a little funky maths compares to normal top/left
  const hw1 = r1.width / 2;
  const hw2 = r2.width / 2;
  const hh1 = r1.height / 2;
  const hh2 = r2.height / 2;

  // extreme points of the union of the two rects
  const minX = Math.min(r1.x - hw1, r2.x - hw2);
  const maxX = Math.max(r1.x + hw1, r2.x + hw2);

  const minY = Math.min(r1.y - hh1, r2.y - hh2);
  const maxY = Math.max(r1.y + hh1, r2.y + hh2);

  // size of the union rect
  const unionWidth = maxX - minX;
  const unionHeight = maxY - minY;

  const totalWidth = r1.width + r2.width;
  const totalHeight = r1.height + r2.height;

  // need to intersect on BOTH axis to count as an overlap
  const collision = totalWidth > unionWidth && totalHeight > unionHeight;

  if (collision === false) return false;

  // get the intersection rect
  const left = Math.max(r1.x - hw1, r2.x - hw2);
  const top = Math.max(r1.y - hh1, r2.y - hh2);

  const width = totalWidth - unionWidth;
  const height = totalHeight - unionHeight;

  return {
    x: left + width / 2,
    y: top + height / 2,
    width,
    height,
  };
}

function pointInRect(point, rect) {
  const left = rect.x - rect.width / 2;
  const top = rect.y - rect.height / 2;
  const right = rect.x + rect.width / 2;
  const bottom = rect.y + rect.height / 2;
  return point.x > left && point.x < right && point.y > top && point.y < bottom;
}

function collision() {
  // collision
  enemyBullets.forEach((bullet) => {
    // world boundary
    if (collideRectRect(bullet, world) === false) {
      bullet.alive = false;
      return;
    }

    if (player.invulnerable === false) {
      // enemy bullets vs player
      const collision = collideRectRect(bullet, player);
      if (collision) {
        const pixelCollision = collidePixels(bullet, player, collision);
        if (pixelCollision) {
          bullet.alive = false;
          player.damage(collision);
        }
      }
    }
  });

  bullets.forEach((bullet) => {
    // world boundary
    if (collideRectRect(bullet, world) === false) {
      bullet.alive = false;
      return;
    }

    // player bullets vs enemies
    enemies.forEach((enemy) => {
      const collision = collideRectRect(bullet, enemy);
      if (collision) {
        const pixelCollision = collidePixels(bullet, enemy, collision);
        if (pixelCollision) {
          bullet.alive = false;
          enemy.damage(collision);
        }
      }
    });
  });

  // enemy vs player
  enemies.forEach((enemy) => {
    const collision = collideRectRect(enemy, player);
    if (collision) {
      const pixelCollision = collidePixels(enemy, player, collision);
      if (pixelCollision) {
        enemy.damage(collision);
        player.damage(collision);
      }
    }

    if (enemy.y > height) {
      enemy.alive = false;
    }
  });

  // dont clip if being animated (for spawn)
  if (player.hasControl === true) {
    // world boundary
    player.x = clamp(player.x, 0, width);
    player.y = clamp(player.y, 0, height);
  }

  // get rid of dead stuff at end
  enemies = enemies.filter(isAlive);
  enemyBullets = enemyBullets.filter(isAlive);
  bullets = bullets.filter(isAlive);
  effects = effects.filter(isAlive);
}

function respawn() {
  // move off screen
  player.x = width / 2;
  player.y = height + 50;

  // wait a sec
  setTimeout(() => {
    let int = setInterval(() => {
      flashSprite(player);
    }, 200);

    setTimeout(() => {
      clearInterval(int);
      player.invulnerable = false;
    }, 1500);

    createTween(player, "y", 320, 1000, () => {
      player.hasControl = true;
    });
  }, 1000);
}
