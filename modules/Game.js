import { subzero, scorpion } from './characters.js';
import generateLogs from './logs.js';
import { roundFight } from './roundFight.js';
import { checkWinner } from './roundEnd.js';
import { $formFight } from './gameScene.js';

class Game {
  constructor() {
    this.player1 = subzero;
    this.player2 = scorpion;
  }

  start = () => {
    this.player1.createPlayer();
    this.player2.createPlayer();
    generateLogs('start', this.player1, this.player2);

    $formFight.addEventListener('submit', event => {
      event.preventDefault();

      roundFight(this.player1, this.player2);
      checkWinner(this.player1, this.player2);
    });
  };
}

export default Game;
