const droneTiles = [
  [null, 51, null],
  [40, 35, 41],
  [null, 52, null],
];

const fighterTiles = [
  [6, 50, 7],
  [22, 48, 23],
];

const bomberTiles = [
  [8, 36, 9],
  [18, 33, 19],
  [22, 48, 23],
];

const fighter2Tiles = [
  [null, 49, null],
  [6, 37, 7],
  [54, 59, 55],
];

const frigateTiles = [
  [null, 57, null],
  [22, 35, 23],
  [40, 33, 41],
  [40, 33, 41],
  [6, 35, 7],
  [22, 52, 23],
];

const bossTiles = [
  [0, 5, 57, 4, 1],
  [18, 35, 32, 35, 19],
  [40, 32, 33, 32, 41],
  [2, 35, 32, 35, 3],
  [16, 21, 56, 20, 17],
];

function createEnemySprites() {
  return {
    drone: createEnemySprite(droneTiles),
    fighter: createEnemySprite(fighterTiles),
    fighter2: createEnemySprite(fighter2Tiles),
    frigate: createEnemySprite(frigateTiles),
    bomber: createEnemySprite(bomberTiles),
    boss: createEnemySprite(bossTiles),
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

  return canvas;
}
