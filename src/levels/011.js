import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'
import FireBat from '../characters/firebat'
import WoodenTower from '../characters/wooden-tower'

export default new Level(
  11, // Id
  [ // Hints
    'Vad kan du göra om du inte kan flyga över **tornet**?',
    'Zombien kanske behöver nya instuktioner nu när det finns ett nytt hinder?',
  ],
  [ // Helptexts
    'Oj vilka stora **torn**! Jag vet inte om firebat kommer kunna flyga över dem.',
    'Och glöm inte att be zombien att kolla efter **torn** med!',
  ],
  [ // Entities
    new Zombie(2, 0, 50, 100),
    new FireBat(8, 0, 50, 100, true),

  ],
  [ // Obstacles
    new Log(0, 8, 110),
    new Log(4, 8, 110),
    new Boulder(1, 9, 80),
    new Boulder(3, 9, 80),

    new Boulder(6, 8, 100),
    new Boulder(10, 8, 100),
    new Log(7, 9, 100),
    new Log(9, 9, 100),

    // TODO: make sure attack and obscure the path in both obstacles and entities!!
    new WoodenTower(2, 6, 90, 100),
    new WoodenTower(8, 6, 90, 100),
  ]
)
