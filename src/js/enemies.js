function createEnemies() {
  const sprites = createEnemySprites();

  enemyTemplates.drone = {
    ...getSprite(sprites.drone),
    alive: true,
    hp: 1,
    speed: 1.5,
  };

  enemyTemplates.fighter = {
    ...getSprite(sprites.fighter),
    alive: true,
    hp: 3,
    speed: 2,
  };

  enemyTemplates.fighter2 = {
    ...getSprite(sprites.fighter2),
    alive: true,
    hp: 3,
    speed: 2,
  };

  enemyTemplates.frigate = {
    ...getSprite(sprites.frigate),
    alive: true,
    hp: 5,
    speed: 1,
  };

  enemyTemplates.bomber = {
    ...getSprite(sprites.bomber),
    alive: true,
    hp: 10,
    speed: 1,
  };

  enemyTemplates.boss = {
    ...getSprite(sprites.boss),
    alive: true,
    hp: 10,
    speed: 1,
  };
}

function getSprite(sprite) {
  return {
    source: sprite,
    flashSprite: tint(sprite, "#FFFFFF"),
    width: sprite.width,
    height: sprite.height,
    pixelMap: getPixelMapFromCanvas(sprite),
    sx: 0,
    sy: 0,
  };
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

const droneLayout = [
  [null, 51, null],
  [40, 35, 41],
  [null, 52, null],
];

const fighterLayout = [
  [6, 50, 7],
  [22, 48, 23],
];

const bomberLayout = [
  [8, 36, 9],
  [18, 33, 19],
  [22, 48, 23],
];

const fighter2Layout = [
  [null, 49, null],
  [6, 37, 7],
  [54, 59, 55],
];

const frigateLayout = [
  [null, 57, null],
  [22, 35, 23],
  [40, 33, 41],
  [40, 33, 41],
  [6, 35, 7],
  [22, 52, 23],
];

const bossLayout = [
  [0, 5, 57, 4, 1],
  [18, 35, 32, 35, 19],
  [40, 32, 33, 32, 41],
  [2, 35, 32, 35, 3],
  [16, 21, 56, 20, 17],
];

function createEnemySprites() {
  return {
    drone: createEnemySprite(droneLayout),
    fighter: createEnemySprite(fighterLayout),
    fighter2: createEnemySprite(fighter2Layout),
    frigate: createEnemySprite(frigateLayout),
    bomber: createEnemySprite(bomberLayout),
    boss: createEnemySprite(bossLayout),
  };
}

function createEnemySprite(design) {
  const tileSize = 8;
  const spriteWidth = 16; // tiles across

  const height = design.length * tileSize;
  const width = design[0].length * tileSize;
  const [canvas, ctx] = createCanvas(width, height);

  const offsetX = 56;
  const offsetY = 16;

  for (let y = 0; y < design.length; y++) {
    for (let x = 0; x < design[0].length; x++) {
      let tile = design[y][x];
      if (tile === null) continue;
      const tx = tile % spriteWidth;
      const ty = Math.floor(tile / spriteWidth);
      const sx = offsetX + tx * tileSize;
      const sy = offsetY + ty * tileSize;
      const dx = x * tileSize;
      const dy = y * tileSize;

      ctx.drawImage(
        img,
        sx,
        sy,
        tileSize,
        tileSize,
        dx,
        dy,
        tileSize,
        tileSize
      );
    }
  }

  document.body.appendChild(canvas);
  return canvas;
}
