const bezierPath1 = bakeBezierPath(
  [
    { x: width / 2, y: -50 },
    { x: width / 2 - 100, y: 100 },
    { x: width / 2 + 100, y: height - 100 },
    { x: width / 2, y: height },
  ],
  16
);

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
      enemyType: EnemyFighter,
      time: 2000,
      count: 2,
      interval: 500,
      path: testLinePath1,
    },
    // {
    //   enemyType: EnemyFighter2,
    //   time: 3000,
    //   count: 3,
    //   interval: 500,
    //   path: testLinePath1,
    // },
    // {
    //   enemyType: EnemyFrigate,
    //   time: 3000,
    //   count: 3,
    //   interval: 3000,
    //   path: testLinePath2,
    // },
    // {
    //   enemyType: EnemyBomber,
    //   time: 6000,
    //   count: 3,
    //   interval: 500,
    //   path: testLinePath3,
    // },
    // {
    //   enemyType: EnemyBoss,
    //   time: 6000,
    //   count: 1,
    //   interval: 500,
    //   path: testLinePath4,
    // },
    // {
    //   enemyType: EnemyDrone,
    //   time: 9000,
    //   count: 5,
    //   interval: 500,
    //   path: bezierPath1,
    // },
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

  if (events.length === 0) {
    // check for end
    if (enemies.length === 0 && enemyBullets.length === 0) {
      win();
    }
  }
}
