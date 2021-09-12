const pathMiddleWavy = bakeBezierPath(
  [
    { x: width / 2, y: -50 },
    { x: width / 2 - 100, y: 100 },
    { x: width / 2 + 100, y: height - 100 },
    { x: width / 2, y: height },
  ],
  16
);

const pathLeftAcross = [
  { x: 20, y: -50 },
  { x: width - 20, y: height + 50 },
];

const pathRightAcross = [
  { x: width - 20, y: -50 },
  { x: 20, y: height + 50 },
];

const pathLeftStraightDown = [
  { x: 50, y: -50 },
  { x: 50, y: height + 50 },
];

const pathMiddleStraightDown = [
  { x: width / 2, y: -50 },
  { x: width / 2, y: height + 50 },
];

const pathRightStraightDown = [
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
      enemyType: EnemyDrone,
      time: 1000,
      count: 3,
      interval: 500,
      path: pathMiddleStraightDown,
    },
    {
      enemyType: EnemyDrone,
      time: 2500,
      count: 3,
      interval: 500,
      path: pathLeftStraightDown,
    },
    {
      enemyType: EnemyDrone,
      time: 2500,
      count: 3,
      interval: 500,
      path: pathRightStraightDown,
    },
    {
      enemyType: EnemyScout,
      time: 5000,
      count: 1,
      path: pathLeftAcross,
    },
    {
      enemyType: EnemyScout,
      time: 5000,
      count: 1,
      path: pathRightAcross,
    },
    // {
    //   enemyType: EnemyFrigate,
    //   time: 3000,
    //   count: 3,
    //   interval: 3000,
    //   path: pathRightStraightDown,
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
    //   path: pathMiddleWavy,
    // },
  ],
};

function loadLevel(level) {
  const events = [];
  for (let i = 0; i < level.waves.length; i++) {
    const wave = level.waves[i];
    const { count, enemyType, time, interval = 1, path } = wave;
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
