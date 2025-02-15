import Player from './Player.js';
import Map from './Map.js';
import Raycaster from './Raycaster.js';
import FPS from './FPS.js';
import {
  playerAngle,
  playerSpeed,
  turningSpeed,
  FPS_LIMIT,
} from './settings.js';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.font = '24px sans-serif';

    this.player = new Player(
      Math.round(canvas.width / 2),
      Math.round(canvas.height / 2),
      playerAngle,
      playerSpeed,
      turningSpeed,
    );

    this.map = new Map(this.ctx);
    this.raycaster = new Raycaster(this.ctx, this.map);
    this.fpsCounter = new FPS();

    this.animationID = null;
    this.lastTimestamp = 0;
  }

  start() {
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('keydown', (e) => this.player.movement(e.code));
    this.animate();
  }

  animate(timestamp) {
    if (timestamp - this.lastTimestamp > 1000 / FPS_LIMIT) {
      this.fpsCounter.countFPS(timestamp);
      this.lastTimestamp = timestamp;

      this.drawScene();
    }
    this.animationID = requestAnimationFrame((timestamp) =>
      this.animate(timestamp),
    );
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.raycaster.raycast(this.player.x, this.player.y, this.player.angle);
    this.player.draw(this.ctx);
    this.map.draw(this.ctx);
    this.fpsCounter.draw(this.ctx);
  }
}
