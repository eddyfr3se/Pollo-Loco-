/**
 * Represents the ChickenSmall.
  * @class ChickenSmall
 */
class ChickenSmall extends Chicken {
  y = 370;
  width = 60;
  height = 60;
  offset = {
    top: -20,
    left: 5,
    right: 5,
    bottom: 0,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  /**
   * Initializes the instance.
   * @param {any} x - The x parameter.
   */
  constructor(x) {
    super(x);
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    if (x !== undefined) {
      this.x = x + Math.random() * 50 - 25;
    } else {
      this.x = 800 + Math.random() * 2000;
    }
    this.speed = 0.5 + Math.random() * 1.5;
  }
}
