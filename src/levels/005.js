import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'

export default new Level(
  5, // Id
  { // Hints
    move: [
      'Det spelar ingen roll i vilken ordning du skrivit koden, varje zombie kommer använda den kod som ' +
      'gäller vid det hinder den kommit fram till',
      'Din kod från förra nivån kanske räcker för att leda dem förbi hindren?',
    ],
  },
  [ // Helptexts
    'Härligt!',
    'Denna gången har vi två zombies. Tror du dem klara av att ta sig förbi hindren båda två?',
  ],
  [ // Entities
    new Zombie(2, 0, 1, 1, 100),
    new Zombie(8, 0, 1, 1, 100),
  ],
  [ // Obstacles
    new Log(2, 6, 1, 1),
    new Log(0, 8, 1, 1),
    new Log(4, 8, 1, 1),
    new Boulder(1, 10, 1, 1),
    new Boulder(3, 10, 1, 1),

    new Boulder(8, 6, 1, 1),
    new Boulder(6, 8, 1, 1),
    new Boulder(10, 8, 1, 1),
    new Log(7, 10, 1, 1),
    new Log(9, 10, 1, 1),
  ]
)
