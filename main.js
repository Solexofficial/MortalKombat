const subzero = {
  name: "Subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Kunai", "Sword", "Axe"],
  attack() {
    console.log(this.name + " Fight...");
  },
};

const scorpion = {
  name: "Scorpion",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Knife", "Blade", "DualSword"],
  attack() {
    console.log(this.name + " Fight...");
  },
};

const $arenas = document.querySelector(".arenas");

function createPlayer($player, character) {
  const player = document.createElement("div");
  player.classList.add($player);

  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");

  const $character = document.createElement("div");
  $character.classList.add("character");

  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = character.hp + "%";

  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = character.name;

  const $img = document.createElement("img");
  $img.src = character.img;

  $arenas.append(player);
  player.append($progressbar, $character);
  $progressbar.append($life, $name);
  $character.append($img);
}

createPlayer("player1", subzero);
createPlayer("player2", scorpion);
