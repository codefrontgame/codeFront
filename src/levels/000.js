import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import WoodenTower from '@/characters/wooden-tower'

export default new Level(
  0, // Id
  { // Hints
    move: [
      'The first hint',
      'The second hint',
    ],
  },
  [ // Help-texts
    'Välkommen till codeFront ...',
    '',
  ],
  [ // Entities
    new WoodenTower(7, 10, 120, 100),
    new Zombie(5, 0, 50, 100),
  ],
  [] // Obstacles
)
