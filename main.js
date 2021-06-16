import { player1, player2 } from './modules/characters.js';
import generateLogs from './modules/logs.js';
import { createPlayer } from './modules/createPlayer.js';
import { roundFight } from './modules/roundFight.js';
import { checkWinner } from './modules/roundEnd.js';
import { $arenas, $formFight } from './modules/gameScene.js';

function gameStart(player1, player2) {
  $arenas.append(createPlayer(player1), createPlayer(player2));
  generateLogs('start', player1, player2);

  $formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    roundFight(player1, player2);
    checkWinner(player1, player2);
  });
}

gameStart(player1, player2);
