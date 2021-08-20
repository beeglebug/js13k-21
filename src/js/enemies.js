function spawnEnemies() {
  let spacing = 40;
  let count = 5;

  // off screen left
  let x = 0 - spacing * count;

  for (let i = 0; i < count; i++) {
    const enemy = {
      x: x + i * spacing,
      y: 50,
      width: 14,
      height: 14,
      alive: true,
      hp: 1,
      velocity: {
        x: 1.5,
        y: 0,
      },
      source: sprites,
      pixelMap: pixelMaps.enemy,
      sx: 37,
      sy: 0,
    };

    enemy.clock = new Clock(1000, () => {
      enemyShootSingle(enemy);
    });

    scene.children.push(enemy);
    enemies.push(enemy);
  }
}

function updateEnemies(delta) {
  enemies.forEach((enemy) => {
    enemy.clock.update(delta);
  });
}

class Clock {
  count = 0;
  constructor(frequency, callback) {
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
