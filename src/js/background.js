let backgroundLayers = [];

const updateBackground = () => {
  backgroundLayers.forEach((layer) => {
    layer.y += layer.speed;
    if (layer.y >= layer.img.height) {
      layer.y = layer.img.height - layer.y;
    }
  });
};

const renderBackground = () => {
  backgroundLayers.forEach((layer) => {
    ctx.drawImage(layer.img, 0, layer.y);
    ctx.drawImage(layer.img, 0, 0 - layer.img.height + layer.y);
  });
};
