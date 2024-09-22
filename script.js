document.addEventListener("DOMContentLoaded", function() {
    const table = document.querySelector('table');
    const darkMode = document.getElementById('dark-mode');
    const reset = document.getElementById('restart');
    const turn = document.getElementById('player-turn');
    const moon = document.getElementById('moon');
    // Specify the size of the table (3x3)
    const numRows = 3;
    const numCols = 3;
    let clicked = [];
    let firstTurn = true;
    let isFirstTwoMoves = 4;
    let win = false;
    let isBlack = false;
    // Create rows and cells
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('td');
            cell.id = i * numCols + j + 1;
            row.appendChild(cell);
            clicked.push(null);
        }
        table.appendChild(row);
    }
    console.log(clicked);
    table.addEventListener('click', function(event) {
        if (event.target.tagName === 'TD') {
            const cellId = event.target.id;
            if (clicked[cellId - 1] === null) {
                const sq = document.getElementById(cellId);
                if (firstTurn) {
                    sq.classList.add("cross");
                    clicked[cellId - 1] = 'x';
                    firstTurn = false;
                    turn.textContent = "Player O's turn";
                } else {
                    sq.classList.add("circle");
                    clicked[cellId - 1] = 'o';
                    firstTurn = true;
                    turn.textContent = "Player X's turn";
                }
                sq.classList.add("clicked");
                if(isFirstTwoMoves !== 0){
                    isFirstTwoMoves--;
                } 
                else {
                    win = check_win();
                    if(win){
                        table.classList.add("clicked");
                    }
                }
            } else {
                alert('Cell already clicked');
            }
            console.log(clicked);
            if(isBlack){
                for(let i = 0; i < 9; i++){
                    const cell = document.getElementById(i + 1);
                    cell.style.borderColor = "white";
                    if(cell.classList.contains("cross")){
                        cell.style.backgroundColor = "transparent";
                        cell.style.color = "white";
                        cell.style.setProperty('--cross-color', 'white');
                    }
                    else if(cell.classList.contains("circle")){
                        cell.style.backgroundColor = "transparent";
                        cell.style.color = "#f0f0f0";
                        cell.style.setProperty('--circle-color', '#000000');
                        cell.style.setProperty('--circle-color-invert', '#f0f0f0');
                    }
                }
            }
        }
    });
    function check_win(){
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
    
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (clicked[a] && clicked[a] === clicked[b] && clicked[a] === clicked[c]) {
                turn.textContent = "Player " + clicked[a].toUpperCase() + " wins";
                for (const index of winConditions[i]) {
                    const cell = document.getElementById(index + 1);
                    cell.classList.add("win");
                }
                return true;
            }
        }
        return false;
    }
    darkMode.addEventListener('click', function() {
        toggle_darkmode();
    });
    function toggle_darkmode(){
        const currentBgColor = getComputedStyle(document.body).backgroundColor;
        isBlack = !isBlack;
        if (currentBgColor === "rgb(240, 240, 240)") { // "#f0f0f0" is represented as "rgb(240, 240, 240)"
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
            moon.style.boxShadow = "-20px 20px 0 0 #f0f0f0";
            darkMode.style.border = "2px solid white";
            darkMode.style.backgroundColor = "black";
            for(let i = 0; i < 9; i++){
                const cell = document.getElementById(i + 1);
                cell.style.borderColor = "white";
                if(cell.classList.contains("cross")){
                    cell.style.backgroundColor = "transparent";
                    cell.style.color = "white";
                    cell.style.setProperty('--cross-color', 'white');
                }
                else if(cell.classList.contains("circle")){
                    cell.style.backgroundColor = "transparent";
                    cell.style.color = "#f0f0f0";
                    cell.style.setProperty('--circle-color', '#000000');
                    cell.style.setProperty('--circle-color-invert', '#f0f0f0');
                }
            }
        } else {
            document.body.style.backgroundColor = "#f0f0f0";
            document.body.style.color = "black";
            moon.style.boxShadow = "-20px 20px 0 0 #000000";
            darkMode.style.border = "2px solid black";
            darkMode.style.backgroundColor = "#e0e0e0";
            for(let i = 0; i < 9; i++){
                const cell = document.getElementById(i + 1);
                cell.style.borderColor = "black";
                if(cell.classList.contains("cross")){
                    cell.style.backgroundColor = "transparent";
                    cell.style.color = "black";
                    cell.style.setProperty('--cross-color', 'black');
                }
                else if(cell.classList.contains("circle")){
                    cell.style.backgroundColor = "transparent";
                    cell.style.color = "#000000";
                    cell.style.setProperty('--circle-color', '#f0f0f0');
                    cell.style.setProperty('--circle-color-invert', '#000000');
                }
            }
        }
    }
    reset.addEventListener('click', function() {
        for(let i = 0; i < clicked.length; i++){
            clicked[i] = null;
        }
        firstTurn = true;
        isFirstTwoMoves = 4;
        win = false;
        table.classList.remove("clicked");
        const cells = document.querySelectorAll('td');
        cells.forEach(cell => {
            cell.classList.remove("clicked");
            cell.classList.remove("cross");
            cell.classList.remove("circle");
            cell.classList.remove("win");
        });
    });
});