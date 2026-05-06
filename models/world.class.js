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
   * Creates a new game world, connects canvas and keyboard, starts drawing and game logic.
   * @param {any} canvas - The game canvas element.
   * @param {any} keyboard - The keyboard controls.
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
   * Links the character to this world instance.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game loop (collisions, throws, game over, remove enemies).
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
   * Checks if the game is over (win or lose).
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
   * Removes dead chickens from the game after 1 second.
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
   * Checks all collisions (enemies, coins, bottles, boss, etc.).
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
    this.checkBottleEnemyCollisions();
    this.checkBossOverrun();
  }

  /**
   * Checks if the endboss passes the player and sets energy to 0 if so.
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
   * Checks if the character collides with an enemy and handles hit or jump on enemy.
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
   * Checks if the character collects a coin and updates the display.
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
   * Checks if the character collects a bottle and updates the display.
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
   * Checks if the player throws a bottle and creates a new throwable object if so.
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
   * Checks if thrown bottles hit enemies and handles hits.
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
   * Draws the entire game world and all objects (game loop).
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
   * Draws the fixed status bars (health, coins, bottles, endboss).
   */
  drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.drawEndbossStatusBar();
  }

  /**
   * Draws all dynamic objects (character, enemies, coins, bottles, throws).
   */
  drawDynamicObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Draws the endboss health bar if the boss has been activated.
   */
  drawEndbossStatusBar() {
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && endboss.hadFirstContact) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Draws a list of objects on the canvas.
   * @param {any} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws a single object on the canvas (mirrored if needed).
   * @param {any} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips the image of an object horizontally.
   * @param {any} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the normal orientation after flipping.
   * @param {any} mo - The object.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
