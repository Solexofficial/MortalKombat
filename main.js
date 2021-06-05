const $arenas = document.querySelector(".arenas");
const $randomBtn = document.querySelector(".button");

const subzero = {
  player: 1,
  name: "Subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Kunai", "Sword", "Axe"],
  attack() {
    console.log(this.name + " Fight...");
  },
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

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeHP(character) {
  const $playerLife = document.querySelector(
    ".player" + character.player + " .life"
  );
  character.hp -= randomNum(1, 20);
  character.hp < 0 && character.hp === 0
    ? ($playerLife.style.width = 0)
    : ($playerLife.style.width = character.hp + "%");

  if (character.hp <= 0) {
    $arenas.appendChild(playerWinner(getWinner(scorpion, subzero)));
  }
  console.log(character.name, character.hp);
}

function playerWinner(name) {
  const $winnerTitle = createElement("div", "winnerTitle");
  $winnerTitle.innerText = name + " Wins!";
  $randomBtn.disabled = true;
  $randomBtn.style.background = "#333";
  return $winnerTitle;
}

function getWinner(player1, player2) {
  return player1.hp <= 0 ? player2.name : player1.name;
}

$randomBtn.addEventListener("click", function () {
  changeHP(scorpion);
  changeHP(subzero);
  getWinner(scorpion, subzero);
});

$arenas.append(createPlayer(subzero), createPlayer(scorpion));
