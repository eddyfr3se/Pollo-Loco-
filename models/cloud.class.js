/**
 * Represents the Cloud.
  * @class Cloud
 */
class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  /**
   * Creates a new cloud at a given X position and loads its image.
   * @param {number} startX - The starting X position for the cloud.
   * @param {string} imgPath - The image path for the cloud (default is the main cloud image).
   */
  constructor(startX, imgPath = "img/5_background/layers/4_clouds/1.png") {
    super().loadImage(imgPath);

    if (startX !== undefined) {
      this.x = startX + Math.random() * 200;
    } else {
      this.x = Math.random() * 500;
    }
    this.animate();
  }

  /**
   * Starts the animation to move the cloud left continuously.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
