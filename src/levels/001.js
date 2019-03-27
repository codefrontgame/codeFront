import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Boulder from '../characters/boulder'

export default new Level(
  1, // Id
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
  [ // Obstacles
    new Boulder(5, 5, 1, 1),
  ]
)
