import { getRandom } from './utils.js';
import { $formFight } from './gameScene.js';
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

const enemy = async function getFight() {
  const q = fetch(
    'http://reactmarathon-api.herokuapp.com/api/mk/player/fight',
    {
      method: 'POST',
      body: JSON.stringify({
        hit: null,
        defence: null,
      }),
    }
  );
  q.then(response => {
    return response.json();
  }).then(data => {
    const player1 = data.player1;
    const player2 = data.player2;
    console.log('###data1', player1);
    console.log('###data2', player2);
    return player2;
  });
};

function enemyAttack() {
  return console.log('enemy');
}

export { playerAttack, enemyAttack };
