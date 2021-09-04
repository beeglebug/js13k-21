function createEnemies() {
  const baseEnemy = {
    width: 10,
    height: 10,
    alive: true,
    hp: 1,
    source: sprites,
    pixelMap: pixelMaps.enemy,
    sx: 32,
    sy: 32,
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
    velocity: { x: 0, y: 0 },
  };

  seekTarget(enemy);

  scene.children.push(enemy);
  enemies.push(enemy);
}

const toArray = (v) => [v.x, v.y];

function updateEnemies(delta) {
  enemies.forEach((enemy) => {
    enemy.x += enemy.velocity.x;
    enemy.y += enemy.velocity.y;

    // seeking target and have more path points to head for
    if (enemy.target && enemy.path && enemy.path.length > 2) {
      const threshold = 10;
      if (distanceTo(enemy, enemy.target) < threshold) {
        enemy.target = enemy.path[++enemy.pathIndex];
        seekTarget(enemy);
      }
    }
  });
}

function seekTarget(enemy) {
  if (!enemy.target) return;
  enemy.velocity.x = enemy.target.x - enemy.x;
  enemy.velocity.y = enemy.target.y - enemy.y;
  normalize(enemy.velocity);
  multiply(enemy.velocity, enemy.speed);
}
