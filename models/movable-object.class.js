/**
 * Represents the MovableObject.
  * @class MovableObject
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Executes the applyGravity method.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Executes the isAboveGround method.
   */
  isAboveGround() {
    return this.y < 180;
  }

  /**
   * Executes the isColliding method.
   * @param {any} mo - The mo parameter.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Executes the hit method.
   */
  hit() {
    if (!this.isHurt()) {
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  }

  /**
   * Executes the isHurt method.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Executes the isDead method.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Executes the playAnimation method.
   * @param {any} images - The images parameter.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Executes the moveRight method.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Executes the moveLeft method.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Executes the jump method.
   */
  jump() {
    this.speedY = 30;
  }
}
