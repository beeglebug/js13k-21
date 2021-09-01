function renderUI() {
  if (state === STATE_MAIN_MENU) {
    renderLogo();
    renderMenu();
  }

  if (state === STATE_GAME) {
    renderText(ctx, whiteFont, `Score: ${score}`, 5, 5);
    renderText(ctx, whiteFont, "Lives:", 140, 5);
    for (let i = 0; i < lives; i++) {
      const x = 168 + 10 * i;
      ctx.drawImage(sprites, 24, 16, 8, 5, x, 5, 8, 5);
    }
  }
}

function renderMenu() {
  let y = menu.y;
  menu.items.forEach((item, i) => {
    let text = item.text;
    if (menu.selected === i) {
      text = "- " + text + " -";
    }
    const scale = 2;
    const metrics = getTextMetrics(text, scale);
    const x = width / 2 - metrics.width / 2;
    renderText(ctx, whiteFont, text, x, y + i * 30, scale);
  });
}

function renderLogo() {
  ctx.drawImage(logoBackground, 5, menu.logoY + 2);
  ctx.drawImage(logoForeground, 3, menu.logoY);
}

function getTextMetrics(text, scale = 1) {
  return {
    width: text.length * 4 * scale,
    height: 5 * scale,
  };
}

function createLogo() {
  const text = "iiiviou";
  const scale = 5;
  const metrics = getTextMetrics(text, scale);
  const x = width / 2 - metrics.width / 2;

  logoCtx.fillStyle = "#FFFFFF";
  logoCtx.fillRect(20, 0, 194, 4);
  logoCtx.fillRect(50, 42, 140, 8);

  renderText(logoCtx, whiteFont, "X", 20, 10, 8);
  renderText(logoCtx, whiteFont, text, x, 10, scale);
  renderText(logoCtx, whiteFont, "S", 190, 10, 8);

  return logoCanvas;
}
