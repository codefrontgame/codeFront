import Level from '@/levels/level'
import Log from '../characters/log'
import Boulder from '../characters/boulder'
import FireBat from '../characters/firebat'

export default new Level(
  7, // Id
  { // Hints
    move: [
      'Kommer du ihåg vilka olika nyckelord du kan använda i en \'if-sats\'?',
      'Du kan alltid kolla i boken om du behöver hjälp att komma ihåg',
    ],
  },
  [ // Helptexts
    'Bra, firebat börjar lära sig! Men det verkar som att hen kan behöva lite mer övning.',
    'Visst kan du hjälpa dessa två att komma framåt?',
  ],
  [ // Entities
    new FireBat(3, 0, 1, 1, 100),
    new FireBat(7, 0, 1, 1, 100),
  ],
  [ // Obstacles
    new Boulder(3, 6, 1, 1),
    new Log(7, 6, 1, 1),
  ]
)
