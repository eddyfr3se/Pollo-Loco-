/**
 * Represents the Character.
  * @class Character
 */
class Character extends MovableObject {
  height = 250;
  y = 180;
  speed = 10;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;
  coins = 0;
  bottles = 0;
  lastAction = 0;
  offset = {
    top: 120,
    bottom: 30,
    left: 40,
    right: 40,
  };

  /**
   * Executes the hit method.
   */
  hit() {
    if (!this.isHurt()) {
      AudioHub.play(AudioHub.CHAR_HIT);
    }
    super.hit();
  }

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Initializes the instance.
   */
  constructor() {
    super();
    this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.lastAction = new Date().getTime();

    this.animate();
  }

  /**
   * Executes the collectCoin method.
   */
  collectCoin() {
    this.coins += 10;
    if (this.coins > 100) this.coins = 100;
  }

  /**
   * Executes the collectBottle method.
   */
  collectBottle() {
    this.bottles += 10;
    if (this.bottles > 100) this.bottles = 100;
  }

  /**
   * Executes the animate method.
   */
  animate() {
    setInterval(() => this.moveCharacter(), 1000 / 60);
    setInterval(() => this.playCharacterAnimations(), 100);
  }


  /**
   * Executes the moveCharacter method.
   */
  moveCharacter() {
    AudioHub.CHAR_RUN.pause();
    if (this.world && this.world.keyboard) {
      this.handleMovement();
      this.world.camera_x = -this.x + 50;
    }
  }

  /**
   * Executes the handleMovement method.
   */
  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!this.isAboveGround()) {
        AudioHub.CHAR_RUN.play();
      }
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      if (!this.isAboveGround()) {
        AudioHub.CHAR_RUN.play();
      }
    }
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * Executes the playCharacterAnimations method.
   */
  playCharacterAnimations() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.lastAction = new Date().getTime();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.lastAction = new Date().getTime();
    } else {
      this.playGroundAnimations();
    }
  }

  /**
   * Executes the playGroundAnimations method.
   */
  playGroundAnimations() {
    if (
      this.world &&
      this.world.keyboard &&
      (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
    ) {
      this.playAnimation(this.IMAGES_WALKING);
      this.lastAction = new Date().getTime();
    } else {
      if (this.world && this.world.keyboard && this.world.keyboard.SPACE) {
        this.lastAction = new Date().getTime();
      }
      let timepassed = new Date().getTime() - this.lastAction;
      if (timepassed > 5000) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }
  }

  /**
   * Executes the jump method.
   */
  jump() {
    this.speedY = 30;
    AudioHub.play(AudioHub.CHAR_JUMP);
  }
}