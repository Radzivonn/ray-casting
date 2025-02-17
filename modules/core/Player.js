import { MAP_SCALE, PLAYER_COLOR } from '../../resources/settings.js';

export default class Player {
  constructor(x, y, angle, speed, turningSpeed) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.turningSpeed = turningSpeed;
  }

  movement = (pressedKeys) => {
    const sin_a = Math.sin(this.angle);
    const cos_a = Math.cos(this.angle);
    if (pressedKeys.KeyW) {
      this.x += this.speed * cos_a;
      this.y += this.speed * sin_a;
    }
    if (pressedKeys.KeyA) {
      this.x += this.speed * sin_a;
      this.y += -this.speed * cos_a;
    }
    if (pressedKeys.KeyS) {
      this.x += -this.speed * cos_a;
      this.y += -this.speed * sin_a;
    }
    if (pressedKeys.KeyD) {
      this.x += -this.speed * sin_a;
      this.y += this.speed * cos_a;
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
