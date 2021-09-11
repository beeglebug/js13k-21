const width = 512;
const height = 672;
const scale = 4;

const [canvas, ctx] = createCanvas(width, height);

document.getElementById("g").appendChild(canvas);

ctx.imageSmoothingEnabled = false;

const img = new Image();
img.onload = loadComplete;
img.src = "sprites.png";

const getMouseTile = (e) => {
  const canvasPos = canvas.getBoundingClientRect();
  const ex = e.clientX - canvasPos.x;
  const ey = e.clientY - canvasPos.y;
  const x = Math.floor(ex / gridSize / scale);
  const y = Math.floor(ey / gridSize / scale);
  return { x, y };
};

let mouseTile = { x: 0, y: 0 };

let lastChangedCoords = null;
let lastChangedFrom = null;

canvas.addEventListener("mousemove", (e) => {
  mouseTile = getMouseTile(e);
});

canvas.addEventListener("click", (e) => {
  let { x, y } = mouseTile;
  if (y < 5) {
    selected = x + y * spriteWidth;
  } else {
    y -= 5;
    lastChangedCoords = { x, y };
    lastChangedFrom = design[y][x];
    design[y][x] = selected;
  }
});

document.addEventListener("keydown", function (event) {
  if (event.metaKey && event.key === "z") {
    undo();
  }
});

function undo() {
  let { x, y } = lastChangedCoords;
  design[y][x] = lastChangedFrom;
}

function loadComplete() {
  loop();
}

function loop() {
  requestAnimationFrame(loop);
  draw();
}

const gridSize = 8;
let selected = 0;
const spriteWidth = 16;

const stored = window.localStorage.getItem("design");
// prettier-ignore
const emptyDesign = JSON.stringify([
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
]);

let design = stored ? JSON.parse(stored) : JSON.parse(emptyDesign);

function wipe() {
  design = JSON.parse(emptyDesign);
}

function draw() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(img, 56, 16, 136, 40, 0, 0, 136 * scale, 40 * scale);

  ctx.translate(0.5, 0.5);

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#222222";
  ctx.beginPath();

  for (let x = 0; x <= width; x += gridSize * scale) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  for (let y = 0; y <= height; y += gridSize * scale) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();

  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(0, 5 * gridSize * scale);
  ctx.lineTo(width, 5 * gridSize * scale);
  ctx.stroke();

  ctx.translate(-0.5, -0.5);

  for (let y = 0; y < design.length; y++) {
    for (let x = 0; x < design[0].length; x++) {
      tile = design[y][x];
      if (tile === null) continue;
      const tx = tile % spriteWidth;
      const ty = Math.floor(tile / spriteWidth);
      const sx = 56 + tx * gridSize;
      const sy = 16 + ty * gridSize;
      const dx = x * gridSize * scale;
      const dy = (y + 5) * gridSize * scale;

      ctx.drawImage(
        img,
        sx,
        sy,
        8,
        8,
        dx,
        dy,
        gridSize * scale,
        gridSize * scale
      );
    }
  }

  ctx.translate(0.5, 0.5);

  const i = selected;
  const tx = i % spriteWidth;
  const ty = Math.floor(i / spriteWidth);

  strokeRectTile(mouseTile.x, mouseTile.y, "#dddddd");
  strokeRectTile(tx, ty, "#77ff77");

  ctx.translate(-0.5, -0.5);
}

function strokeRectTile(x, y, color) {
  ctx.strokeStyle = color;
  ctx.strokeRect(
    x * gridSize * scale,
    y * gridSize * scale,
    gridSize * scale,
    gridSize * scale
  );
}

// TODO show coords on screen
// TODO export function console.log(subset)
