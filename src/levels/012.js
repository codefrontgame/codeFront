import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import WoodenTower from '@/characters/wooden-tower'
import FireBat from '../characters/firebat'

export default new Level(
  12, // Id
  [ // Hints
    'Om du går förbi tornen tillräckligt fort kommer du att klara dig',
    'Försök att springa förbi så fort som möjligt',
  ],
  [ // Help-texts
    'Bra gjort! Vi kom förbi där med.',
    'Det är något annorlunda med de här tornen. Jag tror att de som stal mina kodkrafter har beväpnat dem.',
    'Tror du våra vänner klarar sig förbi dem?',
  ],
  [ // Entities
    new WoodenTower(1, 10, 150, 100),
    new WoodenTower(9, 10, 150, 100),
    new Zombie(3, 0, 60, 100),
    new FireBat(7, 0, 100, 100, true),
  ],
  [] // Obstacles
)
