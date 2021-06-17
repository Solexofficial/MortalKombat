import { playerAttack, enemyAttack } from './playerActions.js';

import Player from './Player.js';

const subzero = new Player({
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  rootSelector: 'arenas',
  attack: playerAttack,
});

const scorpion = new Player({
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  rootSelector: 'arenas',
  attack: enemyAttack,
});

export { subzero, scorpion };
