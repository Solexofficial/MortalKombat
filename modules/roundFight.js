import generateLogs from './logs.js';
// import { getFight } from './playerActions.js';
import { $formFight } from './gameScene.js';
import { getRandom } from './utils.js';

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

async function playerAttack() {
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

// async function getPlayerAttack() {
//   await playerAttack();
//   console.log('start');
//   const q = new Promise(resolve => {
//     const playerATK = playerAttack();
//     resolve(playerATK);
//   });
//   console.log('wait');
//   await q;
//   console.log('finish');
//   return q;
// }
// getPlayerAttack().then(res => console.log('getPlayerThen', res));

function roundFight(player1, player2) {
  async function getPlayerAttack() {
    await playerAttack();
    console.log('start');
    const q = new Promise(resolve => {
      const playerATK = playerAttack();
      resolve(playerATK);
    });
    console.log('wait');
    await q;
    console.log('finish');
    return q;
  }
  getPlayerAttack().then(res => console.log('getPlayerThen', res));

  let result = {};
  player1
    .attack()
    .then(data => {
      const { hit, defence } = data;
      const playersActions = fetch(
        'http://reactmarathon-api.herokuapp.com/api/mk/player/fight',
        {
          method: 'POST',
          body: JSON.stringify({
            hit,
            defence,
          }),
        }
      );
      return playersActions;
    })
    .then(res => res.json())
    .then(data => {
      console.log('data', data);
      const { player1: player, player2: enemy } = data;
      console.log(player, enemy);
    })
    .catch(err => console.log(err));

  async function getAction() {
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
}

export { roundFight };
