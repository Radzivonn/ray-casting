import { WIDTH } from '../../resources/settings.js';

export default class FPS {
  constructor() {
    this.FPS = 0;
    this.lastTimestampFPSCounter = 0;
    this.frameCount = 0;
  }

  countFPS(timestamp) {
    this.frameCount++;
    if (this.lastTimestampFPSCounter !== 0) {
      let elapsed = timestamp - this.lastTimestampFPSCounter;
      if (elapsed > 1000) {
        this.FPS = this.frameCount;
        this.frameCount = 0;
        this.lastTimestampFPSCounter = timestamp;
      }
    } else {
      this.lastTimestampFPSCounter = timestamp;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillText(`FPS: ${this.FPS}`, WIDTH - 110, 30);
  }
}
