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

    const winningCombinations = [
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
    let currentClass;
    let winner = 0;
    let firstPlayerScore = 0;
    let secondPlayerScore = 0;   
    let turnNumber = 0;
    let nowBotTurn = false;
    let victory = false;

    const game = () => {
        turnNumber = 1;
        victory = false;

        const stopGame = () => {
            restartModalWindow.classList.add('restart-modal-window-visible');

           
        };

        const showResults = (winner) => {
            victory = true;

            if (winner === 1) {
                firstPlayerScore++;
                firstPlayerScoreDiv.textContent = firstPlayerScore;
                firstPlayerWinDiv.classList.add('result-visible');
            } else if (winner === 2) {
                secondPlayerScore++;
                secondPlayerScoreDiv.textContent = secondPlayerScore;
                secondPlayerWinDiv.classList.add('result-visible');
            } else if (winner === -1) {
                drawDiv.classList.add('result-visible');
            }
    
            if (winner === 1 || winner === 2) {
                setTimeout(stopGame, 500);
            } else if (winner === -1) {
                setTimeout(stopGame, 300);
            }
        };

        const checkEndGame = () => {
            let isWin = winningCombinations.some((item) => {
                return item.every((index) => {
                    return cells[index].classList.contains(currentClass);
                });
            });

            let isDraw = cells.every((item) => {
                if (!isWin && item.classList.contains('cross') 
                || item.classList.contains('zero')) {
                    return true;
                }
            });

            if (isWin) {
                if (currentClass === 'cross') {
                    winner = 1;
                } else if (currentClass === 'zero') {
                    winner = 2;
                }

                showResults(winner);
            } else if (isDraw) {
                winner = -1;

                showResults(winner);
            }
    
            lines.forEach(function(item) {
                item.classList.remove('line-hidden');
            });
        };

        const botTurn = () => {
            const getRandomCell = (min, max) => {
                min = Math.ceil(min);
                max = Math.floor(max);
                
                return Math.floor(Math.random() * (max - min + 1)) + min; 
            };

            let randomCell;

            while (true) {
                randomCell = getRandomCell(0, 8);

                if (cells[randomCell].classList.contains('cross')
                || cells[randomCell].classList.contains('zero')) continue;

                cells[randomCell].classList.add('zero');
                break;
            }

            turnNumber++;
            nowBotTurn = false;
        };

        const turn = (event) => {
            if (event.target.classList.contains('zero') 
            || event.target.classList.contains('cross')
            || !event.target.classList.contains('cell')
            || victory === true || nowBotTurn === true) return;

            if (turnNumber % 2 !== 0) {
                currentClass = 'cross';
                event.target.classList.add(currentClass); 
            } else {
                currentClass = 'zero';
                event.target.classList.add(currentClass);
            }

            checkEndGame(currentClass);

            if (gameMode === 1) {
                let number = 0;

                for (let i = 0; i <= 8; i++) {
                    if (cells[i].classList.contains('cross') 
                    || cells[i].classList.contains('zero')) {
                        number++;
                    }
                }
    
                if (victory !== true && number !== 9) {
                    nowBotTurn = true;
    
                    setTimeout(() => {  
                        botTurn();
                        checkEndGame(currentClass);
                    }, 500);
                }
            }

            turnNumber++;
        };

        field.addEventListener('click', turn);
    };

    const onePlayerMode = () => {
        gameMode = 1;

        modeSelectionModalWindow.classList.add('mode-selection-modal-window-hidden');

        firstPlayername.textContent = 'You';
        secondPlayerName.textContent = 'Bot';

        firstPlayerWinDiv.textContent = 'You win!';
        secondPlayerWinDiv.textContent = 'Bot win!';

        game();
    };

    const twoPlayersMode = () => {
        gameMode = 2;

        modeSelectionModalWindow.classList.add('mode-selection-modal-window-hidden');

        game();
    };

    onePlayerBtn.addEventListener('click', onePlayerMode);
    twoPlayersBtn.addEventListener('click', twoPlayersMode);
});