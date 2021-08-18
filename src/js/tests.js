const assert = (a, b) => {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    console.log("%c PASS ", "background: #53c655; color: #ffffff");
  } else {
    console.log("%c FAIL ", "background: #c42323; color: #ffffff");
    console.log(" %c EXPECTED ", "background: #888; color: #ffffff", b);
    console.log(" %c ACTUAL ", "background: #888; color: #ffffff", a);
  }
};

assert(
  collideRectRect(
    { x: 1, y: 1, width: 2, height: 2 },
    { x: 3, y: 3, width: 2, height: 2 }
  ),
  false
);
assert(
  collideRectRect(
    { x: 2, y: 2, width: 2, height: 2 },
    { x: 2, y: 6, width: 4, height: 4 }
  ),
  false
);
assert(
  collideRectRect(
    { x: 1, y: 1, width: 2, height: 2 },
    { x: 2, y: 2, width: 2, height: 2 }
  ),
  { x: 1.5, y: 1.5, width: 1, height: 1 }
);
assert(
  collideRectRect(
    { x: 1, y: 1, width: 2, height: 2 },
    { x: 0, y: 2, width: 2, height: 2 }
  ),
  { x: 0.5, y: 1.5, width: 1, height: 1 }
);
assert(
  collideRectRect(
    { x: 1, y: 1, width: 2, height: 2 },
    { x: 2, y: 0, width: 2, height: 2 }
  ),
  { x: 1.5, y: 0.5, width: 1, height: 1 }
);
assert(
  collideRectRect(
    { x: 1, y: 1, width: 2, height: 2 },
    { x: 0, y: 0, width: 2, height: 2 }
  ),
  { x: 0.5, y: 0.5, width: 1, height: 1 }
);
assert(
  collideRectRect(
    { x: 2, y: 2, width: 4, height: 4 },
    { x: 1.5, y: 1.5, width: 1, height: 1 }
  ),
  { x: 1.5, y: 1.5, width: 1, height: 1 }
);
assert(
  collideRectRect(
    { x: 3, y: 3, width: 4, height: 4 },
    { x: 4.5, y: 3, width: 3, height: 2 }
  ),
  { x: 4, y: 3, width: 2, height: 2 }
);

const r1 = {
  x: 1,
  y: 1,
  width: 3,
  height: 3,
  pixelMap: [
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ],
};
const r2 = {
  x: 2,
  y: 2,
  width: 3,
  height: 3,
  pixelMap: [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ],
};

assert(collidePixels(r1, r2, collideRectRect(r1, r2)), true);
assert(collidePixels(r2, r1, collideRectRect(r2, r1)), true);
