const STATE_MAIN_MENU = 0;
const STATE_GAME = 1;
const STATE_SETTINGS = 2;

let state = STATE_MAIN_MENU;

let menu = {
  logoY: -100,
  selected: 0,
  items: [
    {
      text: "new game",
      fn: () => {
        state = STATE_GAME;
        // TODO reset level etc
      },
    },
    {
      text: "settings",
      fn: () => {
        state = STATE_SETTINGS;
      },
    },
  ],
};

function enterMenu() {
  menu.logoY = -100;
  player.y = height + 100;
  createTween(menu, "logoY", 80, 1000);
  createTween(player, "y", 320, 1000);
}

function enterGame() {
  player.y = height + 100;
  createTween(player, "y", 300, 1000);
}
