import { MAP_SCALE } from './settings.js';

export default class Player {
  constructor(x, y, angle, speed, turningSpeed) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.turningSpeed = turningSpeed;
  }

  movement = (key) => {
    const sin_a = Math.sin(this.angle);
    const cos_a = Math.cos(this.angle);
    if (key === 'KeyW') {
      this.x += this.speed * cos_a;
      this.y += this.speed * sin_a;
    }
    if (key === 'KeyA') {
      this.x += this.speed * sin_a;
      this.y += -this.speed * cos_a;
    }
    if (key === 'KeyS') {
      this.x += -this.speed * cos_a;
      this.y += -this.speed * sin_a;
    }
    if (key === 'KeyD') {
      this.x += -this.speed * sin_a;
      this.y += this.speed * cos_a;
    }
    if (key === 'ArrowLeft') this.angle -= this.turningSpeed;
    if (key === 'ArrowRight') this.angle += this.turningSpeed;
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
    ctx.fillStyle = 'blue';
    ctx.fill();
  }
}
