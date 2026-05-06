/**
 * Represents the BackgroundObject.
  * @class BackgroundObject
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  /**
   * Initializes the background object with image and position.
   * @param {any} imagePath - The image path.
   * @param {any} x - The x position.
   * @param {any} y - The y position.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
