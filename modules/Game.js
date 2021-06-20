import Player from './Player.js';
import { playerAttack, enemyAttack } from './playerActions.js';
import generateLogs from './logs.js';
import { roundFight } from './roundFight.js';
import { checkWinner } from './roundEnd.js';
import { $formFight } from './gameScene.js';
import { getRandom } from './utils.js';

class Game {
  getPlayers = async () => {
    const body = fetch(
      'https://reactmarathon-api.herokuapp.com/api/mk/players'
    ).then(res => res.json());
    return body;
  };

  getRandomEnemy = async () => {
    const body = fetch(
      'https://reactmarathon-api.herokuapp.com/api/mk/player/choose'
    ).then(res => res.json());
    return body;
  };

  start = async () => {
    const players = await this.getPlayers();
    console.log(players);
    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = await this.getRandomEnemy();
    const player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas',
      attack: playerAttack,
    });
    const player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas',
      attack: enemyAttack,
    });

    player1.createPlayer();
    player2.createPlayer();
    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', event => {
      event.preventDefault();
      roundFight(player1, player2);
      checkWinner(player1, player2);
    });
  };
}

export default Game;
