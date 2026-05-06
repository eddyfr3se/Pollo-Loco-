/**
 * Represents the Endboss.
  * @class Endboss
 */
class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -35;
    speed = 5.0;
    hadFirstContact = false;
    firstContactTime = 0;
    attackTimer = 0;

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];
    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];
    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];
    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    /**
     * Initializes the endboss, loads all images, and starts animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5800;
        this.animate();
    }

    /**
     * Starts the endboss movement and state animation intervals.
     */
    animate() {
        setInterval(() => {
            if (this.hadFirstContact && !this.isDead() && !this.isHurt()) {
                let timepassed = new Date().getTime() - this.firstContactTime;
                if (timepassed >= 3000 && this.attackTimer <= 10) {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);
        setInterval(() => {
            this.handleBossState();
        }, 70);
    }

    /**
     * Handles the endboss taking damage and plays hit sound.
     */
    hit() {
        AudioHub.play(AudioHub.BOSS_HIT);
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Handles the endboss animation state (dead, hurt, alert, attack, walk).
     */
    handleBossState() {
        if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
        else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
        else if (this.hadFirstContact) {
            let timepassed = new Date().getTime() - this.firstContactTime;
            if (timepassed < 3000) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAttackOrWalk();
            }
        } else this.checkFirstContact();
    }

    /**
     * Switches between attack and walking animations based on timer.
     */
    playAttackOrWalk() {
        this.attackTimer++;
        if (this.attackTimer > 5) this.playAnimation(this.IMAGES_ATTACK);
        else this.playAnimation(this.IMAGES_WALKING);
        if (this.attackTimer > 10) this.attackTimer = 0;
    }

    /**
     * Checks if the player reached the boss and triggers first contact.
     */
    checkFirstContact() {
        this.playAnimation(this.IMAGES_ALERT);
        if (world && world.character.x > 5200) {
            this.hadFirstContact = true;
            this.firstContactTime = new Date().getTime();
        }
    }
}
