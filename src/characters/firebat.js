import Character from './character'
// TODO, this thing is broken....
class FireBat extends Character {
  update ({ userFunctions, board, entities, ticks }) {}
  draw ({ board, sketch }) {}
  static userFunctions = {
    move: {
      cn: 'Move',
      name: 'move',
      description: 'Move the zombie',
      parameters: ['x', 'y'],
      userCode: '\t// Skriv din kod här',
    },
    shoot: {
      cn: 'Skjut',
      name: 'shoot',
      description: 'Shoot over the zombie',
      parameters: ['x', 'y'],
      userCode: '\t// Skriv din kod här',
    },
  }
  static image = 'assets/firebat.png'
}

export default FireBat
