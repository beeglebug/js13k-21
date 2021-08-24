let enemyTemplates = {};

function createEnemies() {
  const baseEnemy = {
    width: 10,
    height: 10,
    alive: true,
    hp: 1,
    source: sprites,
    pixelMap: pixelMaps.enemy,
    sx: 35,
    sy: 0,
    speed: 1.5,
  };

  enemyTemplates[0] = baseEnemy;
}

function spawnEnemy(enemyType, path) {
  const base = enemyTemplates[enemyType];
  const [first, second] = path;
  const enemy = {
    ...base,
    ...first, // start at first point
    path,
    pathIndex: 0,
    // head to second point
    target: second,
  };

  // aim at second path point to start
  // for straight lines this is enough
  enemy.velocity = sub(enemy, path[1]);

  scene.children.push(enemy);
  enemies.push(enemy);
}

const toArray = (v) => [v.x, v.y];

function updateEnemies(delta) {
  enemies.forEach((enemy) => {
    if (enemy.clock) {
      enemy.clock.update(delta);
    }

    if (enemy.target) {
      enemy.velocity = sub(enemy.target, enemy);
      multiply(normalize(enemy.velocity), enemy.speed);
    }

    enemy.x += enemy.velocity.x;
    enemy.y += enemy.velocity.y;

    // seeking target and have more path points to head for
    if (enemy.target && enemy.path && enemy.path.length > 2) {
      const threshold = 10;
      if (distanceTo(enemy, enemy.target) < threshold) {
        enemy.target = enemy.path[++enemy.pathIndex];
      }
    }
  });
}

class Clock {
  constructor(frequency, callback) {
    this.count = 0;
    this.frequency = frequency;
    this.callback = callback;
  }
  update(delta) {
    this.count += delta * 1000;
    if (this.count >= this.frequency) {
      this.count = this.count % this.frequency;
      this.callback();
    }
  }
}
