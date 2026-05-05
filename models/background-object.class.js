/**
 * Represents the BackgroundObject.
  * @class BackgroundObject
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  /**
   * Initializes the instance.
   * @param {any} imagePath - The imagePath parameter.
   * @param {any} x - The x parameter.
   * @param {any} y - The y parameter.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
