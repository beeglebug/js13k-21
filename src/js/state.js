const STATE_MAIN_MENU = 0;
const STATE_GAME = 1;
const STATE_SETTINGS = 2;
const STATE_GAME_OVER = 3;

let state = STATE_MAIN_MENU;

let menu = {
  y: 200,
  logoY: -100,
  selected: 0,
  items: [
    {
      text: "new game",
      fn: () => {
        state = STATE_GAME;
        enterGame();
        // TODO setState(STATE_GAME)
        // TODO reset level etc
      },
    },
  ],
};

function enterMenu() {
  menu.logoY = -100;
  getTouchAreas(menu);
  player.y = height + 50;
  createTween(menu, "logoY", 80, 1000);
  createTween(player, "y", 320, 1000);
}

function enterGame() {
  setTimeout(() => {
    player.hasControl = true;
  }, 500);
}

function enterGameOver() {}
