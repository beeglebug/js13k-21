class Enemy extends Entity {
  score = 100;

  shootingCooldown = 0;
  weaponSpeed = 2000;
  bulletSpeed = 1.5;

  update(delta) {
    super.update(delta);

    this.shootingCooldown -= delta * 1000;
    if (this.shootingCooldown < 0) this.shootingCooldown = 0;
    this.shoot();

    // seeking target and have more path points to head for
    if (this.target && this.path && this.path.length > 2) {
      const threshold = 10;
      if (distanceTo(this, this.target) < threshold) {
        this.target = this.path[++this.pathIndex];
        this.seekTarget();
      }
    }
  }

  shoot() {
    if (this.shootingCooldown > 0) return;
    if (this.y < 0) return;
    this.shootingCooldown += this.weaponSpeed;
    zzfxP(soundEnemyShoot);
    enemyShootAtPlayer(this);
  }

  seekTarget() {
    if (!this.target) return;
    this.velocity.x = this.target.x - this.x;
    this.velocity.y = this.target.y - this.y;
    normalize(this.velocity);
    multiply(this.velocity, this.speed);
  }

  damage(collision) {
    zzfxP(soundHit);
    spawnImpact(collision.x, collision.y);
    flashSprite(this);
    this.hp -= 1;
    if (this.hp <= 0) {
      // give it time to flash
      setTimeout(() => {
        this.alive = false;
      }, 50);
      score += this.score;
    }
  }
}

class EnemyDrone extends Enemy {
  score = 50;
  constructor(x, y) {
    super(x, y);
    this.setSprite(enemySprites.drone);
  }
  shoot() {
    // no shooty
  }
}

class EnemyFighter extends Enemy {
  hp = 3;
  score = 200;
  constructor(x, y) {
    super(x, y);
    this.setSprite(enemySprites.fighter);
  }
}

class EnemyScout extends Enemy {
  hp = 2;
  score = 100;
  speed = 1.5;
  bulletSpeed = 2;
  constructor(x, y) {
    super(x, y);
    this.setSprite(enemySprites.fighter2);
  }
  shoot() {
    if (this.shootingCooldown > 0) return;
    if (this.y < 0) return;
    this.shootingCooldown += this.weaponSpeed;
    zzfxP(soundEnemyShoot);
    enemyShootDirection(this, { x: 0, y: 1 });
  }
}

class EnemyBomber extends Enemy {
  hp = 5;
  score = 300;
  constructor(x, y) {
    super(x, y);
    this.setSprite(enemySprites.bomber);
  }
  shoot() {
    if (this.shootingCooldown > 0) return;
    if (this.y < 0) return;
    this.shootingCooldown += this.weaponSpeed;
    zzfxP(soundEnemyShoot);
    enemyShootSpread(this, 3);
  }
}

class EnemyFrigate extends Enemy {
  hp = 7;
  score = 500;
  constructor(x, y) {
    super(x, y);
    this.setSprite(enemySprites.frigate);
  }

  shoot() {
    if (this.shootingCooldown > 0) return;
    if (this.y < 0) return;
    this.shootingCooldown += this.weaponSpeed;
    zzfxP(soundEnemyShoot);
    enemyShootDirection(this, normalize({ x: -1, y: this.velocity.y }));
    enemyShootDirection(this, normalize({ x: 1, y: this.velocity.y }));
  }
}

class EnemyBoss extends Enemy {
  hp = 50;
  score = 5000;
  speed = 1;
  weaponSpeed = 3000;
  constructor(x, y) {
    super(x, y);
    this.setSprite(enemySprites.boss);
    setTimeout(() => {
      // start shooting slower
      this.weaponSpeed = 1000;
    }, 2000);
  }
  shoot() {
    if (this.shootingCooldown > 0) return;
    if (this.y < 0) return;
    this.shootingCooldown += this.weaponSpeed;
    zzfxP(soundEnemyShoot);
    enemyShootSpread(this, 5);
  }
}

function spawnEnemy(enemyType, path) {
  const [first, second] = path;
  const enemy = new enemyType(first.x, first.y);
  enemy.path = path;
  enemy.pathIndex = 0;
  enemy.target = second;

  enemy.seekTarget();

  enemies.push(enemy);
}
