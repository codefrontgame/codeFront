import Level from '@/levels/level'
import Log from '../characters/log'
import Boulder from '../characters/boulder'
import FireBat from '../characters/firebat'

export default new Level(
  8, // Id
  [ // Hints
    'Du kan kolla i boken om du behöver hjälp att komma ihåg hur \'elif\' fungerar',
    'Kan du få firebat att göra olika saker beroende på vilken typ av hinder hen har framför sig?',
  ],
  [ // Helptexts
    'Titta vad dem kan!',
    'Här kommer alla dessa hinder igen. Nog kan vi få firebat att klara dessa med!',
  ],
  [ // Entities
    new FireBat(5, 0, 100, 100, false),
  ],
  [ // Obstacles
    new Log(5, 6, 100),
    new Log(2, 9, 110),
    new Log(8, 9, 110),
    new Boulder(3, 10, 70),
    new Boulder(7, 10, 70),
  ]
)
