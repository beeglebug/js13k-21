const STATE_MAIN_MENU = 0;
const STATE_GAME = 1;
const STATE_SETTINGS = 2;
const STATE_GAME_OVER = 3;
const STATE_WIN = 4;

let state = STATE_MAIN_MENU;

let menu = {
  y: 200,
  logoY: -100,
  selected: 0,
  items: [
    {
      text: "new game",
      fn: newGame,
    },
  ],
};

function enterMenu() {
  menu.logoY = -100;
  player.y = height + 50;
  createTween(menu, "logoY", 80, 1000);
  createTween(player, "y", 320, 1000);
}

function newGame() {
  state = STATE_GAME;
  currentLevel = loadLevel(level1);
  score = 0;
  lives = 3;
  setTimeout(() => {
    player.hasControl = true;
  }, 500);
}

function win() {
  if (lives === 0) return; // stop win + lose happening
  state = STATE_WIN;
  player.hasControl = false;
  zero(player.velocity);
  createTween(player, "x", width / 2, 1000);
  createTween(player, "y", 320, 1000);
  bullets = [];
  effects = [];
  setTimeout(() => {
    saveHiScore();
    state = STATE_MAIN_MENU;
  }, 3000);
}

function lose() {
  state = STATE_GAME_OVER;
  player.hasControl = false;
  zero(player.velocity);
  setTimeout(() => {
    saveHiScore();
    state = STATE_MAIN_MENU;
    enemies = [];
    enemyBullets = [];
    bullets = [];
    effects = [];
    // go away
    player.y = 9999;
  }, 3000);
}

function saveHiScore() {
  if (score > hiScore) {
    localStorage.setItem(hiScoreKey, score);
    hiScore = score;
  }
}
