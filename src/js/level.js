const testPath = [
  { x: width / 2, y: 0 },
  { x: width / 2 - 100, y: 100 },
  { x: width / 2 + 100, y: height - 100 },
  { x: width / 2, y: height },
];

const testLinePath1 = [
  { x: 50, y: -50 },
  { x: 50, y: height + 50 },
];

const testLinePath2 = [
  { x: width - 50, y: -50 },
  { x: width - 50, y: height + 50 },
];

const testLinePath3 = [
  { x: -50, y: -50 },
  { x: width + 50, y: height + 50 },
];

const testLinePath4 = [
  { x: width + 50, y: -50 },
  { x: -50, y: height + 50 },
];

const level1 = {
  waves: [
    {
      enemyType: 0,
      time: 3000,
      count: 3,
      interval: 500,
      path: testLinePath1,
    },
    {
      enemyType: 0,
      time: 3000,
      count: 3,
      interval: 500,
      path: testLinePath2,
    },
    {
      enemyType: 0,
      time: 6000,
      count: 3,
      interval: 500,
      path: testLinePath3,
    },
    {
      enemyType: 0,
      time: 6000,
      count: 3,
      interval: 500,
      path: testLinePath4,
    },
    {
      enemyType: 0,
      time: 9000,
      count: 5,
      interval: 500,
      path: precomputeBezierPath(testPath, 16),
    },
  ],
};

function loadLevel(level) {
  const events = [];
  for (let i = 0; i < level.waves.length; i++) {
    const wave = level.waves[i];
    const { count, enemyType, time, interval, path } = wave;
    for (let j = 0; j < count; j++) {
      events.push([time + j * interval, spawnEnemy, [enemyType, path]]);
    }
  }
  return {
    time: 0,
    events,
  };
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
