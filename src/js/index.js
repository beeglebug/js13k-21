document.getElementById("g").appendChild(canvas);

bindInput(document);

document.addEventListener("visibilitychange", () => {
  running = document.visibilityState === "visible";
});

document.addEventListener("contextmenu", (e) => {
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
img.onload = loadComplete;
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

let whiteFont;

let logoForeground;
let logoBackground;

function loadComplete() {
  whiteSprites = tint(img, "#FFFFFF");
  spritesCtx.drawImage(img, 0, 0);

  whiteFontCtx.drawImage(img, 0, 59, 132, 5, 0, 0, 132, 5);

  whiteFont = whiteFontCanvas;

  logoBackground = createLogo();
  logoForeground = tint(logoBackground, "#0078f8");

  // generate pixel map cache
  // TODO multiple enemies / player animation frames
  pixelMaps.player = getPixelMap(spritesCtx, 0, 0, 32, 32);
  pixelMaps.bullet = getPixelMap(spritesCtx, 32, 0, 4, 7);
  pixelMaps.enemyBullet = getPixelMap(spritesCtx, 32, 8, 5, 5);
  pixelMaps.enemy = getPixelMap(spritesCtx, 39, 0, 18, 18);

  // needs doing after pixel maps
  createPlayer();
  createEnemies();

  // enterLevel
  currentLevel = loadLevel(level1);

  enterMenu();

  loop();

  // drawPlanet();
  // drawGreebles();
}

const tickRate = 1 / 60;
let adt = 0; // accumulated delta time

function loop() {
  requestAnimationFrame(loop);
  let delta = tick();
  adt += delta;
  while (adt >= tickRate) {
    adt -= tickRate;
    update(tickRate);
  }
  render(adt);
}

function update(delta) {
  if (running === false) return;

  handleInput();

  if (state === STATE_GAME) {
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

    [player, ...bullets, ...enemyBullets].forEach((item) => {
      if (item.velocity) {
        item.x += item.velocity.x;
        item.y += item.velocity.y;
      }
    });
    shootingClock.update(delta);
    updateEnemies(delta);
    updateLevel(delta);
    collision();
  }
  updateBackground();
  updateTweens(delta);
  updateAnimations(delta);
}
