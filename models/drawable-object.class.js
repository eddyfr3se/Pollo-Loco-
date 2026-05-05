/**
 * Represents the DrawableObject.
  * @class DrawableObject
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Executes the loadImage method.
   * @param {any} path - The path parameter.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Executes the draw method.
   * @param {any} ctx - The ctx parameter.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Executes the loadImages method.
   * @param {any} arr - The arr parameter.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
