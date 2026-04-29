class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;



    constructor(startX, imgPath = 'img/5_background/layers/4_clouds/1.png') {
        super().loadImage(imgPath);

        if (startX !== undefined) {
            this.x = startX + Math.random() * 200;
        } else {
            this.x = Math.random() * 500;
        }
        this.animate();

    }

    animate() {        /// l#sst die wolken bewegen 
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


}





