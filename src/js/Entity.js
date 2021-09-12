class Entity {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  velocity = { x: 0, y: 0 };

  alive = true;
  hp = 1;
  speed = 1;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(delta) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  setSprite(sprite) {
    this.source = sprite;
    this.flashSprite = tint(sprite, "#FFFFFF");
    this.width = sprite.width;
    this.height = sprite.height;
    this.pixelMap = getPixelMapFromCanvas(sprite);
    this.sx = 0;
    this.sy = 0;
  }

  render() {
    renderEntity(this);
  }
}
