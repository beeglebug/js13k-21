function enemyShootDirection(enemy, velocity) {
  const bullet = new EnemyBullet(
    enemy.x,
    enemy.y,
    multiply(velocity, enemy.bulletSpeed)
  );
  enemyBullets.push(bullet);
}

function enemyShootAtPlayer(enemy) {
  const velocity = normalize(sub(player, enemy));

  const bullet = new EnemyBullet(
    enemy.x,
    enemy.y,
    multiply(velocity, enemy.bulletSpeed)
  );

  enemyBullets.push(bullet);
}

function enemyShootSpread(enemy, count) {
  const spread = Math.PI / 2; // 90 degree arc
  const increment = spread / count;
  const initial = { x: 0, y: 1 };
  const start = rotate(initial, -increment * Math.round(count / 2));
  times(count, () => {
    const velocity = { ...rotate(start, increment) };
    const bullet = new EnemyBullet(
      enemy.x,
      enemy.y,
      multiply(velocity, enemy.bulletSpeed)
    );
    enemyBullets.push(bullet);
  });
  // rotate(initial, -0.05);
}

class EnemyBullet extends Entity {
  width = 5;
  height = 5;
  sx = 24;
  sy = 8;

  constructor(x, y, velocity) {
    super(x, y);
    this.velocity = velocity;
    this.pixelMap = pixelMaps.bullet;
    this.source = sprites;
  }
}

class Bullet extends Entity {
  width = 9;
  height = 7;
  sx = 24;
  sy = 0;
  velocity = {
    x: 0,
    y: -5,
  };

  constructor(x, y) {
    super(x, y);
    this.pixelMap = pixelMaps.bullet;
    this.source = sprites;
  }
}
