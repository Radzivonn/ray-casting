// game settings
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS_LIMIT = 9999; // !
export const TILE = 60;

// player settings
export const playerAngle = 0;
export const playerSpeed = 2.5;
export const turningSpeed = 0.015;

// mini map settings
export const MAP_SCALE = 6;
export const MAP_TILE = Math.round(TILE / MAP_SCALE);

// ray casting settings
export const FOV = Math.PI / 3;
export const HALF_FOV = FOV / 2;
export const NUM_RAYS = Math.round(WIDTH / 4);
export const DELTA_ANGLE = FOV / NUM_RAYS;
export const DIST = NUM_RAYS / (2 * Math.tan(HALF_FOV));
export const PROJECTION_COEFF = 4 * DIST * TILE;
export const SCALE = Math.floor(WIDTH / NUM_RAYS);
export const COLOR_DEPTH_COEFF = 0.00002;

// texture settings (1200 x 1200)
export const TEXTURE_WIDTH = 1200;
export const TEXTURE_HEIGHT = 1200;
export const TEXTURE_SCALE = Math.round(TEXTURE_WIDTH / TILE);

// colors
export const EARTH_COLOR = '#A28F6F';
export const RAYS_COLOR = '#ff3636';
export const PLAYER_COLOR = '#ff3636';
export const WALL1_COLOR = '#cbbd93';
export const WALL2_COLOR = 'blue';
