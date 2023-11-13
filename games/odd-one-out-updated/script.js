let gameData = {};

document.addEventListener('DOMContentLoaded', () => {
    fetch('gameData.json')
        .then(response => response.json())
        .then(data => {
            gameData = data;
            // Initialize the game here or call a function to start the game
        })
        .catch(error => console.error('Error loading game data:', error));
});


let currentLevel = 1;
let currentQuestionIndex = 0;
let score = 0;
let mistakes = 0;
let hintUsed = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createWordButtons(words) {
    const wordOptionsContainer = document.getElementById('word-options');
    wordOptionsContainer.innerHTML = '';
    hintUsed = false;
    shuffleArray(words);

    words.forEach(word => {
        const button = document.createElement('button');
        button.innerText = word;
        button.addEventListener('click', () => handleWordSelection(word));
        wordOptionsContainer.appendChild(button);
    });
}

function updateDisplay(message) {
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('mistakes').innerText = 'Mistakes: ' + mistakes;
    document.getElementById('message').innerText = message;
    document.getElementById('hint').innerText = '';
}

function handleWordSelection(selectedWord) {
    const currentQuestion = gameData[currentLevel][currentQuestionIndex];
    if (selectedWord === currentQuestion.correct) {
        score++;
        updateDisplay('Correct!');
        currentQuestionIndex++;
        if (currentQuestionIndex < gameData[currentLevel].length) {
            createWordButtons(gameData[currentLevel][currentQuestionIndex].words);
        } else {
            updateDisplay('Game Over! Final Score: ' + score);
            currentQuestionIndex = 0;
            score = 0;
            mistakes = 0;
            document.getElementById('hint-button').style.display = 'none';
        }
    } else {
        mistakes++;
        updateDisplay('Try again! Select the correct answer.');
    }
}

function startLevel(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;
    mistakes = 0;
    createWordButtons(gameData[currentLevel][currentQuestionIndex].words);
    updateDisplay('');
    document.getElementById('hint-button').style.display = 'block';
}

function displayHint() {
    const currentQuestion = gameData[currentLevel][currentQuestionIndex];
    if (currentQuestion && currentQuestion.hint) {
        // Optionally add visual effects here
        document.getElementById('hint').innerText = currentQuestion.hint;
    } else {
        console.error('No hint available for the current question.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const levelSelect = document.getElementById('level-select');
    Object.keys(gameData).forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.text = 'Level ' + level;
        levelSelect.appendChild(option);
    });

    levelSelect.addEventListener('change', () => startLevel(levelSelect.value));
    document.getElementById('start-button').addEventListener('click', () => startLevel(currentLevel));
    document.getElementById('hint-button').addEventListener('click', displayHint);
});

// Debugging: Log a message to console to check if startLevel function is called
console.log('JavaScript loaded. Waiting for Start Game button click.');

    