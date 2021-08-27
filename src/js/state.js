const STATE_MENU = 0;
const STATE_GAME = 1;

let state = STATE_MENU;

let menu = {
  logoY: -100,
};

function enterMenu() {
  menu.logoY = -100;
  createTween(menu, "logoY", 100, 1000);
}
