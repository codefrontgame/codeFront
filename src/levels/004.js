import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'

export default new Level(
  4, // Id
  { // Hints
    move: [
      'Vilka nya möjligheter ger \'elif\' dig?',
      'Med \'elif\' kan du be zombien göra olika saker beroende vilken typ av hinder den har framför sig',
      'Vad behöver zombien göra när den kommer fram till en stock och vad behöver den göra när den sedan stöter på stenen?',
    ],
  },
  [ // Helptexts TODO:Fixa så texten blir snygg
    'Med din hjälp kommer jag snart få tillbaka mina kodkrafter!',
    'Här behöver vi hjälpa denna zombien att komma igenom alla dessa hinder. Det är så många!',
    'För att lyckas behöver du använda \'elif\', vilket är en ihopslagning av orden \'else if\'.',
    'Detta ger oss möjligheten att ge instruktioner som blir ungefär så här:',
    'OM x är sant gör 1' +
    'ANNARS OM y är sant gör 2' +
    'ANNARS gör 3',
  ],
  [ // Entities
    new Zombie(5, 0, 1, 1, 100),
  ],
  [ // Obstacles
    new Log(5, 6, 1, 1),
    new Log(3, 8, 1, 1),
    new Log(7, 8, 1, 1),
    new Boulder(4, 10, 1, 1),
    new Boulder(6, 10, 1, 1),
  ]
)
