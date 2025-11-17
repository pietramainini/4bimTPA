window.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const announcer = document.querySelector('.announcer');
    const resetButton = document.querySelector('button');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];

            if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            announce(TIE);
        }
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Jogador <span class="playerO">O</span> venceu!';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Jogador <span class="playerX">X</span> venceu!';
                break;
            case TIE:
                announcer.innerText = 'Velha! 👵';
                break;
        }

        announcer.classList.remove('hide');
        announcer.classList.add('show');
    };

    const isValidAction = (cell) => {
        return cell.innerText !== 'X' && cell.innerText !== 'O';
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const userAction = (cell, index) => {
        if (isValidAction(cell) && isGameActive) {
            cell.innerText = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;

        announcer.classList.add('hide');
        announcer.classList.remove('show');

        currentPlayer = 'X';

        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerX', 'playerO');
        });
    };


    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
