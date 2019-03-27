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
  [ // Helptexts
    'Välkommen till codeFront ...',
    '',
  ],
  [ // Entities
    new WoodenTower(7, 5, 1, 1, 1000),
    new Zombie(5, 0, 1, 1, 100),
  ],
  [] // Obstacles
)
