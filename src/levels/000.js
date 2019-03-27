import Level from '@/levels/level'
import Zombie from '@/characters/zombie'

export default new Level(
  0, // Id
  { // Hints
    move: [
      'The first hint',
      'The second hint',
    ],
  },
  [ // Helptexts
    'Välkommen till codeFront ...',
    '',
  ],
  [ // Entities
    new Zombie(5, 0, 1, 1),
  ],
  [] // Obstacles
)
