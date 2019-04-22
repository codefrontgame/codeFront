import Level from '@/levels/level'
import Log from '../characters/log'
import FireBat from '../characters/firebat'

export default new Level(
  9, // Id
  [ // Hints
    'Karaktärerna kommer att följa den kod du gett dem, oavsett om det är nödvändigt eller ej',
    'Behöver du kolla om det finns några stockar ivägen?',
  ],
  [ // Helptexts
    'Bra jobbat!',
    'Firebat känner sig nu redo att börja flyga, så framöver kommer firebat att kunna flyga över vissa hinder!',
    'Du kan fortfarande be firebat att gå åt sidan om det finns en stock framför, men du kan också låta hen ' +
    'flyga över hindren.',
  ],
  [ // Entities
    new FireBat(5, 0, 150, 100, true),
  ],
  [ // Obstacles
    new Log(2, 6, 250),
    new Log(5, 6, 250),
    new Log(8, 6, 250),
  ]
)
