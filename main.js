const $arenas = document.querySelector(".arenas");
const $submitBtn = document.querySelector("button[type=submit]");
const $formFight = document.querySelector(".control");
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

const subzero = {
  player: 1,
  name: "Subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Kunai", "Sword", "Axe"],
  attack() {
    console.log(this.name + " Fight...");
  },
  changeHP,
  elHP,
  renderHP,
};

const scorpion = {
  player: 2,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Knife", "Blade", "DualSword"],
  attack() {
    console.log(this.name + " Fight...");
  },
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
  const player = createElement("div", "player" + character.player);

  const $progressbar = createElement("div", "progressbar");

  const $character = createElement("div", "character");

  const $life = createElement("div", "life");
  $life.style.width = character.hp + "%";

  const $name = createElement("div", "name");
  $name.innerText = character.name;

  const $img = createElement("img");
  $img.src = character.img;

  player.append($progressbar, $character);
  $progressbar.append($life, $name);
  $character.append($img);

  return player;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

function changeHP(damageHit) {
  this.hp -= damageHit;
  if (this.hp < 0) {
    this.hp = 0;
  }
  return this.hp;
}

function elHP() {
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP() {
  let $el = this.elHP();
  return ($el.style.width = this.hp + "%");
}

function showWinner(name) {
  const $winnerTitle = createElement("div", "winnerTitle");
  $winnerTitle.innerText = name != "DRAW" ? name + " Wins!" : "DRAW";
  $arenas.appendChild($winnerTitle);
  $formFight.style.display = "none";
  showReloadButton();
}

function whoWinner(player1, player2) {
  if (player1.hp <= 0 && player2.hp <= 0) {
    showWinner("DRAW");
  } else if (player1.hp <= 0) {
    showWinner(player2.name);
  } else if (player2.hp <= 0) {
    showWinner(player1.name);
  }
}

function createReloadButton() {
  const $buttonWrap = createElement("div", "reloadWrap");
  const $button = createElement("button", "button");
  $button.innerText = "Restart";
  $buttonWrap.appendChild($button);
  return $buttonWrap;
}

function showReloadButton() {
  const $reloadBtn = createReloadButton();
  $reloadBtn.addEventListener("click", () => {
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
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  return attack;
}

function botAttack(hit, defence, target) {
  if (enemy.hit !== target.defence) {
  }
}

function fight(player1, player2) {
  const player = playerAttack();
  const enemy = enemyAttack();

  if (player.hit !== enemy.defence) {
    player2.changeHP(player.value);
    player2.renderHP();
  }

  if (enemy.hit !== player.defence) {
    player1.changeHP(enemy.value);
    player1.renderHP();
  }
}

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  fight(subzero, scorpion);
  whoWinner(subzero, scorpion);
});

$arenas.append(createPlayer(subzero), createPlayer(scorpion));
