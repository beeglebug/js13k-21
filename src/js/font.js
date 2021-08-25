function renderText(font, text, x, y, scale = 1) {
  text
    .toUpperCase()
    .split("")
    .forEach((char, i) => {
      const sourceX = getX(char);
      if (sourceX === null) return;
      const offsetX = i * 4 * scale;
      ctx.drawImage(
        font,
        sourceX,
        0,
        3,
        5,
        x + offsetX,
        y,
        3 * scale,
        5 * scale
      );
    });
}

// font currently handles chars 0-9 A-Z -,.:?
function getX(c) {
  const cc = c.charCodeAt(0);
  if (cc >= 43 && cc < 59) return (cc - 43) * 3;
  if (cc === 39) return 129; // '
  if (cc === 63) return 126; // ?
  if (cc >= 65 && cc < 91) return (cc - 64) * 3 + 45;
  return null;
}
