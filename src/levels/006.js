import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'
import FireBat from '../characters/firebat'

export default new Level(
  6, // Id
  { // Hints
    move: [
      'Kommer du ihåg hur en \'if-stats\' ser ut?',
      'Du kan kolla i boken om du behöver hjälp att komma ihåg',
      'Detta är samma problem som du löste för zombien på nivå 1',
    ],
  },
  [ // Helptexts
    'Vilken bra kod du gjort som klarade av den banan med!',
    'Här har vi en ny vän. Detta är detta är en firebat och hen är helt ny.',
    'Du kommer behöva lära firebat hur hen ska gå helt från början. Men detta problem har vi väl sett tidigare...',
  ],
  [ // Entities
    new FireBat(5, 0, 1, 1, 100),
  ],
  [ // Obstacles
    new Boulder(5, 6, 1, 1),
  ]
)
