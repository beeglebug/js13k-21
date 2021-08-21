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

function spawnWave(wave) {
  const { x, y, type, count, enemyType } = wave;

  let spacing = 40;

  for (let i = 0; i < count; i++) {
    const base = enemyTemplates[enemyType];
    const enemy = {
      ...base,
      x: x,
      y: y - i * spacing,
      velocity: {
        x: 0,
        y: base.speed,
      },
    };

    scene.children.push(enemy);
    enemies.push(enemy);
  }
}

function updateEnemies(delta) {
  enemies.forEach((enemy) => {
    if (enemy.clock) {
      enemy.clock.update(delta);
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
