import { MAP_TILE, TILE, textMap } from './settings.js';

export default class Map {
  constructor() {
    this.WORLD_MAP = [];
    this.MINI_MAP = [];
    for (let y = 0; y < textMap.length; y++) {
      for (let x = 0; x < textMap[y].length; x++) {
        if (textMap[y][x] === 'W') {
          this.WORLD_MAP.push([x * TILE, y * TILE]);
          this.MINI_MAP.push([x * MAP_TILE, y * MAP_TILE]);
        }
      }
    }
  }

  mapping(coord) {
    return Math.floor(coord / TILE) * TILE;
  }

  isCollide(x, y) {
    return this.WORLD_MAP.find(
      (coord) => coord[0] === this.mapping(x) && coord[1] === this.mapping(y),
    )
      ? true
      : false;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    this.MINI_MAP.forEach((wall) => {
      ctx.fillRect(wall[0], wall[1], MAP_TILE, MAP_TILE);
    });
  }
}
