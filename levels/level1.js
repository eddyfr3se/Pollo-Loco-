const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [
        new Cloud()
    ],

    [
        new BackgroundObject('img/5_background/layers/air.png', -720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

        new BackgroundObject('img/5_background/layers/air.png', 720 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 720 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 4),
        new BackgroundObject('img/5_background/layers/air.png', 720 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 5),


    ],

    [
        new Coin(400, 200),
        new Coin(600, 150),
        new Coin(800, 200),
        new Coin(1200, 150),
        new Coin(1600, 200)
    ],

    [
        new Bottle(300, 350),
        new Bottle(700, 350),
        new Bottle(1100, 350),
        new Bottle(1500, 350),
        new Bottle(1900, 350)
    ]



);
