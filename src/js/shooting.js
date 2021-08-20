function enemyShootSingle(enemy) {
  const velocity = normalize(sub(player, enemy));

  const bullet = {
    x: enemy.x,
    y: enemy.y,
    width: 5,
    height: 5,
    alive: true,
    pixelMap: pixelMaps.enemyBullet,
    source: img,
    sx: 32,
    sy: 8,
    velocity: multiply(velocity, 1.5),
  };

  scene.children.push(bullet);
  enemyBullets.push(bullet);
}

function enemyShoot(enemy, count) {
  const spread = Math.PI / 2; // 90 degree arc
  const increment = spread / count;
  const initial = { x: 0, y: 1 };
  const start = rotate(initial, -increment * Math.round(count / 2));
  times(count, () => {
    const velocity = { ...rotate(start, increment) };
    const bullet = {
      x: enemy.x,
      y: enemy.y,
      width: 5,
      height: 5,
      alive: true,
      pixelMap: pixelMaps.enemyBullet,
      source: img,
      sx: 32,
      sy: 8,
      velocity: multiply(velocity, 1.5),
    };
    scene.children.push(bullet);
    enemyBullets.push(bullet);
  });
  // rotate(initial, -0.05);
}

const shootingClock = new Clock(200, () => {
  if (keyDown(KEY_SPACE) || touchTarget) {
    shoot();
  }
});

function shoot() {
  const bullet = {
    x: player.x,
    y: player.y,
    width: 4,
    height: 7,
    alive: true,
    pixelMap: pixelMaps.bullet,
    source: img,
    sx: 32,
    sy: 0,
    velocity: {
      x: 0,
      y: -5,
    },
  };
  scene.children.push(bullet);
  bullets.push(bullet);
}
