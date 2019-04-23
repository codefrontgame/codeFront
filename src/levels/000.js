import Level from '@/levels/level'
import Zombie from '@/characters/zombie'

export default new Level(
  0, // Id
  [ // Hints
    'Det är bara att köra',
    'Tryck på \'Starta\'-knappen',
  ],
  [ // Help-texts
    '**Välkommen till codeFront!** Vad bra att du är här!',
    'Det är jag som är kodAnkan och min kodkraft har blivit stulen, den finns nu i det rosa kristallslottet. \nJag behöver **din** hjälp för att återfå kraften.',
    'Jag kommer att finnas här nere i vänstra hörnet för att hjälpa dig med det jag kan.',
    'För att komma framåt måste vi tillsammans berätta för våra vänner hur de ska gå.',
    'Zombien kommer ihåg hur man går framåt, så denna första nivå är det bara be hen att börja gå.',
  ],
  [ // Entities
    new Zombie(5, 0, 70, 100),
  ],
  [] // Obstacles
)
