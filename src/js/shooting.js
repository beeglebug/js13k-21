function enemyShoot(enemy) {
  const count = 5;
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
      sprite: {
        source: img,
        x: 32,
        y: 8,
      },
      velocity: multiply(velocity, 1.5),
    };
    scene.children.push(bullet);
    enemyBullets.push(bullet);
  });
  // rotate(initial, -0.05);
}

function shoot() {
  const bullet = {
    x: player.x,
    y: player.y,
    width: 4,
    height: 7,
    alive: true,
    sprite: {
      source: img,
      x: 32,
      y: 0,
    },
    velocity: {
      x: 0,
      y: -5,
    },
  };
  scene.children.push(bullet);
  bullets.push(bullet);
}
