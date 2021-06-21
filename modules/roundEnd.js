import { $arenas, $formFight } from './gameScene.js';
import { createElement } from './utils.js';
import generateLogs from './logs.js';

const checkWinner = (player1, player2) => {
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
};

const showWinner = name => {
  const $winnerTitle = createElement('div', 'winnerTitle');
  $winnerTitle.innerText = name != 'DRAW' ? `${name} Wins!` : 'DRAW';
  $arenas.appendChild($winnerTitle);
  $formFight.style.display = 'none';
  showReloadButton();
};

const showReloadButton = () => {
  const $reloadBtn = createReloadButton();
  $reloadBtn.addEventListener('click', () => {
    window.location.pathname = 'index.html';
  });
  return $arenas.append($reloadBtn);
};

const createReloadButton = () => {
  const $buttonWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');
  $button.innerText = 'Restart';
  $buttonWrap.appendChild($button);
  return $buttonWrap;
};

export { checkWinner, showWinner, showReloadButton, createReloadButton };
