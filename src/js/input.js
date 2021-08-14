// SAVING = use numeric codes
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

const downKeys = {};

function handleKeydown({ code }) {
  downKeys[code] = true;
}

function handleKeyup({ code }) {
  downKeys[code] = false;
}

function keyDown(...keys) {
  return keys.some((key) => !!downKeys[key]);
}

function bindInput(target) {
  target.addEventListener("keydown", handleKeydown);
  target.addEventListener("keyup", handleKeyup);
}

function handleInput() {
  if (keyDown(KEY_W, KEY_Z, KEY_UP)) {
    // up
  }

  if (keyDown(KEY_S, KEY_DOWN)) {
    // down
  }

  if (keyDown(KEY_A, KEY_Q, KEY_LEFT)) {
    // left
  }

  if (keyDown(KEY_D, KEY_RIGHT)) {
    // right
  }
}
