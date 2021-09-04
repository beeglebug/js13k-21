document.getElementById("g").appendChild(canvas);

bindInput(document);

document.addEventListener("visibilitychange", () => {
  running = document.visibilityState === "visible";
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("click", (e) => {
  if (state !== STATE_MAIN_MENU) return;
  const target = {
    x: (e.clientX - canvasPos.x) / scale,
    y: (e.clientY - canvasPos.y) / scale,
  };
  const selected = menu.items.find((item) => pointInRect(target, item.rect));
  if (selected) {
    selected.fn();
  }
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
  logoForeground = tint(logoBackground, "#5b6ee1");

  // generate pixel map cache
  // TODO multiple enemies / player animation frames
  pixelMaps.player = getPixelMap(spritesCtx, 0, 0, 32, 32);
  pixelMaps.bullet = getPixelMap(spritesCtx, 32, 0, 9, 6);
  pixelMaps.enemyBullet = getPixelMap(spritesCtx, 32, 8, 5, 5);
  pixelMaps.enemy = getPixelMap(spritesCtx, 32, 32, 18, 18);

  canvasPos = canvas.getBoundingClientRect();

  // needs doing after pixel maps
  createPlayer();
  createEnemies();
  createBoss();

  // enterLevel
  currentLevel = loadLevel(level1);

  enterMenu();

  loop();

  // drawPlanet();
  // drawGreebles();
}

function loop() {
  requestAnimationFrame(loop);
  let delta = tick();
  update(delta);
  render();
}

let shootingCooldown = 0;

function update(delta) {
  if (running === false) return;

  handleInput();

  if (state === STATE_GAME) {
    // reset animations etc
    player.children[0].frames = engineFrames;
    player.children[1].frames = engineFrames;
    player.sy = 0;
    set(player.children[0], -9, 10);
    set(player.children[1], 9, 10);

    if (player.velocity.x > 0) {
      player.sy = 16;
      set(player.children[0], -7, 9);
      set(player.children[1], 7, 12);
      player.children[0].frames = engineFramesBoost;
    }

    if (player.velocity.x < 0) {
      player.sy = 32;
      set(player.children[0], -7, 12);
      set(player.children[1], 7, 9);
      player.children[1].frames = engineFramesBoost;
    }

    if (player.velocity.y < 0) {
      player.children[0].frames = engineFramesBoost;
      player.children[1].frames = engineFramesBoost;
    }
  }

  if (state === STATE_GAME || state === STATE_GAME_OVER) {
    [player, ...bullets, ...enemyBullets].forEach((item) => {
      if (item.velocity) {
        item.x += item.velocity.x;
        item.y += item.velocity.y;
      }
    });

    shootingCooldown -= delta * 1000;
    if (shootingCooldown < 0) shootingCooldown = 0;

    updateEnemies(delta);
    updateLevel(delta);
    collision();
  }

  updateBackground();
  updateTweens(delta);
  updateAnimations(delta);
}
