// game settings
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS_LIMIT = 9999; // !
export const TILE = 60;

// player settings
export const playerAngle = 0;
export const playerSpeed = 5;
export const turningSpeed = 0.045;

// mini map settings
export const MAP_SCALE = 6;
export const MAP_TILE = Math.round(TILE / MAP_SCALE);

// ray casting settings
export const FOV = Math.PI / 3;
export const HALF_FOV = FOV / 2;
export const NUM_RAYS = Math.round(WIDTH / 4);
export const DELTA_ANGLE = FOV / NUM_RAYS;
export const DIST = NUM_RAYS / (2 * Math.tan(HALF_FOV));
export const PROJECTION_COEFF = 3 * DIST * TILE;
export const SCALE = Math.floor(WIDTH / NUM_RAYS);
export const COLOR_DEPTH_COEFF = 0.00002;

// Map
export const textMap = [
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
  'W......W...WW.W................W',
  'W......W...WW.W................W',
  'W......W...WW.W................W',
  'W......W...WW.W......00........W',
  'W..............................W',
  'W..............................W',
  'W.....WWW.................000..W',
  'W.....WWWWWWW...............0..W',
  'W...........................0..W',
  'W..............................W',
  'W...WW..............0..........W',
  'W...WW.........................W',
  'W..............................W',
  'W.......WWWWW............0.....W',
  'W........................0.....W',
  'W..............................W',
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
];
