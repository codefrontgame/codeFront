import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'

export default new Level(
  2, // Id
  [ // Hints
    'Vad är det som är annorlunda på denna banan?',
    'Vad är det zombien behöver akta sig för nu?',
    'Stämmer villkoret denna gången? Kan du prova ett annat villkor?',
  ],
  [ // Helptexts
    'Härligt! Nu har vi kommit närmare.',
    'Åh nej! Nu är det något annat framför zombien. Hen vet tyvärr bara hur man går runt **stenar**...',
    'Du måste hjälpa hen att gå runt stocken istället!',
  ],
  [ // Entities
    new Zombie(5, 0, 60, 100),
  ],
  [ // Obstacles
    new Log(5, 6, 150),
  ]
)
