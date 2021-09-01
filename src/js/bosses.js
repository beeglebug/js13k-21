const [bossCanvas, bossCtx] = createCanvas(256, 256);

// treat boss pieces as mini spritesheet

function createBoss() {
  const ox = 112;
  const oy = 0;

  const bossWidth = 3;
  // prettier-ignore
  const tiles = [
     16, 10, 17,
     0, 6, 0,
     13, 3, 14,
     0, 6, 0,
     13, 3, 14,
     0, 6, 0,
     13, 3, 14,
     0, 6, 0,
     19, 10, 20,
  ];

  // const bossWidth = 5;
  // const tiles = [
  //   0, 1, 10, 2, 0,
  //   7, 11, 3, 11, 7,
  //   0, 4, 10, 5, 0,
  // ];

  const spriteWidth = 3;
  for (let y = 0; y < tiles.length / bossWidth; y++) {
    for (let x = 0; x < bossWidth; x++) {
      const ix = x + y * bossWidth;
      const i = tiles[ix];
      if (i === 0) continue;
      const tx = i % spriteWidth;
      const ty = Math.floor(i / spriteWidth);
      const sx = ox + 8 * tx;
      const sy = oy + 8 * ty;
      bossCtx.drawImage(sprites, sx, sy, 8, 8, x * 8, y * 8, 8, 8);
    }
  }
}
