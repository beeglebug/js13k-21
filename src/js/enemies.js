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

function updateEnemies(delta) {
  enemies.forEach((enemy) => {
    if (enemy.path) {
      // calculate velocity required to get to next point on path
      const nextPoint = { x: width, y: height };
      enemy.velocity = sub(nextPoint, enemy);
      multiply(normalize(enemy.velocity), enemy.speed);
    }
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
