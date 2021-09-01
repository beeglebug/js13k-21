function rotate(v, radians) {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  let x = v.x;
  v.x = v.x * c - v.y * s;
  v.y = x * s + v.y * c;
  return v;
}

function perp(v1, v2) {
  const out = v2 || {};
  out.x = v1.y;
  out.y = -v1.x;
  return out;
}

function zero(v) {
  v.x = 0;
  v.y = 0;
  return v;
}

function isZero(v) {
  return v.x === 0 && v.y === 0;
}

function magnitude(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function setMagnitude(v, m) {
  return multiply(normalize(v), m);
}

function copy(v) {
  return {
    x: v.x,
    y: v.y,
  };
}

function set(v, x, y) {
  v.x = x;
  v.y = y;
  return v;
}

function normalize(v) {
  if (isZero(v)) return v;

  if (v.x === 0) {
    v.y = v.y > 0 ? 1 : -1;
    return v;
  }

  if (v.y === 0) {
    v.x = v.x > 0 ? 1 : -1;
    return v;
  }

  const m = magnitude(v);

  v.x /= m;
  v.y /= m;

  return v;
}

function distanceTo(v1, v2) {
  return magnitude(sub(v1, v2));
}

function add(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
}

function sub(v1, v2) {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
  };
}

function multiply(v, scalar) {
  v.x *= scalar;
  v.y *= scalar;
  return v;
}

function cross(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

function dot(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

function abs(v) {
  v.x = Math.abs(v.x);
  v.y = Math.abs(v.y);
  return v;
}
