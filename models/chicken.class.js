/**
 * Represents the Chicken.
  * @class Chicken
 */
class Chicken extends MovableObject {
  y = 350;
  width = 80;
  height = 80;
  energy = 20;
  offset = {
    top: 0,
    left: 5,
    right: 5,
    bottom: 0,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
 * Registers a hit and plays the appropriate death sound.
 */
  hit() {
    let wasDead = this.isDead();
    super.hit();
    if (!wasDead && this.isDead()) {
      if (this instanceof ChickenSmall) {
        AudioHub.play(AudioHub.CHICKEN_SMALL_DEAD);
      } else {
        AudioHub.play(AudioHub.CHICKEN_DEAD);
      }
    }
  }

  /**
   * Initializes the chicken at a given position and starts animation.
   * @param {any} x - The x position.
   */
  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    if (x !== undefined) {
      this.x = x + Math.random() * 50 - 25;
    } else {
      this.x = 200 + Math.random() * 500;
    }

    this.speed = 0.15 + Math.random() * 0.5;

    this.animate();
  }

  /**
   * Animates the chicken (walking or dead).
   */
  animate() {
    let moveInterval = setInterval(() => {
      if (!this.isDead()) this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.loadImage(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
