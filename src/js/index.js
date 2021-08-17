const width = 240
const height = 426

const [canvas, ctx] = createCanvas(width, height)

document.getElementById('g').appendChild(canvas)

bindInput(document)

let running = true

document.addEventListener('visibilitychange', () => {
  running = document.visibilityState === 'visible'
})

const img = new Image()
img.onload = init
img.src = 'sprites.png'

const player = {
  x: width / 2,
  y: height - 50,
  width: 32,
  height: 32,
  alive: true,

  sprite: {
    source: img,

    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
}

let bullets = []
let enemyBullets = []
let enemies = [
  {
    x: width / 2,
    y: 50,
    width: 18,
    height: 18,
    alive: true,
    hp: 5,
    velocity: {
      x: 0,
      y: 0.5,
    },
    sprite: {
      source: img,

      x: 39,
      y: 0,
    },
  },
]

const scene = {
  x: 0,
  y: 0,
  children: [player, ...bullets, ...enemies, ...enemyBullets],
}

let whiteSprites
let [sprites, spritesCtx] = createCanvas(256, 256)
let pixelMaps = {}

function init() {
  whiteSprites = tint(img, '#FFFFFF')
  spritesCtx.drawImage(img, 0, 0)

  pixelMaps.player = getPixelMap(spritesCtx, 0, 0, 32, 32)
  // console.log(pixelMaps);

  loop()
  drawPlanet()
  drawGreebles()
  setInterval(() => {
    if (!running) return
    enemies.forEach((enemy) => enemyShoot(enemy))
    // flashSprite(player);
  }, 600)
}

function flashSprite(target, delay = 100) {
  const original = target.sprite.source
  if (original === whiteSprites) return
  target.sprite.source = whiteSprites
  setTimeout(() => (target.sprite.source = original), delay)
}

const world = { x: width / 2, y: height / 2, width, height }

function loop() {
  requestAnimationFrame(loop)

  handleInput()
  ;[player, ...enemies, ...bullets, ...enemyBullets].forEach((item) => {
    item.x += item.velocity.x
    item.y += item.velocity.y
  })

  let playerHit = false

  // collision
  enemyBullets.forEach((bullet) => {
    // world boundary
    if (collideRectRect(bullet, world) === false) {
      bullet.alive = false
      return
    }

    // enemy bullets vs player
    if (collideRectRect(bullet, player)) {
      bullet.alive = false
      playerHit = true
    }
  })

  if (playerHit) flashSprite(player)

  bullets.forEach((bullet) => {
    // world boundary
    if (collideRectRect(bullet, world) === false) {
      bullet.alive = false
      return
    }

    // player bullets vs enemies
    enemies.forEach((enemy) => {
      if (collideRectRect(bullet, enemy)) {
        flashSprite(enemy)
        enemy.hp -= 1
        if (enemy.hp <= 0) {
          enemy.alive = false
        }
        bullet.alive = false
      }
    })
  })

  // get rid of dead stuff at end
  enemies = enemies.filter(isAlive)
  enemyBullets = enemyBullets.filter(isAlive)
  bullets = bullets.filter(isAlive)

  scene.children = scene.children.filter(isAlive)

  render()
}

const isAlive = (item) => item.alive
