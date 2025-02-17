import EnvironmentRenderer from '../renderers/EnvironmentRenderer.js';

export default class Environment {
  constructor(ctx) {
    this.environmentRenderer = new EnvironmentRenderer(ctx);
  }

  draw(angle) {
    this.environmentRenderer.drawSky(angle);
    this.environmentRenderer.drawEarth();
  }
}
