const $arenas = document.querySelector(".arenas");
// const $randomBtn = document.querySelector(".button");
const $formFight = document.querySelector(".control");
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

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

function disableBtn(btn) {
  btn.disabled = true;
  btn.style.background = "#333";
}

function showWinner(name) {
  const $winnerTitle = createElement("div", "winnerTitle");
  $winnerTitle.innerText = name != "DRAW" ? name + " Wins!" : "DRAW";
  $arenas.appendChild($winnerTitle);
  disableBtn($randomBtn);
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

// $randomBtn.addEventListener("click", function () {
//   subzero.changeHP(getRandom(20));
//   subzero.renderHP();

//   scorpion.changeHP(getRandom(20));
//   scorpion.renderHP();

//   whoWinner(scorpion, subzero);
// });

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();

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

  console.log("##### a", attack);
  console.log("##### e", enemy);
});

$arenas.append(createPlayer(subzero), createPlayer(scorpion));
