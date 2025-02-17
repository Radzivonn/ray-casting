import TextureRenderer from './TextureRenderer.js';
import { EARTH_COLOR, HEIGHT, WIDTH } from '../../resources/settings.js';

export default class EnvironmentRenderer extends TextureRenderer {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.loadTextures({ sky: '../assets/sky.png' });
    this.HALF_HEIGHT = Math.round(HEIGHT / 2);
  }

  drawSky(angle) {
    const texture = this.getTexture('sky');
    if (!texture) return;
    const skyOffset = (-5 * (angle * (180 / Math.PI))) % WIDTH;
    this.ctx.drawImage(texture, skyOffset, 0, WIDTH, this.HALF_HEIGHT);
    this.ctx.drawImage(texture, skyOffset - WIDTH, 0, WIDTH, this.HALF_HEIGHT);
    this.ctx.drawImage(texture, skyOffset + WIDTH, 0, WIDTH, this.HALF_HEIGHT);
  }

  drawEarth() {
    this.ctx.fillStyle = EARTH_COLOR;
    this.ctx.fillRect(0, this.HALF_HEIGHT, WIDTH, this.HALF_HEIGHT);
  }
}
