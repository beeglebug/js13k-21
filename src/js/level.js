const testPath = [
  { x: width / 2, y: 0 },
  { x: width / 2 - 100, y: 100 },
  { x: width / 2 + 100, y: 300 },
  { x: width / 2, y: 400 },
];

const level1 = {
  waves: [
    {
      enemyType: 0,
      time: 3000,
      count: 3,
      interval: 500,
      x: 50,
      y: -50,
    },
    {
      enemyType: 0,
      time: 3000,
      count: 3,
      interval: 500,
      x: width - 50,
      y: -50,
    },
    {
      enemyType: 0,
      time: 8000,
      count: 5,
      interval: 500,
      x: width / 2,
      y: -50,
      path: testPath,
    },
  ],
};

function loadLevel(level) {
  const events = [];
  for (let i = 0; i < level.waves.length; i++) {
    const wave = level.waves[i];
    const { x, y, count, enemyType, time, interval, path } = wave;
    for (let j = 0; j < count; j++) {
      events.push([time + j * interval, spawnEnemy, [enemyType, x, y, path]]);
    }
  }
  return {
    time: 0,
    events,
  };
}

function spawnEnemy(enemyType, x, y, path) {
  const base = enemyTemplates[enemyType];
  const enemy = {
    ...base,
    x,
    y,
    path,
    velocity: {
      x: 0,
      y: base.speed,
    },
  };

  scene.children.push(enemy);
  enemies.push(enemy);
}

function updateLevel(delta) {
  currentLevel.time += delta * 1000;
  const { time, events } = currentLevel;

  // backwards because of splicing
  for (let i = events.length - 1; i >= 0; i--) {
    const [eventTime, fn, args] = events[i];
    if (time >= eventTime) {
      fn(...args);
      events.splice(i, 1);
    }
  }
}
