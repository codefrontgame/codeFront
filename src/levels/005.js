import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Log from '../characters/log'
import Boulder from '../characters/boulder'

export default new Level(
  5, // Id
  [ // Hints
    'Det spelar ingen roll i vilken ordning du skrivit koden, varje zombie kommer använda den kod som ' +
    'gäller vid det hinder den kommit fram till',
    'Din kod från förra nivån kanske räcker för att leda dem förbi hindren?',
  ],
  [ // Helptexts
    'Härligt!',
    'Denna gången har vi två zombies. Tror du att båda två klarar av att ta sig förbi hindren?',
  ],
  [ // Entities
    new Zombie(2, 0, 60, 100),
    new Zombie(8, 0, 60, 100),
  ],
  [ // Obstacles
    new Log(2, 5, 100),
    new Log(0, 8, 110),
    new Log(4, 8, 110),
    new Boulder(1, 9, 80),
    new Boulder(3, 9, 80),

    new Boulder(8, 5, 90),
    new Boulder(6, 8, 100),
    new Boulder(10, 8, 100),
    new Log(7, 9, 100),
    new Log(9, 9, 100),
  ]
)
