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
    ],

    [
      new Coin(400, 200),
      new Coin(700, 150),
      new Coin(1000, 150),
      new Coin(1300, 200),
      new Coin(1600, 200),
      new Coin(1900, 150),
      new Coin(2200, 150),
      new Coin(2500, 200),
      new Coin(2800, 200),
      new Coin(3200, 150),
    ],

    [
      new Bottle(300, 350),
      new Bottle(600, 350),
      new Bottle(900, 350),
      new Bottle(1200, 350),
      new Bottle(1500, 350),
      new Bottle(1800, 350),
      new Bottle(2100, 350),
      new Bottle(2400, 350),
      new Bottle(2700, 350),
      new Bottle(3100, 350),
    ],
  );
}
