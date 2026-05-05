/**
 * Represents the Cloud.
  * @class Cloud
 */
class Cloud extends MovableObject {
  y = 20;
  height = 250;
  width = 500;

  /**
   * Initializes the instance.
   * @param {any} startX - The startX parameter.
   * @param {any} imgPath = "img/5_background/layers/4_clouds/1.png" - The imgPath = "img/5_background/layers/4_clouds/1.png" parameter.
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
   * Executes the animate method.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
