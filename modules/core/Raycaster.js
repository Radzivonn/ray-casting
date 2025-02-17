import {
  MAP_SCALE,
  HALF_FOV,
  NUM_RAYS,
  TILE,
  WIDTH,
  HEIGHT,
  PROJECTION_COEFF,
  DELTA_ANGLE,
  RAYS_COLOR,
} from '../../resources/settings.js';

export default class Raycaster {
  constructor(ctx, map) {
    this.ctx = ctx;
    this.map = map;
  }

  raycast(playerX, playerY, playerAngle) {
    this.ctx.moveTo(
      Math.round(playerX / MAP_SCALE),
      Math.round(playerY / MAP_SCALE),
    );

    const xm = this.map.mapping(playerX);
    const ym = this.map.mapping(playerY);
    let currentAngle = playerAngle - HALF_FOV;

    for (let ray = 0; ray < NUM_RAYS; ray++) {
      let yv, xh, tileV, tileH, textureV, textureH;
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
        yv = playerY + depthVertical * sin_a;
        tileV = this.map.getWall(x + dx, yv);
        if (tileV) {
          textureV = tileV.name;
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
        xh = playerX + depthHorizontal * cos_a;
        tileH = this.map.getWall(xh, y + dy);
        if (tileH) {
          textureH = tileH.name;
          break;
        }
        y += dy * TILE;
      }

      // Drawing walls and FOV lines on mini map
      let depth = Math.min(depthVertical, depthHorizontal);
      let offset = depthVertical < depthHorizontal ? yv : xh;
      let texture = depthVertical < depthHorizontal ? textureV : textureH;
      offset = Math.round(offset) % TILE;
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

      depth *= Math.cos(playerAngle - currentAngle);
      depth = Math.max(depth, 0.00001);
      const projectionHeight = Math.min(
        Math.round(PROJECTION_COEFF / depth),
        2 * HEIGHT,
      );

      this.map.drawWall(texture, projectionHeight, offset, ray);

      currentAngle += DELTA_ANGLE;
    }
    this.ctx.fillStyle = RAYS_COLOR;
    this.ctx.fill();
  }
}
