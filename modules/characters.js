import { playerAttack, enemyAttack } from './playerActions.js';

import Player from './Player.js';

const player1 = new Player({
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  rootSelector: 'arenas',
  attack: playerAttack,
});

const player2 = new Player({
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  rootSelector: 'arenas',
  attack: enemyAttack,
});

export { player1, player2 };
