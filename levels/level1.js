let level1;

/**
 * Executes the initLevel function.
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(700),
      new ChickenSmall(900),
      new Chicken(1100),
      new ChickenSmall(1300),
      new Chicken(1500),
      new ChickenSmall(1700),
      new Chicken(1900),
      new ChickenSmall(2100),
      new Chicken(2300),
      new ChickenSmall(2500),
      new Chicken(2700),
      new ChickenSmall(2900),
      new Chicken(3100),
      new ChickenSmall(3250),
      new Chicken(3500),
      new ChickenSmall(3700),
      new Chicken(3900),
      new ChickenSmall(4100),
      new Chicken(4300),
      new ChickenSmall(4500),
      new Chicken(4700),
      new ChickenSmall(4900),
      new Chicken(5100),
      new ChickenSmall(5300),
      new Chicken(5500),

      new Endboss(),
    ],

    [
      new Cloud(0, "img/5_background/layers/4_clouds/1.png"),
      new Cloud(350, "img/5_background/layers/4_clouds/2.png"),
      new Cloud(719, "img/5_background/layers/4_clouds/1.png"),
      new Cloud(1050, "img/5_background/layers/4_clouds/2.png"),
      new Cloud(1438, "img/5_background/layers/4_clouds/1.png"),
      new Cloud(1800, "img/5_background/layers/4_clouds/2.png"),
      new Cloud(2157, "img/5_background/layers/4_clouds/1.png"),
      new Cloud(2500, "img/5_background/layers/4_clouds/2.png"),
      new Cloud(2876, "img/5_background/layers/4_clouds/1.png"),
      new Cloud(3200, "img/5_background/layers/4_clouds/2.png"),
      new Cloud(3595, "img/5_background/layers/4_clouds/1.png"),
      new Cloud(3900, "img/5_background/layers/4_clouds/2.png"),
      new Cloud(4300, "img/5_background/layers/4_clouds/1.png"),
      new Cloud(4700, "img/5_background/layers/4_clouds/2.png"),
      new Cloud(5000, "img/5_background/layers/4_clouds/1.png"),
      new Cloud(5400, "img/5_background/layers/4_clouds/2.png"),
      new Cloud(5800, "img/5_background/layers/4_clouds/1.png"),
    ],

    [
      new BackgroundObject("img/5_background/layers/air.png", -720),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 720),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 2),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720 * 3),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 4),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 4),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 4),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 4),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 5),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720 * 5),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720 * 5),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720 * 5),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 6),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 6),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 6),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 6),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 7),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720 * 7),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720 * 7),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720 * 7),

      new BackgroundObject("img/5_background/layers/air.png", 720 * 8),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 8),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 8),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 8),
    ],

    [
      new Coin(400, 200),
      new Coin(900, 150),
      new Coin(1400, 150),
      new Coin(1900, 200),
      new Coin(2400, 200),
      new Coin(3000, 150),
      new Coin(3600, 150),
      new Coin(4200, 200),
      new Coin(4800, 200),
      new Coin(5400, 150),
    ],

    [
      new Bottle(300, 350),
      new Bottle(800, 350),
      new Bottle(1300, 350),
      new Bottle(1800, 350),
      new Bottle(2300, 350),
      new Bottle(2900, 350),
      new Bottle(3500, 350),
      new Bottle(4100, 350),
      new Bottle(4700, 350),
      new Bottle(5300, 350),
    ],
  );
}
