const impactFrames = [
  { x: 45, y: 0, width: 9, height: 9 },
  { x: 54, y: 0, width: 9, height: 9 },
  { x: 63, y: 0, width: 9, height: 9 },
];

// TODO define all sprites somewhere once and refer to them by index
const engineFrames = [
  { x: 72, y: 0, width: 4, height: 9 },
  { x: 76, y: 0, width: 4, height: 9 },
  { x: 80, y: 0, width: 4, height: 9 },
  { x: 76, y: 0, width: 4, height: 9 },
];

const engineFramesBrake = [{ x: 72, y: 0, width: 4, height: 9 }, null];

const engineFramesBoost = [
  { x: 76, y: 0, width: 4, height: 11 },
  { x: 80, y: 0, width: 4, height: 11 },
  { x: 84, y: 0, width: 4, height: 11 },
  { x: 80, y: 0, width: 4, height: 11 },
];

let animated = [];

class AnimatedEntity extends Entity {
  frames = [];
  currentFrame = 0;
  counter = 0;
  fps = 12;
  loop = false;
}

class Impact extends AnimatedEntity {
  frames = impactFrames;
  constructor(x, y) {
    super(x, y);
    this.source = sprites;
    const frame = impactFrames[0];
    this.width = frame.width;
    this.height = frame.height;
    this.sx = frame.x;
    this.sy = frame.y;
  }
}

function spawnImpact(x, y) {
  const impact = new Impact(x, y);
  effects.push(impact);
  animated.push(impact);
}

function updateAnimations(delta) {
  animated.forEach((entity) => {
    entity.counter += delta * 1000;
    const speed = 1000 / entity.fps;
    if (entity.counter >= speed) {
      // use mod to soak up any super large deltas
      entity.counter = entity.counter % speed;
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
