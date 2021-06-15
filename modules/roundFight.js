// import { getRandom } from './utils.js';
import generateLogs from './logs.js';

function roundFight(player1, player2) {
  const player = player1.attack();
  const enemy = player2.attack();

  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs('hit', player1, player2, player.value);
  } else {
    generateLogs('defence', player1, player2);
  }

  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1, enemy.value);
  } else {
    generateLogs('defence', player2, player1);
  }
}

export { roundFight };
