import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'

export default new Level(
  4, // Id
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
    new Log(3, 8, 1, 1),
    new Log(7, 8, 1, 1),
    new Boulder(4, 10, 1, 1),
    new Boulder(6, 10, 1, 1),
  ]
)
