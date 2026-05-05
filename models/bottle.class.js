/**
 * Represents the Bottle.
  * @class Bottle
 */
class Bottle extends MovableObject {
  width = 80;
  height = 80;
  IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Initializes the instance.
   * @param {any} x - The x parameter.
   * @param {any} y - The y parameter.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Executes the animate method.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 400);
  }
}
