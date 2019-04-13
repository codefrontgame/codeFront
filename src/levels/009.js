import Level from '@/levels/level'
import Log from '../characters/log'
import FireBat from '../characters/firebat'

export default new Level(
  9, // Id
  { // Hints
    move: [
      'Karaktärerna kommer att följa den kod du gett dem, oavsett om det är nödvändigt eller ej',
      'Behöver du kolla om det finns några stockar ivägen?',
    ],
  },
  [ // Helptexts
    'Bra jobbat!',
    'Firebat känner sig nu redo att börja flyga, så framöver kommer dem att kunna flyga över hinder!',
    'Du kan fortfarande be firebat att gå åt sidan om det finns en stock framför, men du kan också låta hen ' +
    'flyga över hindren.',
  ],
  [ // Entities
    new FireBat(5, 0, 1, 1, 100, true),
  ],
  [ // Obstacles
    new Log(2, 6, 1, 1),
    new Log(3, 6, 1, 1),
    new Log(4, 6, 1, 1),
    new Log(5, 6, 1, 1),
    new Log(6, 6, 1, 1),
    new Log(7, 6, 1, 1),
    new Log(8, 6, 1, 1),
  ]
)
