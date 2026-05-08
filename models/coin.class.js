/**
 * Represents the Coin.
  * @class Coin
 */
class Coin extends MovableObject {
  width = 100;
  height = 100;
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  offset = {
    top: 25,
    left: 25,
    right: 25,
    bottom: 25
  };

  /**
   * Creates a new coin at the given position and starts its animation.
   * @param {number} x - The X position of the coin.
   * @param {number} y - The Y position of the coin.
   */
  constructor(x, y) {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Starts the coin animation by cycling through images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 200);
  }
}
