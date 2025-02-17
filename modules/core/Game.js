import Player from './Player.js';
import Environment from './Environment.js';
import Map from './Map.js';
import Raycaster from './Raycaster.js';
import FPS from './FPS.js';
import {
  playerAngle,
  playerSpeed,
  turningSpeed,
  FPS_LIMIT,
} from '../../resources/settings.js';

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
    this.environment = new Environment(this.ctx);
    this.map = new Map(this.ctx);
    this.raycaster = new Raycaster(this.ctx, this.map);
    this.fpsCounter = new FPS();

    this.animationID = null;
    this.lastTimestamp = 0;

    this.pressedKeys = {
      KeyW: false,
      KeyA: false,
      KeyS: false,
      KeyD: false,
      ArrowLeft: false,
      ArrowRight: false,
    };
  }

  start() {
    this._addHandlers();
    this._animate();
  }

  _addHandlers() {
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    this._addKeyboardHandlers();
  }

  _addKeyboardHandlers() {
    window.addEventListener('keydown', (event) => {
      if (this.pressedKeys.hasOwnProperty(event.code)) {
        this.pressedKeys[event.code] = true;
      }
    });
    window.addEventListener('keyup', (event) => {
      if (this.pressedKeys.hasOwnProperty(event.code)) {
        this.pressedKeys[event.code] = false;
      }
    });
  }

  _animate(timestamp) {
    if (timestamp - this.lastTimestamp > 1000 / FPS_LIMIT) {
      this.fpsCounter.countFPS(timestamp);
      this.lastTimestamp = timestamp;

      this.player.movement(this.pressedKeys);
      this.player.rotation(this.pressedKeys);
      this.drawScene();
    }
    this.animationID = requestAnimationFrame((timestamp) =>
      this._animate(timestamp),
    );
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.environment.draw(this.player.angle);
    this.raycaster.raycast(this.player.x, this.player.y, this.player.angle);
    this.player.draw(this.ctx);
    this.map.draw(this.ctx);
    this.fpsCounter.draw(this.ctx);
  }
}
