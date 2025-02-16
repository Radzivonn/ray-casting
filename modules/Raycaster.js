import {
  MAP_SCALE,
  HALF_FOV,
  NUM_RAYS,
  TILE,
  WIDTH,
  HEIGHT,
  PROJECTION_COEFF,
  COLOR_DEPTH_COEFF,
  SCALE,
  DELTA_ANGLE,
} from './settings.js';

export default class Raycaster {
  constructor(ctx, map) {
    this.ctx = ctx;
    this.map = map;
  }

  raycast(playerX, playerY, playerAngle) {
    this.ctx.beginPath();
    this.ctx.moveTo(
      Math.round(playerX / MAP_SCALE),
      Math.round(playerY / MAP_SCALE),
    );

    const xm = this.map.mapping(playerX);
    const ym = this.map.mapping(playerY);
    let currentAngle = playerAngle - HALF_FOV;

    for (let ray = 0; ray < NUM_RAYS; ray++) {
      let sin_a = Math.sin(currentAngle);
      let cos_a = Math.cos(currentAngle);
      sin_a = sin_a ? sin_a : 0.000001;
      cos_a = cos_a ? cos_a : 0.000001;

      // verticals
      let x = cos_a >= 0 ? xm + TILE : xm;
      let dx = cos_a >= 0 ? 1 : -1;
      let depthVertical = Infinity;

      for (let i = 0; i < WIDTH; i += TILE) {
        depthVertical = (x - playerX) / cos_a;
        const y = playerY + depthVertical * sin_a;
        if (this.map.isCollide(x + dx, y)) {
          this.ctx.lineTo(Math.round(x / MAP_SCALE), Math.round(y / MAP_SCALE));
          break;
        }
        x += dx * TILE;
      }

      // horizontals
      let y = sin_a >= 0 ? ym + TILE : ym;
      let dy = sin_a >= 0 ? 1 : -1;
      let depthHorizontal = Infinity;

      for (let i = 0; i < HEIGHT; i += TILE) {
        depthHorizontal = (y - playerY) / sin_a;
        const x = playerX + depthHorizontal * cos_a;
        if (this.map.isCollide(x, y + dy)) {
          this.ctx.lineTo(Math.round(x / MAP_SCALE), Math.round(y / MAP_SCALE));
          break;
        }
        y += dy * TILE;
      }

      // Drawing FOV lines on mini map
      let depth = Math.min(depthVertical, depthHorizontal);
      let endX, endY;

      if (depth === depthVertical) {
        endX = x;
        endY = playerY + depth * sin_a;
      } else {
        endX = playerX + depth * cos_a;
        endY = y;
      }

      endX = Math.max(0, Math.min(WIDTH, endX));
      endY = Math.max(0, Math.min(HEIGHT, endY));
      this.ctx.lineTo(
        Math.round(endX / MAP_SCALE),
        Math.round(endY / MAP_SCALE),
      );

      // projection
      depth *= Math.cos(playerAngle - currentAngle);
      depth = Math.max(depth, 0.00001);
      const projectionHeight = Math.min(
        parseInt(PROJECTION_COEFF / depth, 10),
        2 * HEIGHT,
      );
      const color = 255 / (1 + depth * depth * COLOR_DEPTH_COEFF);

      this.ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
      this.ctx.fillRect(
        ray * SCALE,
        Math.floor(HEIGHT / 2) - Math.floor(projectionHeight / 2),
        SCALE,
        projectionHeight,
      );

      currentAngle += DELTA_ANGLE;
    }

    this.ctx.lineTo(
      Math.round(playerX / MAP_SCALE),
      Math.round(playerY / MAP_SCALE),
    );
    this.ctx.closePath();
    this.ctx.fillStyle = 'rgba(0, 149, 255, 0.75)';
    this.ctx.fill();
  }
}
