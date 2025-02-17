import TextureRenderer from './TextureRenderer.js';
import {
  HEIGHT,
  SCALE,
  TEXTURE_HEIGHT,
  TEXTURE_SCALE,
} from '../../resources/settings.js';

export default class MapRenderer extends TextureRenderer {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.loadTextures({
      wall1: '../assets/W1.png',
      wall2: '../assets/W2.png',
    });
  }

  drawTexturedWall(textureName, projectionHeight, offset, ray) {
    const texture = this.getTexture(textureName);
    if (!texture) return;
    this.drawWallColumn(texture, offset, projectionHeight, ray);
  }

  drawWallColumn(texture, offset, projectionHeight, ray) {
    const sx = offset * TEXTURE_SCALE;
    const sy = 0;
    const sWidth = TEXTURE_SCALE;
    const sHeight = TEXTURE_HEIGHT;

    const dx = ray * SCALE;
    const dy = Math.round(HEIGHT / 2) - projectionHeight / 2;
    const dWidth = SCALE;
    const dHeight = projectionHeight;

    this.ctx.drawImage(
      texture,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight,
    );
  }
}
