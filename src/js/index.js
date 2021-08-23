document.getElementById("g").appendChild(canvas);

bindInput(document);

document.addEventListener("visibilitychange", () => {
  running = document.visibilityState === "visible";
});

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("touchstart", (e) => {
  touchTarget = {
    x: (e.touches[0].clientX - canvasPos.x) / scale,
    y: (e.touches[0].clientY - canvasPos.y) / scale,
  };
});

document.addEventListener("touchend", () => {
  touchTarget = null;
});

document.addEventListener("touchmove", (e) => {
  const x = (e.changedTouches[0].clientX - canvasPos.x) / scale;
  const y = (e.changedTouches[0].clientY - canvasPos.y) / scale;
  touchTarget = { x, y };
});

const img = new Image();
img.onload = init;
img.src = "sprites.png";

// TODO make into display nodes with children
let bullets = [];
let enemyBullets = [];
let enemies = [];

const scene = {
  x: 0,
  y: 0,
  children: [],
};

function init() {
  whiteSprites = tint(img, "#FFFFFF");
  spritesCtx.drawImage(img, 0, 0);

  // generate pixel map cache
  // TODO multiple enemies / player animation frames
  pixelMaps.player = getPixelMap(spritesCtx, 0, 0, 32, 32);
  pixelMaps.bullet = getPixelMap(spritesCtx, 32, 0, 4, 7);
  pixelMaps.enemyBullet = getPixelMap(spritesCtx, 32, 8, 5, 5);
  pixelMaps.enemy = getPixelMap(spritesCtx, 39, 0, 18, 18);

  createPlayer();
  createEnemies();

  currentLevel = loadLevel(level1);

  loop();

  // drawPlanet();
  // drawGreebles();

  backgroundLayers = [
    {
      y: 0,
      img: drawStars(2, 30, 0.8),
      speed: 1.2,
    },
    {
      y: 0,
      img: drawStars(1, 100, 0.7),
      speed: 1,
    },
    {
      y: 0,
      img: drawStars(1, 200, 0.6),
      speed: 0.8,
    },
  ];
}

function loop() {
  requestAnimationFrame(loop);
  let delta = tick();

  if (running === false) return;

  handleInput();

  if (player.velocity.x > 0) {
    player.sy = 17;
    player.children[0].x = -7;
    player.children[1].x = 7;
  } else if (player.velocity.x < 0) {
    player.sy = 34;
    player.children[0].x = 7;
    player.children[1].x = -7;
  } else {
    player.sy = 0;
    player.children[0].x = -10;
    player.children[1].x = 10;
  }

  if (player.velocity.y < 0) {
    player.children[0].frames = engineFramesBoost;
    player.children[1].frames = engineFramesBoost;
  } else if (player.velocity.y > 0) {
    player.children[0].frames = engineFramesBrake;
    player.children[1].frames = engineFramesBrake;
  } else {
    player.children[0].frames = engineFrames;
    player.children[1].frames = engineFrames;
  }

  scene.children.forEach((item) => {
    if (item.velocity) {
      item.x += item.velocity.x;
      item.y += item.velocity.y;
    }
  });

  shootingClock.update(delta);
  updateBackground();
  updateAnimations(delta);
  updateEnemies(delta);
  updateLevel(delta);

  collision();

  render();
}
