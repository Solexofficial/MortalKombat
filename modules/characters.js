import {
  playerAttack,
  enemyAttack,
  changeHP,
  elHP,
  renderHP,
} from './playerActions.js';

const player1 = {
  player: 1,
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Kunai', 'Sword', 'Axe'],
  attack: playerAttack,
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Knife', 'Blade', 'DualSword'],
  attack: enemyAttack,
  changeHP,
  elHP,
  renderHP,
};

export { player1, player2 };
