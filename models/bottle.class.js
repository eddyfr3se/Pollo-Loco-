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
  offset = {
    top: 15,
    left: 20,
    right: 20,
    bottom: 10
  };

  /**
   * Initializes the bottle at a given position and starts animation.
   * @param {any} x - The x position.
   * @param {any} y - The y position.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Animates the bottle by cycling through images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 400);
  }
}
