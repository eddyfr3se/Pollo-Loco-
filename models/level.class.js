/**
 * Represents the Level.
  * @class Level
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 3300;

  /**
   * Initializes the instance.
   * @param {any} enemies - The enemies parameter.
   * @param {any} clouds - The clouds parameter.
   * @param {any} backgroundObjects - The backgroundObjects parameter.
   * @param {any} coins - The coins parameter.
   * @param {any} bottles - The bottles parameter.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
