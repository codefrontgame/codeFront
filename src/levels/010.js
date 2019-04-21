import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'
import FireBat from '../characters/firebat'

export default new Level(
  10, // Id
  [ // Hints
    'Om du vill att firebat ska flyga över hinder behöver du inte titta om det finns några ivägen, ' +
    'eller så kan du be hen flyga framåt även om det gör det',
  ],
  [ // Helptexts
    'Härligt!',
    'Här kommer vi kunna se skillnaden mellan zombie och firebat. Alla har sina olika styrkor.',
  ],
  [ // Entities
    new Zombie(2, 0, 70, 100),
    new FireBat(8, 0, 100, 100, true),
  ],
  [ // Obstacles
    new Log(2, 6, 100),
    new Log(0, 9, 110),
    new Log(4, 9, 110),
    new Boulder(1, 10, 80),
    new Boulder(3, 10, 80),

    new Boulder(8, 6, 90),
    new Boulder(6, 9, 100),
    new Boulder(10, 9, 100),
    new Log(7, 10, 100),
    new Log(9, 10, 100),
  ]
)
