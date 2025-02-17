import { MAP_SCALE, PLAYER_COLOR, TILE } from '../../resources/settings.js';

export default class Player {
  constructor(x, y, angle, speed, turningSpeed) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.turningSpeed = turningSpeed;
  }

  movement = (pressedKeys, map) => {
    const sin_a = Math.sin(this.angle);
    const cos_a = Math.cos(this.angle);
    let newX = this.x;
    let newY = this.y;

    if (pressedKeys.KeyW) {
      newX += this.speed * cos_a;
      newY += this.speed * sin_a;
    }
    if (pressedKeys.KeyA) {
      newX += this.speed * sin_a;
      newY += -this.speed * cos_a;
    }
    if (pressedKeys.KeyS) {
      newX += -this.speed * cos_a;
      newY += -this.speed * sin_a;
    }
    if (pressedKeys.KeyD) {
      newX += -this.speed * sin_a;
      newY += this.speed * cos_a;
    }

    if (!map.getWall(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  };

  rotation = (pressedKeys) => {
    if (pressedKeys.ArrowLeft) this.angle -= this.turningSpeed;
    if (pressedKeys.ArrowRight) this.angle += this.turningSpeed;
  };

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      Math.round(this.x / MAP_SCALE),
      Math.round(this.y / MAP_SCALE),
      8,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = PLAYER_COLOR;
    ctx.fill();
  }
}
