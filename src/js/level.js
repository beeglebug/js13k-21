const level = {
  time: 0,
  current: 0,
  waves: [
    {
      enemyType: 0,
      time: 3000,
      count: 3,
      x: 50,
      y: -50,
    },
    {
      enemyType: 0,
      time: 3000,
      count: 3,
      x: width - 50,
      y: -50,
    },
    {
      enemyType: 0,
      time: 8000,
      count: 5,
      x: width / 2,
      y: -50,
    },
  ],
};

function updateLevel(delta) {
  level.time += delta * 1000;

  // loop over waves starting at current, stop when we hit one in the future
  for (let i = level.current, l = level.waves.length; i < l; i++) {
    const wave = level.waves[i];
    if (level.time >= wave.time) {
      spawnWave(wave);
      level.current = i + 1;
    }
  }
}
