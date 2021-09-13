const center = width / 2;

const pathMiddleWavy = bakeBezierPath([
  { x: center, y: -50 },
  { x: center - 100, y: 100 },
  { x: center + 100, y: height - 100 },
  { x: center, y: height },
]);

const bossloop = [
  ...bakeBezierPath([
    { x: center, y: 100 },
    { x: center + 200, y: 300 },
    { x: center - 200, y: 300 },
    { x: center, y: 100 },
  ]),
  { x: center, y: 200 },
  { x: center, y: 100 },
];

const bossPath = [
  { x: center, y: -100 },
  { x: center, y: 200 },
  ...bossloop,
  ...bossloop,
  ...bossloop,
  ...bossloop,
  ...bossloop,
  ...bossloop,
  ...bossloop,
  ...bossloop,
  ...bossloop,
];

const pathSwoopRight = bakeBezierPath([
  { x: width - 50, y: -100 },
  { x: 50, y: 100 },
  { x: center - 200, y: 300 },
  { x: width + 50, y: height },
]);

const pathSwoopLeft = bakeBezierPath([
  { x: 50, y: -100 },
  { x: width - 50, y: 100 },
  { x: width, y: 300 },
  { x: -50, y: height },
]);

const pathSwoopDown = bakeBezierPath([
  { x: width - 50, y: -50 },
  { x: center + 100, y: height },
  { x: center - 100, y: height },
  { x: 50, y: -50 },
]);

const pathLeftAcross = bakeBezierPath([
  { x: 50, y: -50 },
  { x: center - 100, y: 200 },
  { x: center + 100, y: height - 200 },
  { x: width - 50, y: height },
]);

const pathRightAcross = bakeBezierPath([
  { x: width - 50, y: -50 },
  { x: center + 100, y: height - 200 },
  { x: center - 100, y: 200 },
  { x: 50, y: height },
]);

const pathLeftStraightDown = [
  { x: 50, y: -50 },
  { x: 50, y: height + 50 },
];

const pathMiddleStraightDown = [
  { x: center, y: -50 },
  { x: center, y: height + 50 },
];

const pathRightStraightDown = [
  { x: width - 50, y: -50 },
  { x: width - 50, y: height + 50 },
];

const level1 = {
  waves: [
    [0, EnemyDrone, pathLeftStraightDown, 3, 800],
    [0, EnemyDrone, pathRightStraightDown, 3, 800],
    [3000, EnemyFrigate, pathMiddleStraightDown, 3, 2000],
    [5000, EnemyScout, pathLeftAcross],
    [5000, EnemyScout, pathRightAcross],
    [10000, EnemyScout, pathLeftAcross, 2, 1000],
    [10000, EnemyScout, pathRightAcross, 2, 1000],
    [13000, EnemyFighter, pathLeftAcross, 3, 2000],
    [13000, EnemyFighter, pathRightAcross, 3, 2000],
    [19000, EnemyFrigate, pathLeftStraightDown],
    [19000, EnemyFrigate, pathRightStraightDown],
    [20000, EnemyBomber, pathSwoopLeft],
    [20000, EnemyBomber, pathSwoopRight],
    [22000, EnemyDrone, pathSwoopDown, 5, 800],
    [25000, EnemyScout, pathLeftAcross, 2, 1000],
    [25000, EnemyScout, pathRightAcross, 2, 1000],
    [28000, EnemyFighter, pathLeftAcross, 3, 2000],
    [28000, EnemyFighter, pathRightAcross, 3, 2000],
    [35000, EnemyBoss, bossPath],
  ],
};

function loadLevel(level) {
  const events = [];
  for (let i = 0; i < level.waves.length; i++) {
    const wave = level.waves[i];
    const [time, enemyType, path, count = 1, interval = 1] = wave;
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
