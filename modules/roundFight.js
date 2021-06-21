import generateLogs from './logs.js';
import { $formFight } from './gameScene.js';
import { getRandom } from './utils.js';

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const roundFight = async (player1, player2) => {
  const getPlayerAttack = async () => {
    const attack = {};

    for (let item of $formFight) {
      if (item.checked && item.name === 'hit') {
        attack.value = getRandom(HIT[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === 'defence') {
        attack.defence = item.value;
      }
      item.checked = false;
    }
    return attack;
  };

  const getEnemyAttack = async () => {
    const { hit, defence } = await getPlayerAttack();
    const body = fetch(
      'https://reactmarathon-api.herokuapp.com/api/mk/player/fight',
      {
        method: 'POST',
        body: JSON.stringify({
          hit,
          defence,
        }),
      }
    ).then(res => res.json());
    return body;
  };

  const { player1: player, player2: enemy } = await getEnemyAttack();
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
};

export { roundFight };
