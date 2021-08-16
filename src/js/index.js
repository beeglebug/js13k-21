const width = 240;
const height = 426;

const [canvas, ctx] = createCanvas(width, height);

document.getElementById("g").appendChild(canvas);

bindInput(document);

let running = true;

document.addEventListener("visibilitychange", () => {
  running = document.visibilityState === "visible";
});

const img = new Image();
img.onload = init;
img.src = "sprites.png";

const player = {
  x: width / 2,
  y: height - 50,
  alive: true,
  sprite: {
    source: img,
    width: 32,
    height: 32,
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
};

let bullets = [];
let enemyBullets = [];
let enemies = [
  {
    x: width / 2,
    y: 50,
    alive: true,
    sprite: {
      source: img,
      width: 18,
      height: 18,
      x: 39,
      y: 0,
    },
  },
];

const scene = {
  x: 0,
  y: 0,
  children: [player, ...bullets, ...enemies, ...enemyBullets],
};

let whiteSprites;
let [sprites, spritesCtx] = createCanvas(256, 256);
let pixelMaps = {};

function init() {
  whiteSprites = tint(img, "#FFFFFF");
  spritesCtx.drawImage(img, 0, 0);

  pixelMaps.player = getPixelMap(spritesCtx, 0, 0, 32, 32);
  // console.log(pixelMaps);

  loop();
  drawPlanet();
  drawGreebles();
  setInterval(() => {
    if (!running) return;
    enemyShoot(enemies[0]);
    console.log(scene.children.length);
    // flashSprite(player);
  }, 600);
}

function flashSprite(target, delay = 100) {
  const original = target.sprite.source;
  target.sprite.source = whiteSprites;
  setTimeout(() => (target.sprite.source = original), delay);
}

function loop() {
  requestAnimationFrame(loop);

  handleInput();

  [player, ...bullets, ...enemyBullets].forEach((item) => {
    item.x += item.velocity.x;
    item.y += item.velocity.y;
  });

  // collision
  enemyBullets.forEach((bullet) => {
    // collide world boundary
    if (bullet.x < 0 || bullet.x > width || bullet.y > height || bullet.y < 0) {
      bullet.alive = false;
    }
  });

  enemyBullets = enemyBullets.filter((item) => item.alive);
  scene.children = scene.children.filter((item) => item.alive);

  render();
}

function enemyShoot(enemy) {
  const count = 5;
  const spread = Math.PI / 2; // 90 degree arc
  const increment = spread / count;
  const initial = { x: 0, y: 1 };
  const start = rotate(initial, -increment * Math.round(count / 2));
  times(count, () => {
    const velocity = { ...rotate(start, increment) };
    const bullet = {
      x: enemy.x,
      y: enemy.y,
      alive: true,
      sprite: {
        source: img,
        x: 32,
        y: 8,
        width: 5,
        height: 5,
      },
      velocity: multiply(velocity, 1.5),
    };
    scene.children.push(bullet);
    enemyBullets.push(bullet);
  });
  // rotate(initial, -0.05);
}

function shoot() {
  const bullet = {
    x: player.x,
    y: player.y,
    alive: true,
    sprite: {
      source: img,
      x: 32,
      y: 0,
      width: 4,
      height: 7,
    },
    velocity: {
      x: 0,
      y: -5,
    },
  };
  scene.children.push(bullet);
  bullets.push(bullet);
}

function render() {
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(planetCanvas, 0, 0, 512, 512);

  scene.children.forEach((child) => {
    const { x, y, sprite } = child;
    const { x: sx, y: sy, width, height, source } = sprite;
    ctx.drawImage(
      source,
      sx,
      sy,
      width,
      height,
      x - Math.floor(width / 2),
      y - Math.floor(height / 2),
      width,
      height
    );
  });
}
