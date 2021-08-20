let player;

function createPlayer() {
  const frame = engineFrames[0];

  const engineTrail1 = {
    x: -10,
    y: 7,
    width: frame.width,
    height: frame.height,
    alive: true,
    source: sprites,
    sx: frame.x,
    sy: frame.y,
    frames: engineFrames,
    currentFrame: 0,
    counter: 0,
    speed: 80,
    loop: true,
  };

  const engineTrail2 = {
    ...engineTrail1,
    x: 10,
    y: 7,
  };

  player = {
    x: width / 2,
    y: height - 150,
    width: 30,
    height: 17,
    alive: true,
    source: img,
    sx: 0,
    sy: 0,
    velocity: {
      x: 0,
      y: 0,
    },
    children: [engineTrail1, engineTrail2],
    pixelMap: pixelMaps.player,
  };

  scene.children.unshift(player);
  animated.push(engineTrail1, engineTrail2);
}
