import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'

export default new Level(
  3, // Id
  { // Hints
    move: [
      'Nyckelordet \'or\' är ordet \'eller\' på engelska. Du kan använda det på ungefär samma sätt som när du pratar',
      'Du kan be zombien göra något visst OM villkor x ELLER villkor y är uppfyllda',
    ],
  },
  [ // Helptexts
    'Bra gjort!',
    'Titta, denna gången har vi två zombies med oss!',
    'Dessa två zombies använder sig av samma kod för att veta hur de ska röra sig, så du måste se till att koden ' +
    'låter båda komma förbi sina hinder.',
    'För att göra detta kan du använda dig av nyckelordet \'or\'. Genom att använda det så kan du använda flera ' +
    'villkor i samma \'if-sats\'.',
  ],
  [ // Entities
    new Zombie(3, 0, 60, 100),
    new Zombie(7, 0, 60, 100),
  ],
  [ // Obstacles
    new Boulder(3, 6, 90),
    new Log(7, 6, 150),
  ]
)
