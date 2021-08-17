const [greebleCanvas, greebleCtx] = createCanvas(256, 256)

const [greebleCanvas2, ctx2] = createCanvas(256, 256)

const rng = new RNG()

function drawGreebles() {
  // document.body.appendChild(greebleCanvas);

  greebleCtx.fillStyle = '#666666'
  greebleCtx.fillRect(0, 0, 256, 256)

  times(32, () => {
    addLayer()
  })
}

function addLayer() {
  ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height)
  ctx2.fillStyle = '#666666'

  times(32, () => {
    ctx2.fillRect(
      rng.randomIntBetween(-30, 226),
      rng.randomIntBetween(-30, 226),
      rng.randomIntBetween(10, 50),
      rng.randomIntBetween(10, 50)
    )
  })

  greebleCtx.shadowBlur = 3
  greebleCtx.shadowOffsetX = 1
  greebleCtx.shadowOffsetY = 1
  greebleCtx.shadowColor = '#333333'
  greebleCtx.drawImage(greebleCanvas2, 0, 0)

  greebleCtx.shadowBlur = 3
  greebleCtx.shadowOffsetX = -1
  greebleCtx.shadowOffsetY = -1
  greebleCtx.shadowColor = '#888888'
  greebleCtx.drawImage(greebleCanvas2, 0, 0)
}
