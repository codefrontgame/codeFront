import Level from '@/levels/level'
import Zombie from '@/characters/zombie'

export default new Level(
  0,
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
    new Zombie(0, 0),
  ],
  []
)
