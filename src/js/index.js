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

let bullets = [];
let enemyBullets = [];
let enemies = [];
let effects = [];

let whiteFont;
let yellowFont;
let redFont;

let logoForeground;
let logoBackground;
let gameOverImage;

function loadComplete() {
  whiteSprites = tint(img, "#FFFFFF");
  spritesCtx.drawImage(img, 0, 0);

  whiteFontCtx.drawImage(img, 0, 59, 132, 5, 0, 0, 132, 5);

  whiteFont = whiteFontCanvas;
  yellowFont = tint(whiteFontCanvas, "#FFFF00");
  redFont = tint(whiteFontCanvas, "#FF0000");
  greenFont = tint(whiteFontCanvas, "#00FF00");

  logoBackground = createLogo();
  logoForeground = tint(logoBackground, "#5b6ee1");

  gameOverImage = createGameOverImage();
  winImage = createWinImage();

  getTouchAreas(menu);

  // generate pixel map cache
  // TODO multiple enemies / player animation frames

  pixelMaps.bullet = getPixelMap(spritesCtx, 24, 0, 9, 6);
  pixelMaps.enemyBullet = getPixelMap(spritesCtx, 24, 8, 5, 5);

  canvasPos = canvas.getBoundingClientRect();

  // needs doing after pixel maps
  player = new Player();
  enemySprites = createEnemySprites();

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

function update(delta) {
  if (running === false) return;

  handleInput();

  if (state === STATE_GAME) {
    // reset animations etc
    player.engineTrailLeft.frames = engineFrames;
    player.engineTrailRight.frames = engineFrames;
    player.sy = 0;
    set(player.engineTrailLeft, -9, 10);
    set(player.engineTrailRight, 9, 10);

    if (player.velocity.x > 0) {
      player.sy = 16;
      set(player.engineTrailLeft, -7, 9);
      set(player.engineTrailRight, 7, 12);
      player.engineTrailLeft.frames = engineFramesBoost;
    }

    if (player.velocity.x < 0) {
      player.sy = 32;
      set(player.engineTrailLeft, -7, 12);
      set(player.engineTrailRight, 7, 9);
      player.engineTrailRight.frames = engineFramesBoost;
    }

    if (player.velocity.y < 0) {
      player.engineTrailLeft.frames = engineFramesBoost;
      player.engineTrailRight.frames = engineFramesBoost;
    }
  }

  if (state === STATE_GAME || state === STATE_GAME_OVER) {
    player.update(delta);
    enemies.forEach((entity) => entity.update(delta));
    enemyBullets.forEach((entity) => entity.update(delta));
    bullets.forEach((entity) => entity.update(delta));

    updateLevel(delta);
    collision();
  }

  updateBackground();
  updateTweens(delta);
  updateAnimations(delta);
}
