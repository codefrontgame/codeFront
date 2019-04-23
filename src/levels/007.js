import Level from '@/levels/level'
import Log from '../characters/log'
import Boulder from '../characters/boulder'
import FireBat from '../characters/firebat'

export default new Level(
  7, // Id
  [ // Hints
    'Kommer du ihåg vilka olika nyckelord du kan använda i en `if`-sats?',
    'Du kan alltid kolla i boken om du behöver hjälp att komma ihåg',
  ],
  [ // Helptexts
    'Bra, firebat börjar lära sig! Men det verkar som att det kan behövas lite mer övning.',
    'Visst kan du hjälpa dessa två att komma framåt?',
  ],
  [ // Entities
    new FireBat(3, 0, 100, 20, false),
    new FireBat(7, 0, 100, 20, false),
  ],
  [ // Obstacles
    new Boulder(3, 6, 150),
    new Log(7, 6, 200),
  ]
)
