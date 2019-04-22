import Level from '@/levels/level'
import Zombie from '@/characters/zombie'

export default new Level(
  0, // Id
  [ // Hints
    'Det är bara att köra',
    'Tryck på \'Starta\'-knappen',
  ],
  [ // Help-texts
    '**Välkommen till codeFront!** Det är jag som är kodAnkan. Jag kommer att finnas här nere i vänstra hörnet för att hjälpa dig.',
    'Min kodkraft har blivit stulen och finns nu i det rosa kristallslottet. Jag behöver **din** hjälp för att återfå kraften.',
    'För att komma framåt måste vi tillsammans berätta för våra vänner vart de ska gå. Denna gången är det bara att säga åt vår vänn att gå.',
  ],
  [ // Entities
    new Zombie(5, 0, 70, 100),
  ],
  [] // Obstacles
)
