const $arenas = document.querySelector('.arenas');
const $submitBtn = document.querySelector('button[type=submit]');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const logs = {
  start:
    'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
};

const subzero = {
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

const scorpion = {
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

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(character) {
  const {
    player: playerNumber,
    name: playerName,
    hp: playerHP,
    img: playerIMG,
  } = character;

  const $player = createElement('div', 'player' + playerNumber);
  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = `${playerHP}%`;
  $name.innerText = playerName;
  $img.src = playerIMG;

  $player.append($progressbar, $character);
  $progressbar.append($life, $name);
  $character.append($img);

  return $player;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

function changeHP(damageHit) {
  this.hp -= damageHit;
  if (this.hp < 0) {
    this.hp = 0;
  }
  return this.hp;
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  return (this.elHP().style.width = `${this.hp}%`);
}

function showWinner(name) {
  const $winnerTitle = createElement('div', 'winnerTitle');
  $winnerTitle.innerText = name != 'DRAW' ? `${name} Wins!` : 'DRAW';
  $arenas.appendChild($winnerTitle);
  $formFight.style.display = 'none';
  showReloadButton();
}

function whoWinner(player1, player2) {
  if (player1.hp <= 0 && player2.hp <= 0) {
    generateLogs('draw');
    showWinner('DRAW');
  } else if (player1.hp <= 0) {
    generateLogs('end', player2, player1);
    showWinner(player2.name);
  } else if (player2.hp <= 0) {
    generateLogs('end', player1, player2);
    showWinner(player1.name);
  }
}

function createReloadButton() {
  const $buttonWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  $button.innerText = 'Restart';
  $buttonWrap.appendChild($button);
  return $buttonWrap;
}

function showReloadButton() {
  const $reloadBtn = createReloadButton();
  $reloadBtn.addEventListener('click', () => {
    window.location.reload();
  });
  return $arenas.append($reloadBtn);
}

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
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

function fight(player1, player2) {
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

function generateLogs(type, player1, player2, hitDamage) {
  const date = new Date();
  const time = formatDate(date);
  switch (type) {
    case 'start':
      const logsStartGame = logs.start
        .replace('[time]', `${time}`)
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name);
      return $chat.insertAdjacentHTML('afterBegin', `<p>${logsStartGame}</p>`);

    case 'hit':
      const textHit = logs['hit'][getRandom(logs['hit'].length - 1)]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);
      const el = `<p>${time} ${textHit} -${hitDamage} [${player2.hp}/100]</p>`;
      return $chat.insertAdjacentHTML('afterbegin', el);

    case 'defence':
      const textDefence = logs['defence'][getRandom(logs['defence'].length - 1)]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);
      return $chat.insertAdjacentHTML(
        'afterbegin',
        `<p>${time} ${textDefence}</p>`
      );

    case 'end':
      const logEnd = logs['end'][getRandom(logs['end'].length - 1)]
        .replace('[playerWins]', player1.name)
        .replace('[playerLose]', player2.name);
      return $chat.insertAdjacentHTML('afterbegin', logEnd);

    case 'draw':
      return $chat.insertAdjacentHTML('afterbegin', logs['draw']);
    default:
      return $chat.insertAdjacentHTML('afterbegin', 'Oops, something wrong =(');
  }
}

function gameStart(player1, player2) {
  $arenas.append(createPlayer(player1), createPlayer(player2));
  generateLogs('start', player1, player2);

  $formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    fight(player1, player2);
    whoWinner(player1, player2);
  });
}

gameStart(subzero, scorpion);
