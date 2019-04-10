import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import WoodenTower from '@/characters/wooden-tower'
import FireBat from '../characters/firebat'

export default new Level(
  12, // Id
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
    new WoodenTower(1, 10, 1, 1, 100),
    new WoodenTower(9, 10, 1, 1, 100),
    new Zombie(3, 0, 1, 1, 100),
    new FireBat(7, 0, 1, 1, 100),
  ],
  [] // Obstacles
)
