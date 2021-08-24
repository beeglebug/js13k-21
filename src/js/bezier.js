function bezier(path, t) {
  const [p0, p1, p2, p3] = path;

  const cx = 3 * (p1.x - p0.x);
  const bc = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bc;

  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;

  return {
    x: ax * Math.pow(t, 3) + bc * Math.pow(t, 2) + cx * t + p0.x,
    y: ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y,
  };
}
