import generateLogs from './logs.js';
import { $formFight } from './gameScene.js';
import { getRandom } from './utils.js';

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

function roundFight(player1, player2) {
  let playerATK, player, enemy;
  async function getPlayerAttack() {
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
  }
  getPlayerAttack().then(resolve => (playerATK = resolve));

  async function getEnemyAttack() {
    await getPlayerAttack();
    const { hit, defence } = playerATK;
    const body = fetch(
      'http://reactmarathon-api.herokuapp.com/api/mk/player/fight',
      {
        method: 'POST',
        body: JSON.stringify({
          hit,
          defence,
        }),
      }
    ).then(res => res.json());
    return body;
  }

  getEnemyAttack().then(data => {
    console.log('###get enemy data player1', data.player1);
    console.log('###get enemy data player2', data.player2);
    player = data.player1;
    enemy = data.player2;
  });

  async function getAction() {
    await getEnemyAttack();
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
  getEnemyAttack().then(data => getAction());
}

export { roundFight };
