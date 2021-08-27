let _tweens = [];

function updateTweens(delta) {
  _tweens.forEach((tween) => {
    const { obj, prop, to, increment, callback } = tween;
    const step = increment * delta * 1000;
    const value = obj[prop] + step;
    const dist = Math.abs(value - to);
    if (dist < Math.abs(step)) {
      obj[prop] = to;
      tween.alive = false;
      return callback && callback();
    }
    obj[prop] = value;
  });
  _tweens = _tweens.filter(isAlive);
}

function createTween(obj, prop, to, time, callback) {
  const from = obj[prop];
  const increment = (to - from) / time;
  _tweens.push({
    obj,
    prop,
    to,
    increment,
    callback,
    alive: true,
  });
}
