// SAVING use numeric codes
const KEY_W = "KeyW";
const KEY_A = "KeyA";
const KEY_S = "KeyS";
const KEY_D = "KeyD";
const KEY_Q = "KeyQ";
const KEY_Z = "KeyZ";
const KEY_LEFT = "ArrowLeft";
const KEY_UP = "ArrowUp";
const KEY_RIGHT = "ArrowRight";
const KEY_DOWN = "ArrowDown";
const KEY_SPACE = "Space";
const KEY_ENTER = "Enter";

const downKeys = {};

function bindInput(target) {
  target.addEventListener("keydown", ({ code }) => {
    if (state === STATE_MAIN_MENU) {
      if ([KEY_SPACE, KEY_ENTER].includes(code)) {
        menu.items[menu.selected].fn();
      }

      if ([KEY_W, KEY_Z, KEY_UP].includes(code)) {
        menu.selected--;
        if (menu.selected < 0) {
          menu.selected = menu.items.length - 1;
        }
      }
      if ([KEY_S, KEY_DOWN].includes(code)) {
        menu.selected++;
        if (menu.selected >= menu.items.length) {
          menu.selected = 0;
        }
      }
    }

    downKeys[code] = true;
  });
  target.addEventListener("keyup", ({ code }) => {
    downKeys[code] = false;
  });
}

function keyDown(...keys) {
  return keys.some((key) => !!downKeys[key]);
}

function handleInput() {
  let velocity = zero(player.velocity);

  if (state !== STATE_GAME || player.hasControl === false) return;

  if (keyDown(KEY_SPACE)) {
    player.shoot();
  }

  if (keyDown(KEY_W, KEY_Z, KEY_UP)) {
    // up
    velocity.y -= 1;
  }

  if (keyDown(KEY_S, KEY_DOWN)) {
    // down
    velocity.y += 1;
  }

  if (keyDown(KEY_A, KEY_Q, KEY_LEFT)) {
    // left
    velocity.x -= 1;
  }

  if (keyDown(KEY_D, KEY_RIGHT)) {
    // right
    velocity.x += 1;
  }

  normalize(velocity);
  multiply(velocity, player.speed);

  player.velocity = velocity;
}
