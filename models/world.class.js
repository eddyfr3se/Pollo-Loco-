/**
 * Represents the World.
  * @class World
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  lastThrowTime = 0;
  isGameOver = false;

  /**
   * Initializes the instance.
   * @param {any} canvas - The canvas parameter.
   * @param {any} keyboard - The keyboard parameter.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Executes the setWorld method.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Executes the run method.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkGameOver();
      this.removeDeadEnemies();
    }, 20);
  }

  /**
   * Executes the checkGameOver method.
   */
  checkGameOver() {
    if (!this.isGameOver) {
      if (this.character.isDead()) {
        this.isGameOver = true;
        setTimeout(() => {
          if (typeof gameOver === "function") gameOver(false);
        }, 1000);
      } else {
        let endboss = this.level.enemies.find((e) => e instanceof Endboss);
        if (endboss && endboss.isDead()) {
          this.isGameOver = true;
          setTimeout(() => {
            if (typeof gameOver === "function") gameOver(true);
          }, 2000);
        }
      }
    }
  }

  /**
   * Executes the removeDeadEnemies method.
   */
  removeDeadEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (enemy instanceof Chicken && enemy.isDead()) {
        let timepassed = new Date().getTime() - enemy.lastHit;
        return timepassed < 1000;
      }
      return true;
    });
  }

  /**
   * Executes the checkCollisions method.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
    this.checkBottleEnemyCollisions();
    this.checkBossOverrun();
  }

  /**
   * Executes the checkBossOverrun method.
   */
  checkBossOverrun() {
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && !endboss.isDead() && !this.character.isDead()) {
      if (endboss.x + endboss.width / 2 < this.character.x) {
        this.character.energy = 0;
        this.statusBar.setPercentage(0);
      }
    }
  }

  /**
   * Executes the checkEnemyCollisions method.
   */
  checkEnemyCollisions() {
    let isJumpingOnEnemy = this.character.speedY < 0;
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead()) {
        if (
          enemy instanceof Chicken &&
          this.character.isAboveGround() &&
          isJumpingOnEnemy
        ) {
          enemy.hit();
          this.character.jump();
        } else {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Executes the checkCoinCollisions method.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        this.statusBarCoin.setPercentage(this.character.coins);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Executes the checkBottleCollisions method.
   */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.statusBarBottle.setPercentage(this.character.bottles);
        this.level.bottles.splice(index, 1);
      }
    });
  }

  /**
   * Executes the checkThrowObjects method.
   */
  checkThrowObjects() {
    let timepassed = new Date().getTime() - this.lastThrowTime;
    if (this.keyboard.SPACE && this.character.bottles > 0 && timepassed > 500) {
      let xPos = this.character.otherDirection
        ? this.character.x - 20
        : this.character.x + 100;
      let bottle = new ThrowableObject(
        xPos,
        this.character.y + 100,
        this.character.otherDirection,
      );
      this.throwableObjects.push(bottle);
      this.character.bottles -= 10;
      this.statusBarBottle.setPercentage(this.character.bottles);
      this.lastThrowTime = new Date().getTime();
    }
  }

  /**
   * Executes the checkBottleEnemyCollisions method.
   */
  checkBottleEnemyCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !bottle.hasHit && !enemy.isDead()) {
          enemy.hit();
          bottle.hasHit = true;
          if (enemy instanceof Endboss) {
            this.statusBarEndboss.setPercentage(enemy.energy);
          }
        }
      });
    });
  }

  /**
   * Executes the draw method.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.drawFixedObjects();
    this.ctx.translate(this.camera_x, 0);
    this.drawDynamicObjects();
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Executes the drawFixedObjects method.
   */
  drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.drawEndbossStatusBar();
  }

  /**
   * Executes the drawDynamicObjects method.
   */
  drawDynamicObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Executes the drawEndbossStatusBar method.
   */
  drawEndbossStatusBar() {
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && endboss.hadFirstContact) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Executes the addObjectsToMap method.
   * @param {any} objects - The objects parameter.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Executes the addToMap method.
   * @param {any} mo - The mo parameter.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Executes the flipImage method.
   * @param {any} mo - The mo parameter.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Executes the flipImageBack method.
   * @param {any} mo - The mo parameter.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
