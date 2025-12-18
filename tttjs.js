const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]           
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = `<span class="${currentPlayer === 'X' ? 'x-player' : 'o-player'}">${currentPlayer}</span>`;
    
    handleResultValidation();
}

function handleResultValidation() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') continue;
        
        if (a === b && b === c) {
            roundWon = true;
            winningCombo = winCondition;
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        statusDisplay.innerHTML = `<span class="text-success">Player ${currentPlayer} Wins!</span>`;
        winningCombo.forEach(index => {
            document.querySelector(`[data-cell-index="${index}"]`).classList.add('winning-cell');
        });
        return;
    }

    if (!gameState.includes('')) {
        isGameActive = false;
        statusDisplay.innerHTML = `<span class="text-info">Game Draw!</span>`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Player ${currentPlayer}'s Turn`;
}

function handleRestartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = `Player ${currentPlayer}'s Turn`;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('winning-cell');
    });
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

resetButton.addEventListener('click', handleRestartGame);
createBoard();
