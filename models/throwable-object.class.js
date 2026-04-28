class ThrowableObject extends MovableObject {

    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    hasHit = false;

    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATING[0]);
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    isAboveGround() {
        return true;
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        let moveInterval = setInterval(() => {
            this.x += 10;
        }, 25);
        this.animate(moveInterval);
    }

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
