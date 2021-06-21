import Player from './Player.js';
import generateLogs from './logs.js';
import { roundFight } from './roundFight.js';
import { checkWinner } from './roundEnd.js';
import { $formFight, $arenas } from './gameScene.js';
import { getRandom } from './utils.js';

class Game {
  getRandomEnemy = async () => {
    const body = fetch(
      'https://reactmarathon-api.herokuapp.com/api/mk/player/choose'
    ).then(res => res.json());
    return body;
  };

  start = async () => {
    const p1 = JSON.parse(localStorage.getItem('player1'));
    const p2 = await this.getRandomEnemy();
    const player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: 'arenas',
    });
    const player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: 'arenas',
    });
    $arenas.classList.add(`arena${getRandom(6)}`);
    player1.createPlayer();
    player2.createPlayer();
    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', async event => {
      event.preventDefault();
      await roundFight(player1, player2);
      checkWinner(player1, player2);
    });
  };
}

export default Game;
