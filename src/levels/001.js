import Level from '@/levels/level'
import Zombie from '@/characters/zombie'
import Boulder from '../characters/boulder'

export default new Level(
  1, // Id
  { // Hints
    move: [
      'När vill du att zombien ska gå åt ett annat håll? Vilket fall blir det?',
      'Testa att byta ut vilken riktning zombien ska gå i något av fallen och se vad som händer.',
      'Den kod som står efter \'if isInFrontOfRock:\' gäller bara när zombien står precis framför stenen.',
      'Försök få zombien att gå fram till stenen och därefter gå runt den.',
    ],
  },
  [ // Helptexts
    'Bra jobbat! Det där klarade du av galant.',
    'Men vägen mot slottet kommer bara att bli svårare och utan mina kodkrafter kan jag inte hjälpa våra vänner att undvika hinder.',
    'Därför måste du hjälpa dem istället! Skriv instruktioner i rutan till höger för att berätta för dem vad de ska göra.',
    'Genom att använda nyckelordet \'if\' så kan du göra val beroende på om ett visst villkor är sant eller inte.',
    'På denna nivån kollar zombien om hen är framför en sten med hjälp av villkoret \'isInFrontOfRock\'. Det vi frågar är om zombien isInFrontOfRock',
    'Annars, om villkoret inte är sant, kommer zombien välja att göra det som står efter \'else\'.',
    'Testa dig gärna fram. Du kan alltid återställa koden om det skulle behövas',
  ],
  [ // Entities
    new Zombie(5, 0, 1, 1, 100),
  ],
  [ // Obstacles
    new Boulder(5, 5, 1, 1),
  ]
)
