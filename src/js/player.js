let player;

function createPlayer() {
  const frame = engineFrames[0];

  const engineTrailLeft = {
    x: -10,
    y: 10,
    width: frame.width,
    height: frame.height,
    alive: true,
    source: sprites,
    sx: frame.x,
    sy: frame.y,
    frames: engineFrames,
    currentFrame: 0,
    counter: 0,
    fps: 10,
    loop: true,
  };

  const engineTrailRight = {
    ...engineTrailLeft,
    x: 10,
  };

  player = {
    x: width / 2,
    y: height - 100,
    width: 30,
    height: 17,
    alive: true,
    source: img,
    sx: 0,
    sy: 0,
    speed: 4,
    velocity: {
      x: 0,
      y: 0,
    },
    children: [engineTrailLeft, engineTrailRight],
    pixelMap: pixelMaps.player,
  };

  scene.children.unshift(player);
  animated.push(engineTrailLeft, engineTrailRight);
}
