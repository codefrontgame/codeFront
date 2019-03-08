class Level {
  id
  hints
  helpTexts
  entities
  obstacles
  constructor (id, hints, helpTexts, entities, obstacles) {
    this.id = id
    this.hints = hints
    this.helpTexts = helpTexts
    this.entities = entities
    this.obstacles = obstacles
  }
}

export default Level
