import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'
import FireBat from '../characters/firebat'

export default new Level(
  10, // Id
  [ // Hints
    'Om du vill att firebat ska flyga över hinder behöver du inte titta om det finns några i vägen, ' +
    'eller så kan du be hen flyga framåt även om det gör det',
  ],
  [ // Helptexts
    'Härligt!',
    'Här kommer vi kunna se skillnaden mellan zombie och firebat. Alla har sina olika styrkor.',
    'Varje typ av karaktär har sina egna instruktioner som de följer.',
    'Du kan ändra om du vill ge instruktioner till firebats eller zombies genom att klicka på knapparna som finns ' +
    'uppe till höger.',

  ],
  [ // Entities
    new Zombie(2, 0, 70, 100),
    new FireBat(8, 0, 100, 100, true),
  ],
  [ // Obstacles
    new Log(2, 5, 100),
    new Log(0, 8, 110),
    new Log(4, 8, 110),
    new Boulder(1, 9, 80),
    new Boulder(3, 9, 80),

    new Boulder(8, 5, 90),
    new Boulder(6, 8, 100),
    new Boulder(10, 8, 100),
    new Log(7, 9, 100),
    new Log(9, 9, 100),
  ]
)
