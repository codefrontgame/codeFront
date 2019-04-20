import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import WoodenTower from '@/characters/wooden-tower'

export default new Level(
  0, // Id
  [ // Hints
    'First hint',
    'Second hint',
  ],
  [ // Help-texts
    'Välkommen till codeFront ...',
    '',
  ],
  [ // Entities
    new WoodenTower(7, 10, 1, 1, 100),
    new Zombie(5, 0, 1, 1, 100),
  ],
  [] // Obstacles
)
