function closestPointRect(point, rect, output = { x: 0, y: 0 }) {
  if (point.x < rect.x) {
    output.x = rect.x;
  } else if (point.x > rect.x + rect.width) {
    output.x = rect.x + rect.width;
  } else {
    output.x = point.x;
  }

  if (point.y < rect.y) {
    output.y = rect.y;
  } else if (point.y > rect.y + rect.height) {
    output.y = rect.y + rect.height;
  } else {
    output.y = point.y;
  }

  return output;
}

function closestPointCircle(point, circle, output = { x: 0, y: 0 }) {
  output.x = point.x;
  output.y = point.y;

  if (!pointInCircle(point, circle)) {
    output.x -= circle.x;
    output.y -= circle.y;

    setMagnitude(output, circle.radius);

    output.x += circle.x;
    output.y += circle.y;
  }

  return output;
}

function collideCircleRect(circle, rect) {
  const point = closestPointRect(circle, rect);

  if (!pointInCircle(point, circle)) return false;

  const distance = distanceTo(point, circle);
  const depth = circle.radius - distance;

  const normal = normalize({
    x: circle.x - point.x,
    y: circle.y - point.y,
  });

  // TODO handle point inside, normal is whack
  if (normal.x === 0 && normal.y === 0) {
    // debugger
  }

  return {
    ...point,
    normal,
    depth,
  };
}

function collideCircleCircle(circle1, circle2) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const dr = circle1.radius + circle2.radius;

  // no need for sqrt
  const distance = dx * dx + dy * dy;
  const r2 = dr * dr;

  if (distance.toFixed(5) >= r2.toFixed(5)) return false;

  const point = closestPointCircle(circle1, circle2);

  const normal = normalize({
    x: dx,
    y: dy,
  });

  const depth = circle1.radius - distanceTo(circle1, point);

  return {
    ...point,
    normal,
    depth,
  };
}

function pointInCircle(point, circle) {
  const dx = Math.abs(circle.x - point.x);
  const dy = Math.abs(circle.y - point.y);

  return dx * dx + dy * dy < circle.radius * circle.radius;
}

function rayLineSegmentIntersection(ray, start, end) {
  const v1 = sub(ray, start);
  const v2 = sub(end, start);
  const v3 = { x: -ray.direction.y, y: ray.direction.x };

  const d = dot(v2, v3);

  // check for parallel
  if (Math.abs(d) < 0.000001) return null;

  const t1 = cross(v2, v1) / d;
  const t2 = dot(v1, v3) / d;

  if (t1 >= 0 && t2 >= 0 && t2 <= 1) return t1;

  return null;
}

function getPixelMap(ctx, sx, sy, width, height) {
  const map = [];
  for (let iy = 0; iy < width; iy++) {
    for (let ix = 0; ix < height; ix++) {
      const x = sx + ix;
      const y = sy + iy;
      const pixel = ctx.getImageData(x, y, 1, 1);
      if (map[y] === undefined) map[y] = [];
      // opaque or transparent?
      map[y][x] = pixel.data[3] === 0;
    }
  }
  return map;
}