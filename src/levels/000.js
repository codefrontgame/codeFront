import Level from '@/levels/level'
import Zombie from '@/characters/zombie'

export default new Level(
  0, // Id
  { // Hints
    move: [
      'Det är bara att köra',
      'Tryck på \'Starta\'-knappen',
    ],
  },
  [ // Help-texts
    'Välkommen till codeFront! Det är jag som kodAnkan. Jag kommer att finnas här nere i vänstra hörnet för att hjälpa dig.',
    'Min kodkraft har blivit stulen och finns nu i det rosa kristallslottet. Jag behöer din hjälp för att återfå kraften.',
    'För att komma framåt måste vi tillsammans berätta för våra vänner vart de ska gå. Denna gången är det bara att säga åt vår vänn at gå.',
  ],
  [ // Entities
    new Zombie(5, 0, 1, 1, 100),
  ],
  [] // Obstacles
)
