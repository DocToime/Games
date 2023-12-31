
let gameData = {
    "Beginner": {
        "1": [
            {"words": ["dog"], "correct": "dog", "hint": "The ___ chases the cat."},
            {"words": ["tug"], "correct": "tug", "hint": "We ___ the rope in the game."},
            {"words": ["fog"], "correct": "fog", "hint": "The ___ makes it hard to see."},
            {"words": ["bag"], "correct": "bag", "hint": "I carry my books in a ___."},
            {"words": ["fun"], "correct": "fun", "hint": "Playing games is a lot of ___."},
            {"words": ["mat"], "correct": "mat", "hint": "Please wipe your feet on the ___."},
            {"words": ["man"], "correct": "man", "hint": "The ___ is walking his dog."},
            {"words": ["nun"], "correct": "nun", "hint": "The ___ works at the church."},
            {"words": ["hot"], "correct": "hot", "hint": "The soup is too ___ to eat."},
            {"words": ["bog"], "correct": "bog", "hint": "The ___ is a wet, muddy area."}
        ]
    }
    // ... other levels and difficulties if needed ...
};


let currentDifficulty = "Beginner"; // Default difficulty
let currentLevel = "1"; // Default level
let currentQuestionIndex = 0;
let score = 0;
let mistakes = 0;
let hintUsed = false;
const gameContainer = document.getElementById('game-container');


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
    const playAudioButton = document.getElementById('play-audio');
    playAudioButton.style.display = 'none';

    // Creating only one button and hiding it
    const word = words[0]; // Assuming the first word is the one to guess
    const button = document.createElement('button');
    button.innerText = word;
    button.style.display = 'none'; // Hide the button initially
    button.addEventListener('click', () => handleWordSelection(word));
    wordOptionsContainer.appendChild(button);
    playWordAudio();
    displayHint();

    setTimeout(() => {
        playAudioButton.style.display = 'block';
    }, 0); // 20000 milliseconds = 20 seconds
}


function updateDisplay(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message || '&nbsp;'; // Replace an empty message with a non-breaking space
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('mistakes').innerText = 'Mistakes: ' + mistakes;
    document.getElementById('hint').innerText = '';
}

function clearMessage() {
    const messageElement = document.getElementById('message');
    if (messageElement.innerHTML === 'Correct!') {
        messageElement.innerHTML = '&nbsp;'; // Replace the "Correct!" message with a non-breaking space
    }
}

function handleWordSelection(selectedWord) {
    const currentQuestion = gameData[currentDifficulty][currentLevel][currentQuestionIndex];

    if (selectedWord === currentQuestion.correct) {
        gameContainer.classList.add('flash-green');
        setTimeout(() => gameContainer.classList.remove('flash-green'), 500);
        score++;
        updateDisplay('Correct!');
        // Schedule clearMessage to run after 5 seconds
        setTimeout(clearMessage, 5000);
        currentQuestionIndex++;
                
        if (currentQuestionIndex >= gameData[currentDifficulty][currentLevel].length) {
            updateDisplay('Round ' + currentLevel + ' complete! Moving to next level...');
            finishLevel();
        } else {
            setTimeout(() => {
                createWordButtons(gameData[currentDifficulty][currentLevel][currentQuestionIndex].words);
            }, 500);
        }
    } else {
        gameContainer.classList.add('flash-red');
        setTimeout(() => gameContainer.classList.remove('flash-red'), 500);
        mistakes++;
        updateDisplay('This is a tough one! Try again, or use the Hint button.');
        // Google Analytics Event for a Mistake
        gtag('event', 'make_mistake', {
            'event_category': 'Game Actions',
            'event_label': `Mistake Made - Difficulty: ${currentDifficulty}, Level: ${currentLevel}, Question: ${currentQuestionIndex}`
        });
    }
}



function startLevel(difficulty, level) {
    currentDifficulty = difficulty;
    currentLevel = String(level); // Ensure level is a string
    currentQuestionIndex = 0;
    score = 0;
    mistakes = 0;

    // Update the difficulty and level dropdowns to reflect the new difficulty and level
    const difficultySelect = document.getElementById('difficulty-selector');
    const levelSelect = document.getElementById('level-select');
    difficultySelect.value = currentDifficulty;
    levelSelect.value = currentLevel;

    // Additional logic to handle invalid difficulty or level
    if (!gameData[currentDifficulty] || !gameData[currentDifficulty][currentLevel]) {
        console.error('Invalid difficulty or level');
        return;
    }

    createWordButtons(gameData[currentDifficulty][currentLevel][currentQuestionIndex].words);
    setupGameContainer(); // Set up the game container for the spelling display
    createKeyboard(); // Create the keyboard for spelling input
    updateDisplay('');
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('instructions-button').style.display = 'none';

    // Show the hint button etc when the game starts
    document.getElementById('hint-button').style.display = 'block';
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('mistakes').style.display = 'block';

    // Automatically play audio
    playWordAudio();
    displayHint();


    gtag('event', 'start_game', {
        'event_category': 'Game Actions',
        'event_label': `Game Started - Difficulty: ${difficulty}, Level: ${level}`
    });
}





document.addEventListener('DOMContentLoaded', () => {
    // Populate difficulties and levels
    populateDifficulties();
    populateLevels(currentDifficulty);

    // Set up event listeners for dropdowns and buttons
    const difficultySelect = document.getElementById('difficulty-selector');
    const levelSelect = document.getElementById('level-select');

    difficultySelect.addEventListener('change', () => {
        populateLevels(difficultySelect.value); // Populate levels based on the selected difficulty
        showStartNewGameButton();
    });

    levelSelect.addEventListener('change', showStartNewGameButton);

    function showStartNewGameButton() {
        document.getElementById('start-new-game').style.display = 'block';
    }

    document.getElementById('start-new-game').addEventListener('click', () => {
        const selectedDifficulty = difficultySelect.value;
        const selectedLevel = levelSelect.value;
        startLevel(selectedDifficulty, selectedLevel);
        document.getElementById('start-new-game').style.display = 'none'; // Hide the button after starting the game
    });
    document.getElementById('start-button').addEventListener('click', () => {
        const selectedDifficulty = difficultySelect.value;
        const selectedLevel = levelSelect.value;
        startLevel(selectedDifficulty, selectedLevel);
    });

    document.getElementById('hint-button').addEventListener('click', function() {
        const correctWord = gameData[currentDifficulty][currentLevel][currentQuestionIndex].correct;
        flashWord(correctWord);
    });

    // Font selector logic
    var fontSelector = document.getElementById('font-selector');
    if (fontSelector) {
        fontSelector.addEventListener('change', function() {
            var selectedFont = this.value;
            document.body.style.fontFamily = selectedFont;
            var wordButtons = document.querySelectorAll('#word-options button');
            wordButtons.forEach(function(button) {
                button.style.fontFamily = selectedFont;
            });
        });
    }

});



function populateLevels(difficulty) {
    const levelSelect = document.getElementById('level-select');
    levelSelect.innerHTML = '';

    const levels = gameData[difficulty];
    Object.keys(levels).forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = 'Round ' + level;
        levelSelect.appendChild(option);
    });

    levelSelect.value = "1"; // Default to Level 1 as a string
}

function displayHint() {
    const hint = gameData[currentDifficulty][currentLevel][currentQuestionIndex].hint;
    const hintElement = document.getElementById('hint');
    hintElement.innerText = hint;
    hintElement.style.visibility = 'visible';
}


function finishLevel() {
    flashImage(); // Display the completion image
    gtag('event', 'finish_level', {
        'event_category': 'Game Actions',
        'event_label': `Level Completed - Difficulty: ${currentDifficulty}, Level: ${currentLevel}`
    });
}


const completionImages = [
    'images/image1.webp',
    'images/image2.webp',
    'images/image3.webp',
    'images/image4.webp',
    'images/image5.webp',
    'images/image6.webp',
    'images/image7.webp',
    'images/image8.webp',
    'images/image9.webp',
    'images/image10.webp',
    'images/image11.webp',
    'images/image12.webp',
    'images/image13.webp',
    'images/image14.webp',
    'images/image15.webp',
    'images/image16.webp',
    'images/image17.webp',
    'images/image18.webp',
    'images/image19.webp',
    'images/image20.webp',
    'images/image21.webp',
    'images/image22.webp',
    'images/image23.webp',
    'images/image24.webp',
    'images/image25.webp',
    'images/image26.webp',
    'images/image27.webp',
    'images/image28.webp',
    'images/image29.webp',
    'images/image30.webp',
    'images/image31.webp',
    'images/image32.webp',
    'images/image33.webp',
    'images/image34.webp',
    'images/image35.webp', 
];
// Shuffle the completionImages array once at the beginning
shuffleArray(completionImages);
// Variable to keep track of the current image index
let currentImageIndex = 0;

function flashImage() {
    setTimeout(() => {
        const gameContainer = document.getElementById('game-container');
        const titleElement = document.querySelector('.game-wrapper > h1');

        gameContainer.style.display = 'none';
        titleElement.style.color = 'black';

        const imageContainer = document.createElement('div');
        imageContainer.style.opacity = '0';
        imageContainer.style.transition = 'opacity 1s ease-in-out';
        imageContainer.style.position = 'absolute';
        imageContainer.style.zIndex = '1000';
        imageContainer.style.width = '80%';
        imageContainer.style.maxWidth = '600px';
        imageContainer.style.margin = 'auto';
        imageContainer.style.left = '0';
        imageContainer.style.right = '0';
        imageContainer.style.top = '50%';
        imageContainer.style.transform = 'translateY(-50%)';
        imageContainer.style.textAlign = 'center';
        imageContainer.style.borderRadius = '10px';
        document.body.appendChild(imageContainer);

        const completionMessage = document.createElement('p');
        completionMessage.innerText = `Well done! You passed Level ${currentLevel}.`;
        completionMessage.style.fontSize = '24px';
        completionMessage.style.fontWeight = 'bold';
        completionMessage.style.marginBottom = '10px';
        imageContainer.appendChild(completionMessage);

        const clickMessage = document.createElement('p');
        clickMessage.innerText = "Click anywhere to continue";
        clickMessage.style.fontSize = '16px';
        imageContainer.appendChild(clickMessage);

        const imageSrc = completionImages[currentImageIndex];
        const image = document.createElement('img');
        image.src = imageSrc;
        image.alt = 'Flashing Image';
        image.style.width = '100%';
        image.style.borderRadius = '10px';
        imageContainer.appendChild(image);

        setTimeout(() => imageContainer.style.opacity = '1', 0);

        currentImageIndex = (currentImageIndex + 1) % completionImages.length;

        // Event Listener to remove the image container on click and progress to the next level/difficulty
        imageContainer.addEventListener('click', () => {
            document.body.removeChild(imageContainer);
            gameContainer.style.display = '';
            titleElement.style.color = '';

            let nextLevel = parseInt(currentLevel) + 1;
            let difficulties = Object.keys(gameData);
            let currentDifficultyIndex = difficulties.indexOf(currentDifficulty);

            if (nextLevel > Object.keys(gameData[currentDifficulty]).length) {
                if (currentDifficultyIndex < difficulties.length - 1) {
                    let nextDifficulty = difficulties[currentDifficultyIndex + 1];
                    startLevel(nextDifficulty, "1"); // Start first level of the next difficulty
                } else {
                    updateDisplay('Congratulations! You have completed all levels and difficulties.');
                }
            } else {
                startLevel(currentDifficulty, String(nextLevel));
            }
        });
    }, 2000);
}


function populateDifficulties() {
    const difficultySelect = document.getElementById('difficulty-selector');
    difficultySelect.innerHTML = ''; // Clear existing options

    Object.keys(gameData).forEach(difficulty => {
        const option = document.createElement('option');
        option.value = difficulty;
        option.textContent = difficulty;
        difficultySelect.appendChild(option);
    });
}

document.getElementById('instructions-button').addEventListener('click', function() {
    document.getElementById('instructions-container').style.display = 'block';
});

document.getElementById('close-instructions').addEventListener('click', function() {
    document.getElementById('instructions-container').style.display = 'none';
});

function playWordAudio() {
    const currentWord = gameData[currentDifficulty][currentLevel][currentQuestionIndex].correct;
    let audio = new Audio(`audio/audio_files/${currentWord}.mp3`);
    audio.play();
}

document.getElementById('play-audio').addEventListener('click', playWordAudio);

function createKeyboard() {
    const keyboardLayout = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    const keyboardContainer = document.createElement('div');
    keyboardContainer.id = 'keyboard-container';
    gameContainer.appendChild(keyboardContainer);

    // Define a set of vibrant colors
    const colors = ['#007bff', '#17a2b8', '#fd7e14', '#6f42c1', '#20c997', '#FF7F50', '#FF00FF'];

    // Select a random color for all keyboard buttons
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const buttonColor = colors[randomColorIndex];

    keyboardLayout.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';

        row.split('').forEach(letter => {
            const keyButton = document.createElement('button');
            keyButton.className = 'keyboard-key';
            keyButton.textContent = letter;

            // Apply the same random color to each keyboard button
            keyButton.style.backgroundColor = buttonColor;
            keyButton.style.color = 'white';

            keyButton.addEventListener('click', () => {
                handleKeyPress(keyButton, letter);
            });

            rowDiv.appendChild(keyButton);
        });

        keyboardContainer.appendChild(rowDiv);
    });
}


function setupGameContainer() {
    const spelledWordElement = document.createElement('div');
    spelledWordElement.id = 'spelled-word';
    gameContainer.insertBefore(spelledWordElement, gameContainer.firstChild);

    // Initialize the placeholder for the spelled word
    updateSpelledWordPlaceholder();
}

function updateSpelledWordPlaceholder() {
    const currentQuestion = gameData[currentDifficulty][currentLevel][currentQuestionIndex];
    const placeholder = '_ '.repeat(currentQuestion.correct.length).trim();
    document.getElementById('spelled-word').textContent = placeholder;
}

function handleKeyPress(button, letter) {
    const currentQuestion = gameData[currentDifficulty][currentLevel][currentQuestionIndex];
    const spelledWordElement = document.getElementById('spelled-word');
    let currentSpelling = spelledWordElement.textContent.replace(/_/g, '').trim();

    letter = letter.toLowerCase(); // Ensure letter is lowercase for comparison

    // Log the pressed letter, current spelling, and expected next letter
    console.log(`Pressed letter: ${letter}, Current spelling: ${currentSpelling}, Expected next letter: ${currentQuestion.correct[currentSpelling.length].toLowerCase()}`);

    if (currentQuestion.correct.toLowerCase().startsWith(currentSpelling + letter)) {
        currentSpelling += letter;
        spelledWordElement.textContent = currentSpelling + ' ' + '_'.repeat(currentQuestion.correct.length - currentSpelling.length);
        button.classList.add('flash-green');
        setTimeout(() => button.classList.remove('flash-green'), 500);

        if (currentSpelling.toLowerCase() === currentQuestion.correct.toLowerCase()) {
            handleCorrectSpelling();
        }
    } else {
        button.classList.add('flash-red');
        setTimeout(() => button.classList.remove('flash-red'), 500);
    }
}

function checkSpelling() {
    const spelledWord = document.getElementById('spelled-word').textContent.replace(/\s+/g, '');
    const currentQuestion = gameData[currentDifficulty][currentLevel][currentQuestionIndex];

    console.log(`Checking spelling: ${spelledWord}, Correct answer: ${currentQuestion.correct}`);

    if (spelledWord.toLowerCase() === currentQuestion.correct.toLowerCase()) {
        handleCorrectSpelling();
    }
}

function handleCorrectSpelling() {
    gameContainer.classList.add('flash-green');
    setTimeout(() => gameContainer.classList.remove('flash-green'), 500);
    score++;
    updateDisplay('Correct!');
    setTimeout(clearMessage, 5000);
    currentQuestionIndex++;

    if (currentQuestionIndex >= gameData[currentDifficulty][currentLevel].length) {
        updateDisplay('Round ' + currentLevel + ' complete! Moving to next level...');
        finishLevel();
    } else {
        setTimeout(() => {
            createWordButtons(gameData[currentDifficulty][currentLevel][currentQuestionIndex].words);
            // Reset the spelled word display for the next question
            updateSpelledWordPlaceholder();
        }, 500);
    }
}

function flashWord(word) {
    const hintElement = document.getElementById('hint');
    const originalHint = hintElement.innerText;
    hintElement.innerText = word;
    setTimeout(() => {
        hintElement.innerText = originalHint;
    }, 2000); // Flash the word for 2 seconds
}