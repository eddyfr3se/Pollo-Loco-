/**
 * Represents the Coin.
  * @class Coin
 */
class Coin extends MovableObject {
  width = 100;
  height = 100;
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

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
    }, 200);
  }
}
