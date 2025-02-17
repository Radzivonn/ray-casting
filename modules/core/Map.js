import MapRenderer from '../renderers/MapRenderer.js';
import {
  MAP_TILE,
  TILE,
  WALL1_COLOR,
  WALL2_COLOR,
} from '../../resources/settings.js';
import textMap from '../../resources/map.js';

export default class Map {
  constructor(ctx) {
    this.mapRenderer = new MapRenderer(ctx);
    this.WORLD_MAP = [];
    this.MINI_MAP = [];
    this._setupMaps(textMap);
  }

  _setupMaps(textMap) {
    const worldMap = [];
    for (let y = 0; y < textMap.length; y++) {
      for (let x = 0; x < textMap[y].length; x++) {
        if (textMap[y][x] === '.') continue;
        const wallName = this._getWallByType(textMap[y][x]);
        this.WORLD_MAP.push({ name: wallName, coords: [x * TILE, y * TILE] });

        const wallColor = this._getWallColorByType(textMap[y][x]);
        this.MINI_MAP.push({
          color: wallColor,
          coords: [x * MAP_TILE, y * MAP_TILE],
        });
      }
    }
    return worldMap;
  }

  _getWallByType(type) {
    switch (type) {
      case '1':
        return 'wall1';
      case '2':
        return 'wall2';
    }
  }

  _getWallColorByType(type) {
    switch (type) {
      case '1':
        return WALL1_COLOR;
      case '2':
        return WALL2_COLOR;
    }
  }

  getWall(x, y) {
    return this.WORLD_MAP.find(
      (wall) =>
        wall.coords[0] === this.mapping(x) &&
        wall.coords[1] === this.mapping(y),
    );
  }

  mapping(coord) {
    return Math.floor(coord / TILE) * TILE;
  }

  isCollide(x, y) {
    return this.WORLD_MAP.find(
      (wall) =>
        wall.coords[0] === this.mapping(x) &&
        wall.coords[1] === this.mapping(y),
    )
      ? true
      : false;
  }

  draw(ctx) {
    this.drawMiniMap(ctx);
  }

  drawMiniMap(ctx) {
    this.MINI_MAP.forEach((wall) => {
      ctx.fillStyle = wall.color;
      ctx.fillRect(wall.coords[0], wall.coords[1], MAP_TILE, MAP_TILE);
    });
  }

  drawWall(textureName, projectionHeight, offset, ray) {
    this.mapRenderer.drawTexturedWall(
      textureName,
      projectionHeight,
      offset,
      ray,
    );
  }
}
