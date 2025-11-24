// Aguarda todo o conteúdo da página ser carregado antes de executar o script
window.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona todas as células do tabuleiro (nós HTML com classe "cell")
    const cells = Array.from(document.querySelectorAll('.cell'));

    // Seleciona o elemento que exibe mensagens (vitória/empate)
    const announcer = document.querySelector('.announcer');

    // Seleciona o botão de reset
    const resetButton = document.querySelector('button');

    // Cria o estado inicial do tabuleiro (9 espaços vazios)
    let board = ['', '', '', '', '', '', '', '', ''];

    // Define o jogador inicial como X
    let currentPlayer = 'X';

    // Variável que controla se o jogo ainda está ativo
    let isGameActive = true;

    // Constantes para identificar resultados
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    // Possíveis combinações vencedoras
    const winningConditions = [
        [0, 1, 2], // linha 1
        [3, 4, 5], // linha 2
        [6, 7, 8], // linha 3
        [0, 3, 6], // coluna 1
        [1, 4, 7], // coluna 2
        [2, 5, 8], // coluna 3
        [0, 4, 8], // diagonal principal
        [2, 4, 6]  // diagonal secundária
    ];

    // Verifica se alguém venceu ou se houve empate
    function handleResultValidation() {
        let roundWon = false;

        // Percorre todas as condições de vitória
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];

            // Verifica se as três posições têm o mesmo símbolo
            if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;
                break;
            }
        }

        // Se alguém venceu, anuncia o resultado e finaliza o jogo
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        // Se o tabuleiro estiver cheio e ninguém venceu → empate
        if (!board.includes('')) {
            announce(TIE);
        }
    }

    // Mostra mensagem de vitória ou empate na tela
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

        // Mostra a mensagem (remove classe hide e adiciona show)
        announcer.classList.remove('hide');
        announcer.classList.add('show');
    };

    // Verifica se a célula clicada ainda está vazia
    const isValidAction = (cell) => {
        return cell.innerText !== 'X' && cell.innerText !== 'O';
    }

    // Atualiza o array board com a jogada atual
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    // Alterna o jogador entre X e O
    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    // Executa a jogada do usuário
    const userAction = (cell, index) => {
        // Se a célula for válida e o jogo não acabou
        if (isValidAction(cell) && isGameActive) {

            // Exibe X ou O no HTML da célula
            cell.innerText = currentPlayer;
            
            // Adiciona classe para cor/estilo do jogador
            cell.classList.add(`player${currentPlayer}`);

            // Atualiza o array board
            updateBoard(index);

            // Verifica se houve vitória ou empate
            handleResultValidation();

            // Troca de jogador
            changePlayer();
        }
    }

    // Reinicia o jogo
    const resetBoard = () => {
        // Reseta o estado interno do tabuleiro
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;

        // Esconde a mensagem de resultado
        announcer.classList.add('hide');
        announcer.classList.remove('show');

        // Jogador volta a ser X
        currentPlayer = 'X';

        // Limpa o conteúdo visual das células
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('playerX', 'playerO');
        });
    };

    // Adiciona evento de clique para todas as células
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });

    // Botão de reset reinicia o jogo
    resetButton.addEventListener('click', resetBoard);
});
