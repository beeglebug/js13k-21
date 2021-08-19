const impactFrames = [
  { x: 53, y: 0, width: 9, height: 9 },
  { x: 62, y: 0, width: 9, height: 9 },
  { x: 71, y: 0, width: 9, height: 9 },
];

const engineFrames = [
  { x: 80, y: 0, width: 4, height: 6 },
  { x: 84, y: 0, width: 4, height: 6 },
  { x: 88, y: 0, width: 4, height: 6 },
  { x: 84, y: 0, width: 4, height: 6 },
];

let animated = [];

function spawnImpact(x, y) {
  const frame = impactFrames[0];
  const entity = {
    x: x,
    y: y,
    width: frame.width,
    height: frame.height,
    alive: true,
    source: sprites,
    sx: frame.x,
    sy: frame.y,
    frames: impactFrames,
    currentFrame: 0,
    counter: 0,
    speed: 80,
    loop: false,
  };

  scene.children.push(entity);
  animated.push(entity);
}

function updateAnimations(delta) {
  animated.forEach((entity) => {
    entity.counter += delta * 1000;
    if (entity.counter >= entity.speed) {
      // use mod to soak up any super large deltas
      entity.counter = entity.counter % entity.speed;
      entity.currentFrame++;

      if (entity.currentFrame > entity.frames.length - 1) {
        if (entity.loop === false) {
          entity.alive = false;
          return;
        }
        entity.currentFrame = 0;
      }

      const frame = entity.frames[entity.currentFrame];

      // swap out for current frame
      entity.sx = frame.x;
      entity.sy = frame.y;
      entity.width = frame.width;
      entity.height = frame.height;
    }
  });
}
