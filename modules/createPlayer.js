import { createElement } from './utils.js';

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

export { createPlayer };
