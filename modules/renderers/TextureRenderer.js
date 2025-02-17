export default class TextureRenderer {
  constructor() {
    this.textures = {};
  }

  loadTexture(name, src) {
    const img = new Image();
    img.src = src;
    this.textures[name] = img;
  }

  loadTextures(texturesPaths) {
    Object.entries(texturesPaths).map(([key, value]) =>
      this.loadTexture(key, value),
    );
  }

  getTexture(name) {
    return this.textures[name];
  }
}
