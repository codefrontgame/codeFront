import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'

export default new Level(
  4, // Id
  [ // Hints
    'Vilka nya möjligheter ger `elif` dig?',
    'Med `elif` kan du be zombien göra olika saker beroende vilken typ av hinder den har framför sig',
    'Denna ordningen skrivs det i\n' +
    '`if villkor:`\n' +
    '`elif villkor:`\n' +
    '`else:`',
    'Vad behöver zombien göra när den kommer fram till en stock och vad behöver den göra när den sedan stöter på stenen?',
  ],
  [ // Helptexts TODO:Fixa så texten blir snygg
    'Med din hjälp kommer jag snart få tillbaka mina kodkrafter!',
    'Här behöver vi hjälpa denna zombien att komma igenom alla dessa hinder. Det är så många!',
    'För att lyckas behöver du använda `elif`, vilket är en ihopslagning av orden `else` och `if`.',
    'Detta ger oss möjligheten att ge instruktioner som blir ungefär så här:',
    '**OM** x är sant gör 1\n' +
    '**ANNARS OM** y är sant gör 2\n' +
    '**ANNARS** gör 3',
  ],
  [ // Entities
    new Zombie(5, 0, 60, 100),
  ],
  [ // Obstacles
    new Log(5, 6, 100),
    new Log(3, 9, 110),
    new Log(7, 9, 110),
    new Boulder(4, 10, 90),
    new Boulder(6, 10, 90),
  ]
)
