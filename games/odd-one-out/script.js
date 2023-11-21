
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

    // Define a set of vibrant colors
    const colors = [
        '#007bff', // Bright Blue
        '#17a2b8', // Teal
        '#fd7e14', // Orange
        '#6f42c1', // Purple
        '#20c997', // Mint Green
        '#FF7F50', // Coral
        '#FF00FF'  // Pink
    ];

    // Select a random color for all buttons
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const buttonColor = colors[randomColorIndex];

    // Calculate the total number of letters in all words
    const totalLetters = words.reduce((total, word) => total + word.length, 0);

    // Adjust font size based on the total number of letters
    let buttonFontSize = '30px'; // Default font size
    if (totalLetters > 24 < 34 ) { // Threshold can be adjusted based on your layout
        buttonFontSize = '24px'; // Smaller font size for more letters
    }
    if (totalLetters > 34 ) { // Threshold can be adjusted based on your layout
        buttonFontSize = '20px'; // Smaller font size for more letters
    }
    // Further adjustments can be made based on different thresholds if needed

    words.forEach((word) => {
        const button = document.createElement('button');
        button.innerText = word;
        button.style.fontFamily = document.getElementById('font-selector').value;
        button.style.backgroundColor = buttonColor;
        button.style.color = 'white';
        button.style.fontSize = buttonFontSize;

        button.addEventListener('click', () => handleWordSelection(word));
        wordOptionsContainer.appendChild(button);
    });
}




function updateDisplay(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message || '&nbsp;'; // Replace an empty message with a non-breaking space
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('mistakes').innerText = 'Mistakes: ' + mistakes;
    document.getElementById('hint').innerText = '';
}


function handleWordSelection(selectedWord) {
    const currentQuestion = gameData[currentLevel][currentQuestionIndex];
    const gameContainer = document.getElementById('game-container'); // Reference to the game container

    if (selectedWord === currentQuestion.correct) {
        gameContainer.classList.add('flash-green');
        setTimeout(() => gameContainer.classList.remove('flash-green'), 500);
        score++;
        updateDisplay('Correct!');
        setTimeout(() => updateDisplay(''), 5000);
        currentQuestionIndex++;
        
        if (currentQuestionIndex >= gameData[currentLevel].length) {
            // Level is completed
            updateDisplay('Level ' + currentLevel + ' complete! Moving to next level...');
            finishLevel(); 
            setTimeout(() => {
                // Move to the next level after a short delay
                currentLevel++; // Increment to the next level
                if (currentLevel <= Object.keys(gameData).length) {
                    startLevel(currentLevel);
                } else {
                    updateDisplay('Congratulations! You have completed all levels.');
                    // Here you can handle the end of all levels, e.g., hiding game elements or showing a restart option
                }
            }, 4000); // 4 seconds delay before starting next level
        } else {
            // Move to the next question
            setTimeout(() => {
                createWordButtons(gameData[currentLevel][currentQuestionIndex].words);
            }, 500); // Delay for the flash animation to complete
        }
    } else {
        // Wrong answer
        gameContainer.classList.add('flash-red');
        setTimeout(() => gameContainer.classList.remove('flash-red'), 500);
        mistakes++;
        updateDisplay('This is a tough one! Try again, or use the Hint button.');
    }
}


function startLevel(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;
    mistakes = 0;
    createWordButtons(gameData[currentLevel][currentQuestionIndex].words);
    updateDisplay('');

    // Hide the Start Game button
    document.getElementById('start-button').style.display = 'none';

    document.getElementById('hint-button').style.display = 'block';

    // Set the selected option in the level-select drop-down
    const levelSelect = document.getElementById('level-select');
    levelSelect.value = currentLevel.toString(); // Convert currentLevel to a string for comparison

    levelSelect.addEventListener('change', () => startLevel(levelSelect.value));
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

function finishLevel() {
    flashImage(); // Display the completion image
}

document.addEventListener('DOMContentLoaded', () => {
    const levelSelect = document.getElementById('level-select');

    for (let i = 1; i <= 18; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = 'Level ' + i;
        option.className = getDifficulty(i); // Add the difficulty as a class
        levelSelect.appendChild(option);
    }
    updateLevelSelectBackground(levelSelect); // Initial update of background color

    levelSelect.addEventListener('change', () => {
        startLevel(levelSelect.value);
        updateLevelSelectBackground(levelSelect); // Update background on change
    });

    document.getElementById('start-button').addEventListener('click', () => startLevel(currentLevel));
    document.getElementById('hint-button').addEventListener('click', displayHint);
    setupModalEventListeners();

});

document.addEventListener('DOMContentLoaded', function() {
    var fontSelector = document.getElementById('font-selector');
    if (fontSelector) {
        fontSelector.addEventListener('change', function() {
            var selectedFont = this.value;
            document.body.style.fontFamily = selectedFont;

            // Update the font for the 'odd one out' words (word buttons)
            var wordButtons = document.querySelectorAll('#word-options button');
            wordButtons.forEach(function(button) {
                button.style.fontFamily = selectedFont;
            });
        });
    }
});

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
];

// Shuffle the completionImages array once at the beginning
shuffleArray(completionImages);
// Variable to keep track of the current image index
let currentImageIndex = 0;

function flashImage() {
    // Delay the execution for 1 second
    setTimeout(() => {
        const gameContainer = document.getElementById('game-container');
        const titleElement = document.querySelector('#game-container h1'); // Select the h1 element inside the game container

        // Directly apply styles to hide the game container and change the title color
        gameContainer.style.display = 'none';
        titleElement.style.color = 'black';

        const imageContainer = document.createElement('div');
        // Add opacity and transition for fade-in effect
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

        // Start the fade-in effect
        setTimeout(() => imageContainer.style.opacity = '1', 0);

        // Increment the currentImageIndex
        currentImageIndex = (currentImageIndex + 1) % completionImages.length;

        // Event Listener to remove the image container on click
        imageContainer.addEventListener('click', () => {
            document.body.removeChild(imageContainer);

            // Reset styles to show the game container and title
            gameContainer.style.display = '';
            titleElement.style.icolor = '';
        });
    }, 2000);
}

function getDifficulty(level) {
    if (level >= 1 && level <= 3) {
        return 'easy';
    } else if (level >= 4 && level <= 11) {
        return 'medium';
    } else if (level >= 2 && level <= 18) {
        return 'mediumhard';
    } else {
        return 'hard'
    }
}

function updateLevelSelectBackground(levelSelect) {
    const selectedOption = levelSelect.options[levelSelect.selectedIndex];
    const difficultyClass = selectedOption.className;

    // Remove all possible difficulty classes
    levelSelect.classList.remove('easy', 'medium', 'mediumhard', 'hard');

    // Add the new difficulty class
    if (difficultyClass) {
        levelSelect.classList.add(difficultyClass);
    }
}

let gameData = {
    "1": [
        {"words": ["cat", "hat", "bat", "dog"], "correct": "dog", "hint": "Three of these words rhyme."},
        {"words": ["pen", "hen", "ten", "pig"], "correct": "pig", "hint": "Three of these words rhyme."},
        {"words": ["man", "can", "pan", "dog"], "correct": "dog", "hint": "Three of these words rhyme."},
        {"words": ["big", "pig", "wig", "bat"], "correct": "bat", "hint": "Three of these words rhyme."},
        {"words": ["net", "pet", "jet", "sun"], "correct": "sun", "hint": "Three of these words rhyme."},
        {"words": ["bus", "fuss", "plus", "cat"], "correct": "cat", "hint": "Three of these words rhyme."},
        {"words": ["hop", "mop", "top", "man"], "correct": "man", "hint": "Three of these words rhyme."},
        {"words": ["bag", "tag", "rag", "sun"], "correct": "sun", "hint": "Three of these words rhyme."},
        {"words": ["bug", "rug", "hug", "hat"], "correct": "hat", "hint": "Three of these words rhyme."},
        {"words": ["sit", "hit", "kit", "dog"], "correct": "dog", "hint": "Three of these words rhyme."}
    ],
    "2": [
        {"words": ["fat", "cat", "rat", "bug"], "correct": "bug", "hint": "Three of these words sound rhyme."},
        {"words": ["bit", "lit", "pit", "man"], "correct": "man", "hint": "Three of these words rhyme."},
        {"words": ["log", "dog", "fog", "cat"], "correct": "cat", "hint": "Three of these words rhyme."},
        {"words": ["hat", "bat", "rat", "pig"], "correct": "pig", "hint": "Three of these words rhyme."},
        {"words": ["jet", "net", "pet", "bus"], "correct": "bus", "hint": "Three of these words rhyme."},
        {"words": ["mop", "top", "hop", "bug"], "correct": "bug", "hint": "Three of these words rhyme."},
        {"words": ["cap", "tap", "map", "dog"], "correct": "dog", "hint": "Three of these words rhyme."},
        {"words": ["sun", "bun", "fun", "rat"], "correct": "rat", "hint": "Three of these words rhyme."},
        {"words": ["rug", "bug", "hug", "net"], "correct": "net", "hint": "Three of these words rhyme."},
        {"words": ["kit", "sit", "bit", "bus"], "correct": "bus", "hint": "Three of these words rhyme."}
    ],
    "3": [
        {"words": ["cat", "dog", "pig", "box"], "correct": "box", "hint": "Three of these are animals."},
        {"words": ["bed", "rug", "lamp", "ball"], "correct": "ball", "hint": "Three of these are found in a house."},
        {"words": ["cup", "mug", "pan", "pen"], "correct": "pen", "hint": "Three of these are used in the kitchen."},
        {"words": ["bus", "car", "van", "fish"], "correct": "fish", "hint": "Three of these are types of vehicles."},
        {"words": ["hat", "cap", "coat", "moon"], "correct": "moon", "hint": "Three of these are items of clothing."},
        {"words": ["bat", "ball", "net", "sock"], "correct": "sock", "hint": "Three of these are used in sports."},
        {"words": ["rat", "cat", "bug", "map"], "correct": "map", "hint": "Three of these are animals."},
        {"words": ["sun", "star", "moon", "dish"], "correct": "dish", "hint": "Three of these are found in the sky."},
        {"words":["ship", "boat", "raft", "tree"], "correct": "tree", "hint": "Three of these can be found on water."},
        {"words": ["tree", "bush", "flower", "lock"], "correct": "lock", "hint": "Three of these are parts of nature."}
    ],
    
    
    "4": [
        {
            "words": [
                "February",
                "January",
                "March",
                "summer"
            ],
            "correct": "summer",
            "hint": "Three of these are months of the year."
        },
        {
            "words": [
                "football",
                "cricket",
                "rugby",
                "swimming"
            ],
            "correct": "swimming",
            "hint": "Three of these are land-based sports."
        },
        {
            "words": [
                "biscuit",
                "sweet",
                "cake",
                "salty"
            ],
            "correct": "salty",
            "hint": "Three of these are types of confectionery."
        },
        {
            "words": [
                "dog",
                "cat",
                "fish",
                "jump"
            ],
            "correct": "jump",
            "hint": "Three of these are types of animals."
        },
        {
            "words": [
                "elephant",
                "lion",
                "tiger",
                "sparrow"
            ],
            "correct": "sparrow",
            "hint": "Three of these are large mammals."
        },
        {
            "words": [
                "one",
                "two",
                "three",
                "eight"
            ],
            "correct": "eight",
            "hint": "Three of these are consecutive numbers."
        },
        {
            "words": [
                "Berlin",
                "London",
                "Paris",
                "river"
            ],
            "correct": "river",
            "hint": "Three of these are capital cities."
        },
        {
            "words": [
                "square",
                "triangle",
                "circle",
                "eraser"
            ],
            "correct": "eraser",
            "hint": "Three of these are geometric shapes."
        },
        {
            "words": [
                "apple",
                "banana",
                "carrot",
                "mango"
            ],
            "correct": "carrot",
            "hint": "Three of these are fruits."
        },
        {
            "words": [
                "green",
                "red",
                "blue",
                "sound"
            ],
            "correct": "sound",
            "hint": "Three of these are colours."
        }
    ],
    "5": [
        {
            "words": [
                "purple",
                "red",
                "blue",
                "colour"
            ],
            "correct": "colour",
            "hint": "Three of these are specific colours."
        },
        {
            "words": [
                "rain",
                "sleet",
                "snow",
                "hot"
            ],
            "correct": "hot",
            "hint": "Three of these are forms of precipitation."
        },
        {
            "words": [
                "violin",
                "piano",
                "flute",
                "paint"
            ],
            "correct": "paint",
            "hint": "Three of these are musical instruments."
        },
        {
            "words": [
                "pencil",
                "ruler",
                "pen",
                "book"
            ],
            "correct": "book",
            "hint": "Three of these are writing instruments."
        },
        {
            "words": [
                "science",
                "English",
                "maths",
                "guitar"
            ],
            "correct": "guitar",
            "hint": "Three of these are school subjects."
        },
        {
            "words": [
                "car",
                "bike",
                "bus",
                "run"
            ],
            "correct": "run",
            "hint": "Three of these are modes of transport."
        },
        {
            "words": [
                "rose",
                "daisy",
                "lily",
                "grass"
            ],
            "correct": "grass",
            "hint": "Three of these are types of flowers."
        },
        {
            "words": [
                "scarf",
                "gloves",
                "hat",
                "shoes"
            ],
            "correct": "shoes",
            "hint": "Three of these are winter accessories."
        },
        {
            "words": [
                "bread",
                "butter",
                "jam",
                "spoon"
            ],
            "correct": "spoon",
            "hint": "Three of these are types of spreads."
        },
        {
            "words": [
                "queen",
                "prince",
                "king",
                "castle"
            ],
            "correct": "castle",
            "hint": "Three of these are royal titles."
        }
    ],
    "6": [
        {
            "words": [
                "read",
                "write",
                "talk",
                "listen"
            ],
            "correct": "listen",
            "hint": "Three of these are active."
        },
        {
            "words": [
                "eye",
                "nose",
                "ear",
                "face"
            ],
            "correct": "face",
            "hint": "Three of these are facial features."
        },
        {
            "words": [
                "hat",
                "helmet",
                "cap",
                "head"
            ],
            "correct": "head",
            "hint": "Three of these are types of headgear."
        },
        {
            "words": [
                "ocean",
                "river",
                "lake",
                "water"
            ],
            "correct": "water",
            "hint": "Three of these are bodies of water."
        },
        {
            "words": [
                "orange",
                "apple",
                "pear",
                "fruit"
            ],
            "correct": "fruit",
            "hint": "Three of these are types of fruits."
        },
        {
            "words": [
                "Wednesday",
                "Tuesday",
                "July",
                "Monday"
            ],
            "correct": "July",
            "hint": "Three of these are days of the week."
        },
        {
            "words": [
                "run",
                "swim",
                "jump",
                "move"
            ],
            "correct": "move",
            "hint": "Three of these are specific physical activities."
        },
        {
            "words": [
                "tree",
                "flower",
                "bush",
                "plant"
            ],
            "correct": "plant",
            "hint": "Three of these are specific types of flora."
        },
        {
            "words": [
                "train",
                "plane",
                "car",
                "transport"
            ],
            "correct": "transport",
            "hint": "Three of these are types of vehicles."
        },
        {
            "words": [
                "pig",
                "cow",
                "horse",
                "barn"
            ],
            "correct": "barn",
            "hint": "Three of these are farm animals"
        }
    ],
    "7": [
        {
            "words": [
                "phone",
                "laptop",
                "tablet",
                "device"
            ],
            "correct": "device",
            "hint": "Three of these are types of electronics."
        },
        {
            "words": [
                "triangle",
                "square",
                "circle",
                "shape"
            ],
            "correct": "shape",
            "hint": "Three of these are geometric figures."
        },
        {
            "words": [
                "jazz",
                "rock",
                "pop",
                "music"
            ],
            "correct": "music",
            "hint": "Three of these are music genres."
        },
        {
            "words": [
                "spring",
                "summer",
                "autumn",
                "season"
            ],
            "correct": "season",
            "hint": "Three of these represent specific times of the year."
        },
        {
            "words": [
                "pie",
                "cookie",
                "cake",
                "dessert"
            ],
            "correct": "dessert",
            "hint": "Three of these are specific types of desserts."
        },
        {
            "words": [
                "hammer",
                "screwdriver",
                "wrench",
                "tool"
            ],
            "correct": "tool",
            "hint": "Three of these are specific types of hand tools."
        },
        {
            "words": [
                "leg",
                "arm",
                "foot",
                "body"
            ],
            "correct": "body",
            "hint": "Three of these are parts of the body."
        },
        {
            "words": [
                "sing",
                "act",
                "dance",
                "perform"
            ],
            "correct": "perform",
            "hint": "Three of these are specific performing arts."
        },
        {
            "words": [
                "chicken",
                "duck",
                "turkey",
                "bird"
            ],
            "correct": "bird",
            "hint": "Three of these are specific types of birds."
        },
        {
            "words": [
                "cat",
                "mouse",
                "dog",
                "animal"
            ],
            "correct": "animal",
            "hint": "Three of these are types of domestic animals."
        }
    ],
    "8": [
        {
            "words": [
                "potato",
                "onion",
                "carrot",
                "vegetable"
            ],
            "correct": "vegetable",
            "hint": "Three of these are types of vegetables."
        },
        {
            "words": [
                "sun",
                "moon",
                "star",
                "sky"
            ],
            "correct": "sky",
            "hint": "Three of these are celestial bodies."
        },
        {
            "words": [
                "scooter",
                "bike",
                "skateboard",
                "ride"
            ],
            "correct": "ride",
            "hint": "Three of these are wheeled vehicles."
        },
        {
            "words": [
                "cricket",
                "rugby",
                "tennis",
                "sport"
            ],
            "correct": "sport",
            "hint": "Three of these are specific sports."
        },
        {
            "words": [
                "whale",
                "seal",
                "dolphin",
                "fish"
            ],
            "correct": "fish",
            "hint": "Three of these are mammals."
        },
        {
            "words": [
                "melon",
                "grape",
                "banana",
                "fruit"
            ],
            "correct": "fruit",
            "hint": "Three of these are types of fruits."
        },
        {
            "words": [
                "painting",
                "drawing",
                "sketch",
                "art"
            ],
            "correct": "art",
            "hint": "Three of these are specific art forms."
        },
        {
            "words": [
                "pencil",
                "sharpener",
                "eraser",
                "stationery"
            ],
            "correct": "stationery",
            "hint": "Three of these are types of stationery."
        },
        {
            "words": [
                "rectangle",
                "pentagon",
                "hexagon",
                "shape"
            ],
            "correct": "shape",
            "hint": "Three of these are geometric figures."
        },
        {
            "words": [
                "strawberry",
                "vanilla",
                "chocolate",
                "flavour"
            ],
            "correct": "flavour",
            "hint": "Three of these are types of flavour."
        }
    ],
    "9": [
        {
            "words": [
                "5",
                "1",
                "3",
                "10"
            ],
            "correct": "10",
            "hint": "Three of these are odd numbers."
        },
        {
            "words": [
                "e",
                "i",
                "a",
                "p"
            ],
            "correct": "p",
            "hint": "Three of these are vowels."
        },
        {
            "words": [
                "15",
                "5",
                "10",
                "18"
            ],
            "correct": "18",
            "hint": "Three of these are multiples of 5."
        },
        {
            "words": [
                "yellow",
                "blue",
                "red",
                "pink"
            ],
            "correct": "pink",
            "hint": "Three of these are primary colours."
        },
        {
            "words": [
                "ball",
                "wicket",
                "bat",
                "racquet"
            ],
            "correct": "racquet",
            "hint": "Three of these are related to cricket."
        },
        {
            "words": [
                "triangle",
                "circle",
                "square",
                "line"
            ],
            "correct": "line",
            "hint": "Three of these are geometric shapes."
        },
        {
            "words": [
                "6",
                "4",
                "2",
                "9"
            ],
            "correct": "9",
            "hint": "Three of these are even numbers."
        },
        {
            "words": [
                "bike",
                "bus",
                "train",
                "car"
            ],
            "correct": "train",
            "hint": "Three of these have tyres."
        },
        {
            "words": [
                "grape",
                "pear",
                "cherry",
                "apple"
            ],
            "correct": "cherry",
            "hint": "Three of these have seeds rather than stones."
        },
        {
            "words": [
                "10",
                "30",
                "20",
                "45"
            ],
            "correct": "45",
            "hint": "Three of these are multiples of 10."
        }
    ],
    "10": [
        {
            "words": [
                "scarf",
                "hat",
                "gloves",
                "shirt"
            ],
            "correct": "shirt",
            "hint": "Three of these are clothing items."
        },
        {
            "words": [
                "knee",
                "elbow",
                "wrist",
                "hip"
            ],
            "correct": "hip",
            "hint": "Three of these are joints."
        },
        {
            "words": [
                "sun",
                "moon",
                "earth",
                "mars"
            ],
            "correct": "sun",
            "hint": "Three of these are celestial bodies."
        },
        {
            "words": [
                "apple",
                "grape",
                "orange",
                "fruit"
            ],
            "correct": "fruit",
            "hint": "Three of these are types of fruits."
        },
        {
            "words": [
                "bus",
                "bike",
                "car",
                "walk"
            ],
            "correct": "walk",
            "hint": "Three of these are physical actions."
        },
        {
            "words": [
                "flower",
                "bush",
                "tree",
                "plant"
            ],
            "correct": "plant",
            "hint": "Three of these are types of flora."
        },
        {
            "words": [
                "2",
                "5",
                "4",
                "3"
            ],
            "correct": "4",
            "hint": "Three of these are prime numbers"
        },
        {
            "words": [
                "10",
                "5",
                "15",
                "12"
            ],
            "correct": "12",
            "hint": "Three of these are multiples of 5"
        },
        {
            "words": [
                "bird",
                "cat",
                "cow",
                "dog"
            ],
            "correct": "cow",
            "hint": "Three of these are commonly kept as pets."
        },
        {
            "words": [
                "pencil",
                "pen",
                "brush",
                "ink"
            ],
            "correct": "ink",
            "hint": "Three of these are common writing instruments."
        }
    ],
    "11": [
        {
            "words": [
                "walk",
                "jump",
                "sleep",
                "run"
            ],
            "correct": "sleep",
            "hint": "Three of these are physical activities."
        },
        {
            "words": [
                "chair",
                "desk",
                "table",
                "furniture"
            ],
            "correct": "furniture",
            "hint": "Three of these are specific types of furniture."
        },
        {
            "words": [
                "red",
                "green",
                "blue",
                "colour"
            ],
            "correct": "colour",
            "hint": "Three of these are colours."
        },
        {
            "words": [
                "cricket",
                "tennis",
                "football",
                "sport"
            ],
            "correct": "sport",
            "hint": "Three of these are individual sports."
        },
        {
            "words": [
                "bread",
                "butter",
                "cheese",
                "dairy"
            ],
            "correct": "dairy",
            "hint": "Three of these are dairy products."
        },
        {
            "words": [
                "lion",
                "leopard",
                "tiger",
                "cat"
            ],
            "correct": "cat",
            "hint": "Three of these are feline animals."
        },
        {
            "words": [
                "6",
                "9",
                "3",
                "13"
            ],
            "correct": "13",
            "hint": "Three of these are single-digit numbers."
        },
        {
            "words": [
                "rain",
                "sun",
                "snow",
                "weather"
            ],
            "correct": "weather",
            "hint": "Three of these are weather conditions."
        },
        {
            "words": [
                "square",
                "oval",
                "circle",
                "shape"
            ],
            "correct": "shape",
            "hint": "Three of these are geometric figures."
        },
        {
            "words": [
                "12",
                "8",
                "4",
                "18"
            ],
            "correct": "18",
            "hint": "Three of these are divisible by 4."
        }
    ],
    "12": [
        {"words": ["Joyful", "Cheerful", "Sad", "Happy"], "correct": "Sad", "hint": "Three of these words mean feeling very good and smiling."},
        {"words": ["Tiny", "Little", "Big", "Small"], "correct": "Big", "hint": "Three of these words mean not large or not much."},
        {"words": ["Yummy", "Tasty", "Yucky", "Delicious"], "correct": "Yucky", "hint": "Three of these words mean very good to eat."},
        {"words": ["Loud", "Noisy", "Quiet", "Boisterous"], "correct": "Quiet", "hint": "Three of these words mean making a lot of sound."},
        {"words": ["Soft", "Gentle", "Hard", "Tender"], "correct": "Hard", "hint": "Three of these words mean not rough to touch."},
        {"words": ["Bright", "Light", "Dark", "Shiny"], "correct": "Dark", "hint": "Three of these words mean having a lot of light."},
        {"words": ["Fast", "Quick", "Slow", "Speedy"], "correct": "Slow", "hint": "Three of these words mean moving or doing things in a short time."},
        {"words": ["Clean", "Neat", "Messy", "Tidy"], "correct": "Messy", "hint": "Three of these words mean in good order and looking nice."},
        {"words": ["Hot", "Warm", "Cold", "Heated"], "correct": "Cold", "hint": "Three of these words mean having a high temperature."},
        {"words": ["Wet", "Damp", "Dry", "Moist"], "correct": "Dry", "hint": "Three of these words mean having water or liquid on them."}
    ],
    "13": [
        {"words": ["Happy", "Glad", "Upset", "Cheerful"], "correct": "Upset", "hint": "Three of these words mean feeling good and smiling."},
        {"words": ["Huge", "Big", "Tiny", "Large"], "correct": "Tiny", "hint": "Three of these words mean very large."},
        {"words": ["Sour", "Sweet", "Bitter", "Tasty"], "correct": "Sour", "hint": "Three of these words mean good to eat and not bitter or sour."},
        {"words": ["Quiet", "Silent", "Loud", "Hushed"], "correct": "Loud", "hint": "Three of these words mean not making much noise."},
        {"words": ["Rough", "Smooth", "Bumpy", "Soft"], "correct": "Rough", "hint": "Three of these words mean nice to touch and not hard."},
        {"words": ["Dark", "Bright", "Dim", "Shiny"], "correct": "Dark", "hint": "Three of these words mean having lots of light."},
        {"words": ["Slow", "Quick", "Fast", "Speedy"], "correct": "Slow", "hint": "Three of these words mean moving or doing something quickly."},
        {"words": ["Dirty", "Clean", "Spotless", "Tidy"], "correct": "Dirty", "hint": "Three of these words mean neat and not dirty."},
        {"words": ["Cold", "Hot", "Warm", "Boiling"], "correct": "Cold", "hint": "Three of these words mean having a high temperature."},
        {"words": ["Dry", "Wet", "Damp", "Moist"], "correct": "Dry", "hint": "Three of these words mean having water or liquid on them."}
    ],
    "14": [
        {"words": ["Amusing", "Boring", "Funny", "Hilarious"], "correct": "Boring", "hint": "Three of these words mean making you laugh or smile."},
        {"words": ["Enormous", "Small", "Gigantic", "Vast"], "correct": "Small", "hint": "Three of these words mean very big."},
        {"words": ["Delicious", "Yucky", "Tasty", "Flavourful"], "correct": "Yucky", "hint": "Three of these words mean very good to eat."},
        {"words": ["Whisper", "Shout", "Yell", "Scream"], "correct": "Whisper", "hint": "Three of these words mean using a very loud voice."},
        {"words": ["Hard", "Easy", "Simple", "Effortless"], "correct": "Hard", "hint": "Three of these words mean not difficult."},
        {"words": ["Dull", "Exciting", "Thrilling", "Fascinating"], "correct": "Dull", "hint": "Three of these words mean very interesting and fun."},
        {"words": ["Sluggish", "Energetic", "Lively", "Vibrant"], "correct": "Sluggish", "hint": "Three of these words mean full of energy and life."},
        {"words": ["Filthy", "Clean", "Spotless", "Immaculate"], "correct": "Filthy", "hint": "Three of these words mean very clean."},
        {"words": ["Freezing", "Scorching", "Hot", "Boiling"], "correct": "Freezing", "hint": "Three of these words mean very warm."},
        {"words": ["Soggy", "Dry", "Damp", "Moist"], "correct": "Dry", "hint": "Three of these words mean a little bit wet."}
    ],

    "15": [
        {"words": ["Tall", "Gargantuan", "Huge", "Petite"], "correct": "Petite", "hint": "Three of these words mean very large."},
        {"words": ["Happy", "Joyful", "Elated", "Morose"], "correct": "Morose", "hint": "Three of these words mean very happy."},
        {"words": ["Fast", "Swift", "Rapid", "Slow"], "correct": "Slow", "hint": "Three of these words mean very quick."},
        {"words": ["Cold", "Chilly", "Frosty", "Warm"], "correct": "Warm", "hint": "Three of these words mean very cold."},
        {"words": ["Bright", "Radiant", "Dim", "Shiny"], "correct": "Dim", "hint": "Three of these words mean very luminous."},
        {"words": ["Strong", "Powerful", "Weak", "Mighty"], "correct": "Weak", "hint": "Three of these words mean having great power."},
        {"words": ["Angry", "Furious", "Irate", "Calm"], "correct": "Calm", "hint": "Three of these words mean very angry."},
        {"words": ["Small", "Tiny", "Huge", "Minuscule"], "correct": "Huge", "hint": "Three of these words mean very small."},
        {"words": ["Hard", "Difficult", "Easy", "Challenging"], "correct": "Easy", "hint": "Three of these words mean not easy."},
        {"words": ["Silent", "Quiet", "Noisy", "Hushed"], "correct": "Noisy", "hint": "Three of these words mean making little or no noise."}
    ],
    "16": [
        {"words": ["Excited", "Thrilled", "Apathetic", "Stoked"], "correct": "Apathetic", "hint": "Three of these words mean very excited."},
        {"words": ["Intelligent", "Smart", "Dull", "Clever"], "correct": "Dull", "hint": "Three of these words mean having good understanding or a high mental capacity."},
        {"words": ["Beautiful", "Gorgeous", "Plain", "Lovely"], "correct": "Plain", "hint": "Three of these words mean aesthetically pleasing."},
        {"words": ["Lazy", "Indolent", "Active", "Slothful"], "correct": "Active", "hint": "Three of these words mean unwilling to work or use energy."},
        {"words": ["Rich", "Wealthy", "Poor", "Affluent"], "correct": "Poor", "hint": "Three of these words mean having a great deal of money or assets."},
        {"words": ["Funny", "Humorous", "Serious", "Witty"], "correct": "Serious", "hint": "Three of these words mean causing laughter or amusement."},
        {"words": ["Quiet", "Silent", "Loud", "Mute"], "correct": "Loud", "hint": "Three of these words mean making little or no noise."},
        {"words": ["Ancient", "Old", "Modern", "Antique"], "correct": "Modern", "hint": "Three of these words mean belonging to the very distant past and no longer in existence."},
        {"words": ["Optimistic", "Hopeful", "Pessimistic", "Confident"], "correct": "Pessimistic", "hint": "Three of these words mean expecting good outcomes."},
        {"words": ["Neat", "Orderly", "Messy", "Tidy"], "correct": "Messy", "hint": "Three of these words mean arranged in a tidy way."}
    ],
    "17": [
        {"words": ["Euphoric", "Miserable", "Ecstatic", "Elated"], "correct": "Miserable", "hint": "Three of these words mean feeling extremely happy."},
        {"words": ["Minuscule", "Enormous", "Petite", "Tiny"], "correct": "Enormous", "hint": "Three of these words mean very small."},
        {"words": ["Abhorrent", "Appealing", "Repulsive", "Disgusting"], "correct": "Appealing", "hint": "Three of these words mean causing a strong feeling of dislike."},
        {"words": ["Bellow", "Murmur", "Yell", "Shriek"], "correct": "Murmur", "hint": "Three of these words mean making a very loud noise with your voice."},
        {"words": ["Arduous", "Effortless", "Laborious", "Strenuous"], "correct": "Effortless", "hint": "Three of these words mean requiring a lot of effort."},
        {"words": ["Tedious", "Exciting", "Monotonous", "Dreary"], "correct": "Exciting", "hint": "Three of these words mean boring and not interesting."},
        {"words": ["Lethargic", "Vivacious", "Listless", "Torpid"], "correct": "Vivacious", "hint": "Three of these words mean lacking energy or enthusiasm."},
        {"words": ["Squalid", "Pristine", "Filthy", "Unkempt"], "correct": "Pristine", "hint": "Three of these words mean very dirty and unpleasant."},
        {"words": ["Blistering", "Frigid", "Sweltering", "Torrid"], "correct": "Frigid", "hint": "Three of these words mean extremely hot."},
        {"words": ["Saturated", "Parched", "Soaked", "Drenched"], "correct": "Parched", "hint": "Three of these words mean very wet."}
    ],
    "18": [
        {"words": ["Cacophonous", "Harmonious", "Discordant", "Clamorous"], "correct": "Harmonious", "hint": "Three of these words mean having a harsh, often unpleasantly loud sound."},
        {"words": ["Invisible", "Overt", "Conspicuous", "Prominent"], "correct": "Invisible", "hint": "Three of these words mean very easy to see or notice."},
        {"words": ["Nefarious", "Virtuous", "Heinous", "Villainous"], "correct": "Virtuous", "hint": "Three of these words mean extremely wicked or villainous."},
        {"words": ["Inaudible", "Audible", "Resounding", "Thunderous"], "correct": "Inaudible", "hint": "Three of these words mean loud enough to be heard."},
        {"words": ["Impoverished", "Affluent", "Wealthy", "Prosperous"], "correct": "Impoverished", "hint": "Three of these words mean having a lot of money, property, or valuable possessions."},
        {"words": ["Despondent", "Jubilant", "Elated", "Ecstatic"], "correct": "Despondent", "hint": "Three of these words mean feeling or expressing great happiness or triumph."},
        {"words": ["Fragile", "Sturdy", "Robust", "Durable"], "correct": "Fragile", "hint": "Three of these words mean strong and unlikely to break or fail."},
        {"words": ["Cryptic", "Lucid", "Clear", "Evident"], "correct": "Cryptic", "hint": "Three of these words mean easy to understand or see."},
        {"words": ["Arctic", "Tropical", "Torrid", "Sweltering"], "correct": "Arctic", "hint": "Three of these words mean very hot, especially to the point of causing discomfort."},
        {"words": ["Parched", "Sodden", "Saturated", "Soaked"], "correct": "Parched", "hint": "Three of these words mean thoroughly wet."}
    ],
    "19": [
        {"words": ["Gregarious", "Introverted", "Sociable", "Convivial"], "correct": "Introverted", "hint": "Three of these words mean enjoying the company of others."},
        {"words": ["Luminous", "Dim", "Radiant", "Glowing"], "correct": "Dim", "hint": "Three of these words mean bright or giving off light."},
        {"words": ["Deleterious", "Beneficial", "Harmful", "Detrimental"], "correct": "Beneficial", "hint": "Three of these words mean causing harm or damage."},
        {"words": ["Ephemeral", "Perpetual", "Fleeting", "Transient"], "correct": "Perpetual", "hint": "Three of these words mean lasting for a very short time."},
        {"words": ["Opulent", "Spartan", "Lavish", "Luxurious"], "correct": "Spartan", "hint": "Three of these words mean rich and luxurious or magnificent."},
        {"words": ["Obtuse", "Keen", "Acutely", "Sharp"], "correct": "Obtuse", "hint": "Three of these words mean having or showing a sharp or keen intelligence."},
        {"words": ["Benevolent", "Malevolent", "Kind", "Compassionate"], "correct": "Malevolent", "hint": "Three of these words mean well-meaning and kindly."},
        {"words": ["Serene", "Agitated", "Tranquil", "Peaceful"], "correct": "Agitated", "hint": "Three of these words mean calm and peaceful."},
        {"words": ["Inferno", "Blizzard", "Conflagration", "Wildfire"], "correct": "Blizzard", "hint": "Three of these words mean a very large and destructive fire."},
        {"words": ["Arduous", "Easy", "Demanding", "Laborious"], "correct": "Easy", "hint": "Three of these words mean requiring a lot of hard work."}
    ]  ,
    "20": [
        {"words": ["Melancholy", "Joyful", "Sorrowful", "Gloomy"], "correct": "Joyful", "hint": "Three of these words mean feeling sad."},
        {"words": ["Transparent", "Opaque", "Clear", "Lucid"], "correct": "Opaque", "hint": "Three of these words mean you can see through them."},
        {"words": ["Malevolent", "Kind", "Nasty", "Wicked"], "correct": "Kind", "hint": "Three of these words mean not nice."},
        {"words": ["Perennial", "Ephemeral", "Lasting", "Enduring"], "correct": "Ephemeral", "hint": "Three of these words mean lasting a long time."},
        {"words": ["Indigent", "Wealthy", "Poor", "Needy"], "correct": "Wealthy", "hint": "Three of these words mean not having much money."},
        {"words": ["Voracious", "Satisfied", "Ravenous", "Insatiable"], "correct": "Satisfied", "hint": "Three of these words mean very hungry."},
        {"words": ["Cordial", "Unfriendly", "Amiable", "Affable"], "correct": "Unfriendly", "hint": "Three of these words mean friendly and nice."},
        {"words": ["Placid", "Turbulent", "Calm", "Serene"], "correct": "Turbulent", "hint": "Three of these words mean very quiet and peaceful."},
        {"words": ["Drought", "Deluge", "Downpour", "Flood"], "correct": "Drought", "hint": "Three of these words mean a lot of rain."},
        {"words": ["Simple", "Complex", "Complicated", "Intricate"], "correct": "Simple", "hint": "Three of these words mean not easy to understand."}
    ],
    "21": [
        {"words": ["Magnanimous", "Selfish", "Generous", "Altruistic"], "correct": "Selfish", "hint": "Three of these words mean very giving and kind."},
        {"words": ["Invisible", "Visible", "Transparent", "See-through"], "correct": "Invisible", "hint": "Three of these words mean you can see it."},
        {"words": ["Humid", "Dry", "Muggy", "Moist"], "correct": "Dry", "hint": "Three of these words mean having a lot of moisture in the air."},
        {"words": ["Ancient", "New", "Old", "Antique"], "correct": "New", "hint": "Three of these words mean very old."},
        {"words": ["Scarce", "Abundant", "Rare", "Limited"], "correct": "Abundant", "hint": "Three of these words mean there isn’t much of it."},
        {"words": ["Boisterous", "Quiet", "Loud", "Rambunctious"], "correct": "Quiet", "hint": "Three of these words mean making a lot of noise."},
        {"words": ["Vivid", "Dull", "Bright", "Colorful"], "correct": "Dull", "hint": "Three of these words mean having strong or bright colors."},
        {"words": ["Barren", "Fertile", "Unproductive", "Sterile"], "correct": "Fertile", "hint": "Three of these words mean not good for growing plants."},
        {"words": ["Arid", "Wet", "Dry", "Parched"], "correct": "Wet", "hint": "Three of these words mean very dry."},
        {"words": ["Rapid", "Slow", "Swift", "Fast"], "correct": "Slow", "hint": "Three of these words mean moving or happening quickly."}
    ]  
}

