document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("resetButton");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const shovonWinsElement = document.getElementById("shovonWins");
    const afifaWinsElement = document.getElementById("nupurWins");
    
    let currentPlayer = "X";
    let boardState = Array(9).fill(null);
    let shovonWins = 0;
    let afifaWins = 0;

    const checkWin = (boardState) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        return boardState.includes(null) ? null : "Draw";
    };

    const showPopup = (message) => {
        popupMessage.textContent = message;
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 1000);
    };

    const updateWins = () => {
        shovonWinsElement.textContent = shovonWins;
        afifaWinsElement.textContent = afifaWins;
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (!boardState[index] && !checkWin(boardState)) {
            boardState[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";

            const winner = checkWin(boardState);
            if (winner) {
                if (winner === "Draw") {
                    showPopup("Match Draw!");
                } else {
                    if (winner === "X") {
                        shovonWins++;
                        showPopup("Shovon Wins!");
                    } else {
                        afifaWins++;
                        showPopup("pipra Wins!");
                    }
                    updateWins();
                }
                setTimeout(resetGame, 1000); // Automatically reset the game after 5 seconds
            }
        }
    };

    const resetGame = () => {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
    };

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    resetButton.addEventListener("click", resetGame);
});
