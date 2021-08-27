function renderUI() {
  if (state === STATE_MENU) {
    renderLogo();
  }

  if (state === STATE_GAME) {
    renderText(ctx, whiteFont, `Score: ${score}`, 5, 5);
    renderText(ctx, whiteFont, "Lives:", 140, 5);
    for (let i = 0; i < lives; i++) {
      const x = 168 + 10 * i;
      ctx.drawImage(sprites, 89, 1, 8, 5, x, 5, 8, 5);
    }
  }
}

function renderLogo() {
  ctx.drawImage(whiteLogo, 2, menu.logoY + 2);
  ctx.drawImage(blueLogo, 0, menu.logoY);
}

function createLogo() {
  const text = "iiiviou";
  const scale = 5;
  const textWidth = text.length * 4 * scale;
  const x = width / 2 - textWidth / 2;

  logoCtx.fillStyle = "#FFFFFF";
  logoCtx.fillRect(20, 0, 194, 4);
  logoCtx.fillRect(50, 42, 135, 8);

  renderText(logoCtx, whiteFont, "X", 20, 10, 8);
  renderText(logoCtx, whiteFont, text, x, 10, scale);
  renderText(logoCtx, whiteFont, "S", 190, 10, 8);

  return logoCanvas;
}
