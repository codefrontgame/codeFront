import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Boulder from '../characters/boulder'

export default new Level(
  1,
  {
    move: [
      'The first hint',
      'The second hint',
    ],
  },
  [
    'Välkommen till codeFront ...',
    '',
  ],
  [
    new Zombie(5, 0),
  ],
  [
    new Boulder(5, 5, 1, 1),
  ]
)
