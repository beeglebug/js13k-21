function render() {
  ctx.fillRect(0, 0, width, height)

  ctx.drawImage(planetCanvas, 0, 0, 512, 512)

  scene.children.forEach((child) => {
    const { x, y, width, height, sprite } = child
    const { x: sx, y: sy, source } = sprite
    ctx.drawImage(
      source,
      sx,
      sy,
      width,
      height,
      Math.floor(x - Math.floor(width / 2)),
      Math.floor(y - Math.floor(height / 2)),
      width,
      height
    )
  })

  debug()
}

function debug() {
  ctx.translate(0.5, 0.5)
  debugRect(player, '#FFFFFF')

  enemyBullets.forEach((bullet) => {
    debugRect(bullet, '#00FF00')
  })
  ctx.translate(-0.5, -0.5)
}

function debugRect(rect, color) {
  ctx.strokeWidth = 1
  ctx.strokeStyle = color
  ctx.strokeRect(
    rect.x - rect.width / 2,
    rect.y - rect.height / 2,
    rect.width,
    rect.height
  )
}
