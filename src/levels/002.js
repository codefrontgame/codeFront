import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'

export default new Level(
  2, // Id
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
    new Zombie(5, 0, 1, 1, 100),
  ],
  [ // Obstacles
    new Log(5, 6, 1, 1),
  ]
)
