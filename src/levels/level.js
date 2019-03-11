/**
 * Representing a game level
 */
export default class Level {
  /**
   * Construct a level
   * @param id Id of the level
   * @param hints Hints on the level
   *              Represented as object with function names as keys and array with hints for that function as values
   * @param helpTexts Help messages from the duck
   * @param entities Initial entities for this level
   * @param obstacles Obstacles on this level
   */
  constructor (id, hints, helpTexts, entities, obstacles) {
    this.id = id
    this.hints = hints
    this.helpTexts = helpTexts
    this.entities = entities
    this.obstacles = obstacles
  }
}
