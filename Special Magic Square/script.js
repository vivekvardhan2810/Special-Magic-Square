document.getElementById('mode-toggle').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
});

// Existing Game Code
let timerInterval;
let startTime;
let gridSize = 3;
let score = 100;
let hintsUsed = 0;

function startGame() {
    gridSize = parseInt(document.getElementById('size').value);
    buildGrid(gridSize);
    score = 100;
    hintsUsed = 0;
    document.getElementById('message').textContent = '';
    document.getElementById('score').textContent = 'Score: 100';
    startTimer();
}

function buildGrid(size) {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = size * size;
            input.id = `cell-${i}-${j}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        document.getElementById('timer').textContent = `Time: ${elapsed} seconds`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function calculateMagicConstant(size) {
    return (size * (size * size + 1)) / 2;
}

function checkMagicSquare() {
    const magicConstant = calculateMagicConstant(gridSize);
    let rows = Array(gridSize).fill(0);
    let cols = Array(gridSize).fill(0);
    let diag1 = 0, diag2 = 0;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cellValue = parseInt(document.getElementById(`cell-${i}-${j}`).value);
            if (isNaN(cellValue)) {
                document.getElementById('message').textContent = 'Fill all cells!';
                return;
            }
            rows[i] += cellValue;
            cols[j] += cellValue;
            if (i === j) diag1 += cellValue;
            if (i + j === gridSize - 1) diag2 += cellValue;
        }
    }

    if (rows.every(row => row === magicConstant) &&
        cols.every(col => col === magicConstant) &&
        diag1 === magicConstant && diag2 === magicConstant) {
        stopTimer();
        document.getElementById('message').textContent = 'Congratulations! It\'s a Magic Square!';
    } else {
        document.getElementById('message').textContent = 'Not a Magic Square. Try again!';
    }
}

function provideHint() {
    // Hints logic
    hintsUsed++;
    score -= 10;
    document.getElementById('score').textContent = `Score: ${score}`;
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('checkButton').addEventListener('click', checkMagicSquare);
document.getElementById('hintButton').addEventListener('click', provideHint);