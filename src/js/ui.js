function renderUI() {
  if (state === STATE_MAIN_MENU) {
    renderLogo();
    renderMenu();
    if (hiScore > 0) {
      const text = `HI SCORE: ${hiScore}`;
      const metrics = getTextMetrics(text, 2);
      const x = width / 2 - metrics.width / 2;
      renderText(ctx, yellowFont, text, x, 250, 2);
    }
  }

  if (state === STATE_GAME) {
    let scoreText = "" + score;
    let scoreFont = whiteFont;
    if (score > hiScore) {
      scoreFont = yellowFont;
    }

    renderText(ctx, whiteFont, "Score:", 5, 5);
    renderText(ctx, scoreFont, scoreText, 33, 5);
    renderText(ctx, whiteFont, "Lives:", 140, 5);

    for (let i = 0; i < lives; i++) {
      const x = 168 + 10 * i;
      ctx.drawImage(sprites, 24, 16, 8, 5, x, 5, 8, 5);
    }
  }

  if (state === STATE_GAME_OVER) {
    ctx.drawImage(gameOverImage, 0, 100);
  }

  if (state === STATE_WIN) {
    ctx.drawImage(winImage, 0, 100);
    const text = `SCORE: ${score}`;
    const metrics = getTextMetrics(text, 2);
    const x = width / 2 - metrics.width / 2;
    renderText(ctx, whiteFont, text, x, 250, 2);

    if (score > hiScore) {
      const text = `NEW HIGH SCORE`;
      const metrics = getTextMetrics(text, 2);
      const x = width / 2 - metrics.width / 2;
      renderText(ctx, yellowFont, text, x, 280, 2);
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

function createGameOverImage() {
  const [canvas, ctx] = createCanvas(width, 100);
  const text = "XXXX";
  const scale = 5;
  const metrics = getTextMetrics(text, scale);
  const x = width / 2 - metrics.width / 2;
  renderText(ctx, redFont, "GAME", x, 10, scale);
  renderText(ctx, redFont, "OVER", x, 40, scale);
  return canvas;
}

function createWinImage() {
  const [canvas, ctx] = createCanvas(width, 100);
  const text = "XXXXX";
  const scale = 5;
  const metrics = getTextMetrics(text, scale);
  const x = width / 2 - metrics.width / 2;
  renderText(ctx, greenFont, "LEVEL", x, 10, scale);
  renderText(ctx, greenFont, "CLEAR", x, 40, scale);
  return canvas;
}
