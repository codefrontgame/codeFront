import Level from '@/levels/level'
import Zombie from '@/characters/zombie'

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
    new Zombie(10, 0),
    new Zombie(5, 0),
  ],
  []
)
