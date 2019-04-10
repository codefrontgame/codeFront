import Level from '@/levels/level'
import Log from '../characters/log'
import Boulder from '../characters/boulder'
import FireBat from '../characters/firebat'

export default new Level(
  9, // Id
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
    new FireBat(5, 0, 1, 1, 100),
  ],
  [ // Obstacles
    new Log(2, 6, 1, 1),
    new Log(3, 6, 1, 1),
    new Log(4, 6, 1, 1),
    new Log(5, 6, 1, 1),
    new Log(6, 6, 1, 1),
    new Log(7, 6, 1, 1),
    new Log(8, 6, 1, 1),
  ]
)
