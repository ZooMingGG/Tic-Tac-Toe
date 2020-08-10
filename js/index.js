'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const field = document.querySelector('.field');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const lines = Array.from(document.querySelectorAll('.line'));
    const restartModalWindow = document.querySelector('.restart-modal-window');
    const modeSelectionModalWindow = document.querySelector('.mode-selection-modal-window');
    const restartBtn = document.querySelector('.restart');
    const onePlayerBtn = document.querySelector('.one-player');
    const twoPlayersBtn = document.querySelector('.two-players');
    const drawDiv = document.querySelector('.draw');
    const scoreDiv = document.querySelector('.score');
    const firstPlayerScoreDiv = document.querySelector('.first-player-score');
    const secondPlayerScoreDiv = document.querySelector('.second-player-score');
    const firstPlayerWinDiv = document.querySelector('.first-player-win');
    const secondPlayerWinDiv = document.querySelector('.second-player-win');
    const firstPlayername = document.querySelector('.first-player-name');
    const secondPlayerName = document.querySelector('.second-player-name');
    const ticTacToeTitle = document.querySelector('.tic-tac-toe');

    const winnigCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let gameMode = 0;
    let winner = 0;
    let firstPlayerScore = 0;
    let secondPlayerScore = 0;   

    const onePlayerMode = () => {
        gameMode = 1;

        modeSelectionModalWindow.classList.add('mode-selection-modal-window-hidden');

        firstPlayername.textContent = 'You';
        secondPlayerName.textContent = 'Bot';

        firstPlayerWinDiv.textContent = 'You win!';
        secondPlayerWinDiv.textContent = 'Bot win!';
    };

    const twoPlayersMode = () => {
        gameMode = 2;

        modeSelectionModalWindow.classList.add('mode-selection-modal-window-hidden');
    };

    onePlayerBtn.addEventListener('click', onePlayerMode);
    twoPlayersBtn.addEventListener('click', twoPlayersMode);
});