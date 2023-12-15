let gameData = {
    "Single words": {
        "1": generateLetterData(1),  // Singleletter data
        "2": generateWordData(2),    // Two-letter word data
        // Add more levels for three-letter words, etc.
    },
    "Short sentences": {
        // Structure similar to existing gameData
    },
    "Long sentences": {
        // Structure similar to existing gameData
    },
    "Longer text": {
        // Structure similar to existing gameData
    }
};


let currentDifficulty = "Single words"; // Default difficulty
let currentLevel = "1"; // Default level
let currentQuestionIndex = 0;
let score = 0;
let mistakes = 0;
const gameContainer = document.getElementById('game-container');

let displaySpeeds = {
    "Level 1": 2000,
    "Level 2": 1000,
    "Level 3": 500,
    "Level 4": 250,
    "Level 5": 100,
    "Level 6": 50,
    "Level 7": 25,
    "Level 8": 10,
    "Level 9": 1
};

let currentSpeed = displaySpeeds["Level 1"]; // Set the default speed to 2000 milliseconds

function generateLetterData(count) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    // Generate data for 10 rounds
    return Array.from({ length: 10 }, () => { // Change to 10 for ten rounds
        const letter = letters[Math.floor(Math.random() * letters.length)];
        return {
            content: letter,
            question: "Which letter was shown?",
            options: generateRandomOptions(letter, letters),
            correct: letter
        };
    });
}

function generateWordData() {
    // List of two-letter words
    const two_threeLetterWords = ["AA","AB","AD","AE","AG","AH","AI","AL","AM","AN","AR","AS","AT","AW","AX","AY","BA","BE","BI","BO","BY","CH","DA","DE","DI","DO","EA","ED","EE","EF","EH","EL","EM","EN","ER","ES","ET","EX","FA","FE","FY","GI","GO","GU","HA","HE","HI","HM","HO","ID","IF","IN","IO","IS","IT","JA","JO","KA","KI","KO","KY","LA","LI","LO","MA","ME","MI","MM","MO","MU","MY","NA","NE","NO","NU","NY","OB","OD","OE","OF","OH","OI","OM","ON","OO","OP","OR","OS","OU","OW","OX","OY","PA","PE","PI","PO","QI","RE","SH","SI","SO","ST","TA","TE","TI","TO","UG","UH","UM","UN","UP","UR","US","UT","WE","WO","XI","XU","YA","YE","YO","YU","ZA","ZO","AAH","AAL","AAS","ABA","ABB","ABO","ABS","ABY","ACE","ACH","ACT","ADD","ADO","ADS","ADZ","AFF","AFT","AGA","AGE","AGO","AGS","AHA","AHI","AHS","AIA","AID","AIL","AIM","AIN","AIR","AIS","AIT","AKA","AKE","ALA","ALB","ALE","ALF","ALL","ALP","ALS","ALT","AMA","AMI","AMP","AMU","ANA","AND","ANE","ANI","ANN","ANT","ANY","APE","APO","APP","APT","ARB","ARC","ARD","ARE","ARF","ARK","ARM","ARS","ART","ARY","ASH","ASK","ASP","ASS","ATE","ATT","AUA","AUE","AUF","AUK","AVA","AVE","AVO","AWA","AWE","AWL","AWN","AXE","AYE","AYS","AYU","AZO","BAA","BAC","BAD","BAG","BAH","BAL","BAM","BAN","BAP","BAR","BAS","BAT","BAY","BED","BEE","BEG","BEL","BEN","BES","BET","BEY","BEZ","BIB","BID","BIG","BIN","BIO","BIS","BIT","BIZ","BOA","BOB","BOD","BOG","BOH","BOI","BOK","BON","BOO","BOP","BOR","BOS","BOT","BOW","BOX","BOY","BRA","BRO","BRR","BRU","BUB","BUD","BUG","BUM","BUN","BUR","BUS","BUT","BUY","BYE","BYS","CAA","CAB","CAD","CAG","CAM","CAN","CAP","CAR","CAT","CAW","CAY","CAZ","CEE","CEL","CEP","CHA","CHE","CHI","CID","CIG","CIS","CIT","CLY","COB","COD","COG","COL","CON","COO","COP","COR","COS","COT","COW","COX","COY","COZ","CRU","CRY","CUB","CUD","CUE","CUM","CUP","CUR","CUT","CUZ","CWM","DAB","DAD","DAE","DAG","DAH","DAK","DAL","DAM","DAN","DAP","DAS","DAW","DAY","DEB","DEE","DEF","DEG","DEI","DEL","DEN","DEV","DEW","DEX","DEY","DIB","DID","DIE","DIF","DIG","DIM","DIN","DIP","DIS","DIT","DIV","DOB","DOC","DOD","DOE","DOF","DOG","DOH","DOL","DOM","DON","DOO","DOP","DOR","DOS","DOT","DOW","DOY","DRY","DSO","DUB","DUD","DUE","DUG","DUH","DUI","DUN","DUO","DUP","DUX","DYE","DZO","EAN","EAR","EAS","EAT","EAU","EBB","ECH","ECO","ECU","EDH","EDS","EEK","EEL","EEN","EFF","EFS","EFT","EGG","EGO","EHS","EIK","EKE","ELD","ELF","ELK","ELL","ELM","ELS","ELT","EME","EMO","EMS","EMU","END","ENE","ENG","ENS","EON","ERA","ERE","ERF","ERG","ERK","ERN","ERR","ERS","ESS","EST","ETA","ETH","EUK","EVE","EVO","EWE","EWK","EWT","EXO","EYE","FAA","FAB","FAD","FAE","FAG","FAH","FAN","FAP","FAR","FAS","FAT","FAW","FAX","FAY","FED","FEE","FEG","FEH","FEM","FEN","FER","FES","FET","FEU","FEW","FEY","FEZ","FIB","FID","FIE","FIG","FIL","FIN","FIR","FIT","FIX","FIZ","FLU","FLY","FOB","FOE","FOG","FOH","FON","FOP","FOR","FOU","FOX","FOY","FRA","FRO","FRY","FUB","FUD","FUG","FUM","FUN","FUR","GAB","GAD","GAE","GAG","GAL","GAM","GAN","GAP","GAR","GAS","GAT","GAU","GAY","GED","GEE","GEL","GEM","GEN","GEO","GET","GEY","GHI","GIB","GID","GIE","GIF","GIG","GIN","GIO","GIP","GIS","GIT","GJU","GNU","GOA","GOB","GOD","GOE","GON","GOO","GOR","GOS","GOT","GOV","GOX","GOY","GUB","GUE","GUL","GUM","GUN","GUP","GUR","GUS","GUT","GUV","GUY","GYM","GYP","HAD","HAE","HAG","HAH","HAJ","HAM","HAN","HAO","HAP","HAS","HAT","HAW","HAY","HEH","HEM","HEN","HEP","HER","HES","HET","HEW","HEX","HEY","HIC","HID","HIE","HIM","HIN","HIP","HIS","HIT","HMM","HOA","HOB","HOC","HOD","HOE","HOG","HOH","HOI","HOM","HON","HOO","HOP","HOS","HOT","HOW","HOX","HOY","HUB","HUE","HUG","HUH","HUI","HUM","HUN","HUP","HUT","HYE","HYP","ICE","ICH","ICK","ICY","IDE","IDS","IFF","IFS","IGG","ILK","ILL","IMP","INK","INN","INS","ION","IOS","IRE","IRK","ISH","ISM","ISO","ITA","ITS","IVY","IWI","JAB","JAG","JAI","JAK","JAM","JAP","JAR","JAW","JAY","JEE","JET","JEU","JEW","JIB","JIG","JIN","JIZ","JOB","JOE","JOG","JOL","JOR","JOT","JOW","JOY","JUD","JUG","JUN","JUS","JUT","KAB","KAE","KAF","KAI","KAK","KAM","KAS","KAT","KAW","KAY","KEA","KEB","KED","KEF","KEG","KEN","KEP","KET","KEX","KEY","KHI","KID","KIF","KIN","KIP","KIR","KIS","KIT","KOA","KOB","KOI","KON","KOP","KOR","KOS","KOW","KUE","KYE","KYU","LAB","LAC","LAD","LAG","LAH","LAM","LAP","LAR","LAS","LAT","LAV","LAW","LAX","LAY","LEA","LED","LEE","LEG","LEI","LEK","LEP","LES","LET","LEU","LEV","LEW","LEX","LEY","LEZ","LIB","LID","LIE","LIG","LIN","LIP","LIS","LIT","LOB","LOD","LOG","LOO","LOP","LOR","LOS","LOT","LOU","LOW","LOX","LOY","LUD","LUG","LUM","LUR","LUV","LUX","LUZ","LYE","LYM","MAA","MAC","MAD","MAE","MAG","MAK","MAL","MAM","MAN","MAP","MAR","MAS","MAT","MAW","MAX","MAY","MED","MEE","MEG","MEL","MEM","MEN","MES","MET","MEU","MEW","MHO","MIB","MIC","MID","MIG","MIL","MIM","MIR","MIS","MIX","MIZ","MNA","MOA","MOB","MOC","MOD","MOE","MOG","MOI","MOL","MOM","MON","MOO","MOP","MOR","MOS","MOT","MOU","MOW","MOY","MOZ","MUD","MUG","MUM","MUN","MUS","MUT","MUX","MYC","NAB","NAE","NAG","NAH","NAM","NAN","NAP","NAS","NAT","NAW","NAY","NEB","NED","NEE","NEF","NEG","NEK","NEP","NET","NEW","NIB","NID","NIE","NIL","NIM","NIP","NIS","NIT","NIX","NOB","NOD","NOG","NOH","NOM","NON","NOO","NOR","NOS","NOT","NOW","NOX","NOY","NTH","NUB","NUN","NUR","NUS","NUT","NYE","NYS","OAF","OAK","OAR","OAT","OBA","OBE","OBI","OBO","OBS","OCA","OCH","ODA","ODD","ODE","ODS","OES","OFF","OFT","OHM","OHO","OHS","OIK","OIL","OKA","OKE","OLD","OLE","OLM","OMS","ONE","ONO","ONS","ONY","OOF","OOH","OOM","OON","OOP","OOR","OOS","OOT","OPE","OPS","OPT","ORA","ORB","ORC","ORD","ORE","ORF","ORS","ORT","OSE","OUD","OUK","OUP","OUR","OUS","OUT","OVA","OWE","OWL","OWN","OWT","OXO","OXY","OYE","OYS","PAC","PAD","PAH","PAL","PAM","PAN","PAP","PAR","PAS","PAT","PAV","PAW","PAX","PAY","PEA","PEC","PED","PEE","PEG","PEH","PEN","PEP","PER","PES","PET","PEW","PHI","PHO","PHT","PIA","PIC","PIE","PIG","PIN","PIP","PIR","PIS","PIT","PIU","PIX","PLU","PLY","POA","POD","POH","POI","POL","POM","POO","POP","POS","POT","POW","POX","POZ","PRE","PRO","PRY","PSI","PST","PUB","PUD","PUG","PUH","PUL","PUN","PUP","PUR","PUS","PUT","PUY","PYA","PYE","PYX","QAT","QIS","QUA","RAD","RAG","RAH","RAI","RAJ","RAM","RAN","RAP","RAS","RAT","RAW","RAX","RAY","REB","REC","RED","REE","REF","REG","REH","REI","REM","REN","REO","REP","RES","RET","REV","REW","REX","REZ","RHO","RHY","RIA","RIB","RID","RIF","RIG","RIM","RIN","RIP","RIT","RIZ","ROB","ROC","ROD","ROE","ROK","ROM","ROO","ROT","ROW","RUB","RUC","RUD","RUE","RUG","RUM","RUN","RUT","RYA","RYE","SAB","SAC","SAD","SAE","SAG","SAI","SAL","SAM","SAN","SAP","SAR","SAT","SAU","SAV","SAW","SAX","SAY","SAZ","SEA","SEC","SED","SEE","SEG","SEI","SEL","SEN","SER","SET","SEW","SEX","SEY","SEZ","SHA","SHE","SHH","SHY","SIB","SIC","SIF","SIK","SIM","SIN","SIP","SIR","SIS","SIT","SIX","SKA","SKI","SKY","SLY","SMA","SNY","SOB","SOC","SOD","SOG","SOH","SOL","SOM","SON","SOP","SOS","SOT","SOU","SOV","SOW","SOX","SOY","SPA","SPY","SRI","STY","SUB","SUD","SUE","SUI","SUK","SUM","SUN","SUP","SUQ","SUR","SUS","SWY","SYE","SYN","TAB","TAD","TAE","TAG","TAI","TAJ","TAK","TAM","TAN","TAO","TAP","TAR","TAS","TAT","TAU","TAV","TAW","TAX","TAY","TEA","TEC","TED","TEE","TEF","TEG","TEL","TEN","TES","TET","TEW","TEX","THE","THO","THY","TIC","TID","TIE","TIG","TIL","TIN","TIP","TIS","TIT","TIX","TOC","TOD","TOE","TOG","TOM","TON","TOO","TOP","TOR","TOT","TOW","TOY","TRY","TSK","TUB","TUG","TUI","TUM","TUN","TUP","TUT","TUX","TWA","TWO","TWP","TYE","TYG","UDO","UDS","UEY","UFO","UGH","UGS","UKE","ULE","ULU","UMM","UMP","UMU","UNI","UNS","UPO","UPS","URB","URD","URE","URN","URP","USE","UTA","UTE","UTS","UTU","UVA","VAC","VAE","VAG","VAN","VAR","VAS","VAT","VAU","VAV","VAW","VEE","VEG","VET","VEX","VIA","VID","VIE","VIG","VIM","VIN","VIS","VLY","VOE","VOL","VOR","VOW","VOX","VUG","VUM","WAB","WAD","WAE","WAG","WAI","WAN","WAP","WAR","WAS","WAT","WAW","WAX","WAY","WEB","WED","WEE","WEM","WEN","WET","WEX","WEY","WHA","WHO","WHY","WIG","WIN","WIS","WIT","WIZ","WOE","WOF","WOG","WOK","WON","WOO","WOP","WOS","WOT","WOW","WOX","WRY","WUD","WUS","WYE","WYN","XIS","YAD","YAE","YAG","YAH","YAK","YAM","YAP","YAR","YAW","YAY","YEA","YEH","YEN","YEP","YES","YET","YEW","YEX","YGO","YID","YIN","YIP","YOB","YOD","YOK","YOM","YON","YOS","YOU","YOW","YUG","YUK","YUM","YUP","YUS","ZAG","ZAP","ZAS","ZAX","ZEA","ZED","ZEE","ZEK","ZEL","ZEP","ZEX","ZHO","ZIG","ZIN","ZIP","ZIT","ZIZ","ZOA","ZOL","ZOO","ZOS","ZUZ","ZZZ"];

    // Generate 10 rounds of data
    let rounds = [];
    for (let i = 0; i < 10; i++) {
        // Randomly select a word from the list
        const word = two_threeLetterWords[Math.floor(Math.random() * two_threeLetterWords.length)];
        rounds.push({
            content: word,
            question: "Which word is shown?",
            options: generateRandomWordOptions(word, two_threeLetterWords, 2), // Word length is 2
            correct: word
        });
    }
    return rounds;
}

function generateRandomWordOptions(correct, words) {
    let options = new Set([correct]);
    while (options.size < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        options.add(randomWord);
    }
    return Array.from(options);
}


function generateRandomOptions(correct, letters) {
    let options = new Set([correct]);
    while (options.size < 4) {
        options.add(letters[Math.floor(Math.random() * letters.length)]);
    }
    return Array.from(options);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createWordButtons(question) {
    const wordOptionsContainer = document.getElementById('word-options');
    wordOptionsContainer.innerHTML = '';
    shuffleArray(question.options);

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

    // Select a random color for this invocation
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const buttonColor = colors[randomColorIndex];

    // Calculate the total number of letters in all options
    const totalLetters = question.options.reduce((total, option) => total + option.length, 0);

    // Adjust font size based on the total number of letters
    let buttonFontSize = '30px'; // Default font size
    if (totalLetters > 24 && totalLetters < 34) {
        buttonFontSize = '26px'; // Smaller font size for more letters
    }
    if (totalLetters > 33) {
        buttonFontSize = '22px'; // Smaller font size for more letters
    }
    // Further adjustments can be made based on different thresholds if needed

    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.style.fontFamily = document.getElementById('font-selector').value;
        button.style.backgroundColor = buttonColor; // Use the selected color
        button.style.color = 'white';
        button.style.fontSize = buttonFontSize;

        button.addEventListener('click', () => handleWordSelection(option, question.correct));
        wordOptionsContainer.appendChild(button);
    });
}



function updateDisplay(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message || '&nbsp;'; // Replace an empty message with a non-breaking space
    document.getElementById('score').innerText = 'Score: ' + score;
    document.getElementById('mistakes').innerText = 'Mistakes: ' + mistakes;
}

function clearMessage() {
    const messageElement = document.getElementById('message');
    if (messageElement.innerHTML === 'Correct!') {
        messageElement.innerHTML = '&nbsp;'; // Replace the "Correct!" message with a non-breaking space
    }
}

function handleWordSelection(selectedOption, correctAnswer) {
    const currentQuestion = gameData[currentDifficulty][currentLevel][currentQuestionIndex];

    if (selectedOption === correctAnswer) {
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
                displayContentForLimitedDuration(gameData[currentDifficulty][currentLevel][currentQuestionIndex]);
            }, 500);
        }
    } else {
        gameContainer.classList.add('flash-red');
        setTimeout(() => gameContainer.classList.remove('flash-red'), 500);
        mistakes++;
        updateDisplay('Not quite...');

        // Google Analytics Event for a Mistake
        gtag('event', 'make_mistake', {
            'event_category': 'Game Actions',
            'event_label': `Mistake Made - Difficulty: ${currentDifficulty}, Level: ${currentLevel}, Question: ${currentQuestionIndex}`
        });
    }
}


function startLevel(difficulty, level) {
    currentDifficulty = difficulty;
    currentLevel = String(level);
    currentQuestionIndex = 0;
    score = 0;
    mistakes = 0;

    if (!gameData[currentDifficulty] || !gameData[currentDifficulty][currentLevel]) {
        console.error('Invalid difficulty or level');
        return;
    }

    displayContentForLimitedDuration(gameData[currentDifficulty][currentLevel][currentQuestionIndex]);
    createWordButtons(gameData[currentDifficulty][currentLevel][currentQuestionIndex]);
    updateDisplay('');
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('instructions-button').style.display = 'none';

    // Analytics event (if used)
    gtag('event', 'start_game', {
        'event_category': 'Game Actions',
        'event_label': `Game Started - Difficulty: ${difficulty}, Level: ${level}`
    });
}


document.addEventListener('DOMContentLoaded', () => {
    populateDifficulties();
    // Assume "Single words" as the default difficulty to populate levels
    populateLevels("Single words"); 
    populateSpeeds();


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

    // Speed selector logic
    const speedSelector = document.getElementById('speed-selector');
    speedSelector.addEventListener('change', function() {
        currentSpeed = displaySpeeds[this.value]; // Update the current speed
        // Directly update the display speed for the content
    });

});


function displayContentForLimitedDuration(question) {
    const flashArea = document.getElementById('flash-area');
    const gameElements = document.querySelectorAll('#game-container > *:not(#flash-area)');

    // Hide all elements except the flash area
    gameElements.forEach(element => element.classList.add('hidden-but-occupy-space'));

    // Introduce a delay before showing the flash content
    setTimeout(() => {
        flashArea.textContent = question.content;
        flashArea.classList.add('flash-show');

        // After displaying the content for the specified time, hide it and proceed
        setTimeout(() => {
            // Clear flash area and show all game elements
            flashArea.textContent = '';
            flashArea.classList.remove('flash-show');

            // Introduce an additional 0.5-second pause after hiding the content
            setTimeout(() => {
                gameElements.forEach(element => element.classList.remove('hidden-but-occupy-space'));

                // Show question and options
                updateDisplay(question.question); // Display the question
                createWordButtons(question); // Display the word options
            }, 500); // Additional 0.5-second pause

        }, currentSpeed); // Duration for displaying the content

    }, 500); // 0.5-second delay before showing the flash content
}



function populateLevels(difficulty) {
    const levelSelect = document.getElementById('level-select');
    levelSelect.innerHTML = '';

    const levels = gameData[difficulty];
    Object.keys(levels).forEach(level => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = 'Level ' + level;
        levelSelect.appendChild(option);
    });

    levelSelect.value = "1"; // Default to Level 1
}


function populateSpeeds() {
    const speedSelector = document.getElementById('speed-selector');
    speedSelector.innerHTML = '';

    Object.keys(displaySpeeds).forEach(speed => {
        const option = document.createElement('option');
        option.value = speed; // Set the option value to the speed level (e.g., "Level 1")
        option.textContent = speed;
        speedSelector.appendChild(option);
    });

    // Set the default value of the speed selector to "Level 1"
    speedSelector.value = "Level 1";
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
        const titleElement = document.querySelector('#game-container h1');

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
