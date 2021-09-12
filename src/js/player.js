let player;

class Player extends Entity {
  width = 24;
  height = 16;
  sx = 0;
  sy = 0;
  speed = 2;
  weaponSpeed = 200;
  shootingCooldown = 0;

  hasControl = false;
  invulnerable = false;

  constructor() {
    super(width / 2, 0);
    this.source = sprites;
    this.flashSprite = whiteSprites;
    this.pixelMap = getPixelMap(spritesCtx, 0, 0, 32, 32);

    const frame = engineFrames[0];

    const engineTrailLeft = {
      x: -9,
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
      x: 9,
    };

    this.engineTrailLeft = engineTrailLeft;
    this.engineTrailRight = engineTrailRight;

    animated.push(engineTrailLeft, engineTrailRight);
  }

  update(delta) {
    super.update(delta);
    this.shootingCooldown -= delta * 1000;
    if (this.shootingCooldown < 0) this.shootingCooldown = 0;
  }

  shoot() {
    if (this.shootingCooldown > 0) return;
    this.shootingCooldown += this.weaponSpeed;
    zzfxP(soundShoot);

    const bullet = new Bullet(this.x, this.y);

    bullets.push(bullet);
  }

  damage(collision) {
    if (this.invulnerable) return;
    spawnImpact(collision.x, collision.y);
    lives -= 1;
    if (lives === 0) {
      gameOver();
    } else {
      respawn();
    }
  }

  render() {
    renderEntity(this);
    renderEntity(this.engineTrailLeft, this);
    renderEntity(this.engineTrailRight, this);
  }
}
