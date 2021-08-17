const [planetCanvas, planetCtx] = createCanvas(256, 256)

function drawPlanet() {
  // document.body.appendChild(planetCanvas);

  const center = 128
  const radius = 118

  var gradient = ctx.createRadialGradient(
    (center / 2) * 3,
    center / 2,
    0,
    center,
    center,
    radius
  )
  // Add three color stops
  gradient.addColorStop(0, '#ab4944')
  gradient.addColorStop(0.5, '#783734')
  gradient.addColorStop(0.9, '#382221')
  gradient.addColorStop(1, '#211414')

  planetCtx.beginPath()
  planetCtx.arc(center, center, radius, 0, 2 * Math.PI, false)

  planetCtx.lineWidth = 10
  planetCtx.strokeStyle = 'rgba(250, 242, 217,0.05)'
  planetCtx.stroke()

  planetCtx.fillStyle = gradient
  planetCtx.fill()

  // quantize(planetCtx);
}

// create an array of palette colors
var palette = [
  '#ff0040',
  '#131313',
  '#1b1b1b',
  '#272727',
  '#3d3d3d',
  '#5d5d5d',
  '#858585',
  '#b4b4b4',
  '#ffffff',
  '#c7cfdd',
  '#92a1b9',
  '#657392',
  '#424c6e',
  '#2a2f4e',
  '#1a1932',
  '#0e071b',
  '#1c121c',
  '#391f21',
  '#5d2c28',
  '#8a4836',
  '#bf6f4a',
  '#e69c69',
  '#f6ca9f',
  '#f9e6cf',
  '#edab50',
  '#e07438',
  '#c64524',
  '#8e251d',
  '#ff5000',
  '#ed7614',
  '#ffa214',
  '#ffc825',
  '#ffeb57',
  '#d3fc7e',
  '#99e65f',
  '#5ac54f',
  '#33984b',
  '#1e6f50',
  '#134c4c',
  '#0c2e44',
  '#00396d',
  '#0069aa',
  '#0098dc',
  '#00cdf9',
  '#0cf1ff',
  '#94fdff',
  '#fdd2ed',
  '#f389f5',
  '#db3ffd',
  '#7a09fa',
  '#3003d9',
  '#0c0293',
  '#03193f',
  '#3b1443',
  '#622461',
  '#93388f',
  '#ca52c9',
  '#c85086',
  '#f68187',
  '#f5555d',
  '#ea323c',
  '#c42430',
  '#891e2b',
  '#571c27',
].map(hexToRgb)

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// use Euclidian distance to find closest color
function mapColorToPalette(red, green, blue) {
  var color, diffR, diffG, diffB, diffDistance, mappedColor
  var distance = 25000
  for (var i = 0; i < palette.length; i++) {
    color = palette[i]
    diffR = color.r - red
    diffG = color.g - green
    diffB = color.b - blue
    diffDistance = diffR * diffR + diffG * diffG + diffB * diffB
    if (diffDistance < distance) {
      distance = diffDistance
      mappedColor = palette[i]
    }
  }
  return mappedColor
}

function quantize(ctx) {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    let mappedColor = mapColorToPalette(data[i], data[i + 1], data[i + 2])
    if (data[i + 3] > 10) {
      data[i] = mappedColor.r
      data[i + 1] = mappedColor.g
      data[i + 2] = mappedColor.b
    }
  }
  ctx.putImageData(imageData, 0, 0)
}
