/**
 * Represents the ThrowableObject.
  * @class ThrowableObject
 */
class ThrowableObject extends MovableObject {
  IMAGES_ROTATING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  hasHit = false;

  /**
   * Initializes the throwable object (bottle) and starts its throw.
   * @param {any} x - The x position.
   * @param {any} y - The y position.
   * @param {any} otherDirection - Direction of throw.
   */
  constructor(x, y, otherDirection) {
    super().loadImage(this.IMAGES_ROTATING[0]);
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  /**
   * Always returns true (bottle is always above ground).
   */
  isAboveGround() {
    return true;
  }

  /**
   * Starts the throw animation and movement.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    let moveInterval = setInterval(() => {
      if (this.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 25);
    this.animate(moveInterval);
  }

  /**
   * Animates the bottle (rotating or splash) depending on hit state.
   * @param {any} moveInterval - The movement interval.
   */
  animate(moveInterval) {
    setInterval(() => {
      if (this.hasHit) {
        this.playAnimation(this.IMAGES_SPLASH);
        clearInterval(moveInterval);
      } else {
        this.playAnimation(this.IMAGES_ROTATING);
      }
    }, 50);
  }
}
