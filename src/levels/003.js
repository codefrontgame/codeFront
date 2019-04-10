import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'

export default new Level(
  3, // Id
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
    new Zombie(3, 0, 1, 1, 100),
    new Zombie(7, 0, 1, 1, 100),
  ],
  [ // Obstacles
    new Boulder(3, 6, 1, 1),
    new Log(7, 6, 1, 1),
  ]
)
