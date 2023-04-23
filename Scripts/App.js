/**
 * set alias to The other JS which contains the actual JSON variable.
 */
const Characters = AllDatas;

/**
 * typing answer
 */
let correctinputKey;

/**
 * This function will be call when loading the webpage.
 */
function startWeb() {
    webpageTheme = true;
    measure = 1;
    timeMeasureDuration = 15;
    wordsMeasureDuration = 10;
    initialStatus = true;
    vowelStatus = true;
    toneStatus = true;
    correctinputKey = [];
}

//This is an event listener to detect whether the pages is fully loaded yet.
window.addEventListener("load", function () {
    let loader = document.getElementById("loading-screen-wrapper");
    let mainpage = document.getElementById("main-page-wrapper");
    loader.classList.toggle("fade");
    setTimeout(function () { loader.remove(); mainpage.style.display = "grid"; }, 800);
})

//Theme of the webpages
let webpageTheme; // true -> light mode, false -> dark mode.
const currentTheme = document.getElementById("themes"); //the icon to indicate which mode the user is in.

/**
 * Switches the theme of the website, current code only include the animations and icon changes.
 */
function switchThemes() {
    currentTheme.classList.toggle("swap");
    if (webpageTheme) {
        setTimeout(function () {
            currentTheme.src = "../Img/moon_icon.png";
            currentTheme.srcset = "../Img/moon_icon.svg";
            currentTheme.alt = "Dark Mode";
        }, 150);

    } else {
        setTimeout(function () {
            currentTheme.src = "../Img/sun_icon.png";
            currentTheme.srcset = "../Img/sun_icon.svg";
            currentTheme.alt = "Light Mode";
        }, 150);
    }
    setTimeout(function () {
        currentTheme.classList.remove("swap");
    }, 300);
    webpageTheme = !webpageTheme;
}

//Restart button items
const restartButton = document.getElementById("restart-test-button");

/**
 * To be implemented restartButton Functions, should be call once actiavted by keybind or clicked.
 */
function restartButtonFunction() { }

/**
 * Listen for a keydown and keyup events for the Keybind.
 * The keybind being Shift + R. 
 * If Shift is pressed, the button will gain a selected class.
 * If Shift is letgo, the button will remove the selected class.
 * If Shift + R is both pressed at the same time, the button will activate the restartButtonFunciton.
 * 
 * @param {*} event 
 *      Any events is being listented.
 */
function restartTestEvent(event) {
    if (event.key === 'R' && event.shiftKey && event.type == 'keydown') {
        restartButton.classList.remove('selected');
        generateText();
    } else if (event.key === 'Shift' && event.type === 'keyup') {
        restartButton.classList.remove('selected');
    } else if (event.key === 'Shift' && event.type === 'keydown') {
        restartButton.classList.add('selected');
    }
}
//the event listner being added.
document.addEventListener('keydown', restartTestEvent);
document.addEventListener('keyup', restartTestEvent);

let initialStatus, vowelStatus, toneStatus; //True = on, False = off
/**
 * When a button is clicked, the difficulties, it will selected or unselected. This is just here for CSS.
 * The later functionality will be added soon.
 * @param {*} id 
 *      The id of the html elements.
 */
function selectDifficulties(id) {
    const difficulties = document.getElementById(id);
    switch (id) {
        case 'initial':
            initialStatus = !initialStatus;
            break;
        case 'vowel':
            vowelStatus = !vowelStatus;
            break;
        default:
            toneStatus = !toneStatus;
            break;
    }
    generateText();
    difficulties.classList.toggle('selected');
}

let measure; //the measure that the user selected. 1: timer or 2: words
let timeMeasureDuration; //the duration of the time selected;
let wordsMeasureDuration; //the duration of the words selected;
/**
 * Alter between Words/Timer options, this is only the css implementation. 
 * The later functionality will be added soon.
 * @param {*} id 
 *      the id of the html elements.
 * @returns 
 *      Terminate method if the measures if already selected.
 */
function selectMeasures(id) {
    const measures = document.getElementById(id);
    if (measures.classList.contains('selected')) {
        return;
    }
    let otherMeasures;
    if (id === 'words') {
        measure = 2;
        otherMeasures = document.getElementById('timer')
        document.getElementById('words-options').style.display = 'flex';
        document.getElementById('timer-options').style.display = 'none';
    } else {
        measure = 1;
        otherMeasures = document.getElementById('words')
        document.getElementById('timer-options').style.display = 'flex';
        document.getElementById('words-options').style.display = 'none';
    }
    measures.classList.toggle('selected');
    otherMeasures.classList.toggle('selected');
    generateText();
}

/**
 * Select the Durations given the measure. CSS implementation only atm.
 * The later functionality will be added soon.
 * @param {*} measure 
 *      1: Timer
 *      2: Words
 * @param {*} id 
 *      the options-id.
 * @returns 
 *      Terminate method if the measures if already selected.
 */
function selectDurations(measure, id) {
    let allDurationsIDs, durations;
    switch (measure) {
        case 1:
            allDurationsIDs = ['time-option-1', 'time-option-2', 'time-option-3', 'time-option-4'];
            durations = [15, 30, 60, 120];
            break;
        default:
            allDurationsIDs = ['words-option-1', 'words-option-2', 'words-option-3', 'words-option-4'];
            durations = [10, 30, 50, 100];
            break;
    }
    const currentDurations = document.getElementById(id);
    const durationDisplay = document.getElementById('duration-counter');
    if (currentDurations.classList.contains('selected')) {
        return;
    }
    allDurationsIDs.forEach(function (x) {
        if (document.getElementById(x).classList.contains('selected')) {
            document.getElementById(x).classList.toggle('selected');
        }
        if (x === id) {
            document.getElementById(x).classList.toggle('selected');
            switch (measure) {
                case 1:
                    timeMeasureDuration = durations[allDurationsIDs.indexOf(x)];
                    break;
                default:
                    wordsMeasureDuration = durations[allDurationsIDs.indexOf(x)];
                    break;
            }
            durationDisplay.innerHTML = durations[allDurationsIDs.indexOf(x)];
        }
    })
    generateText();
}

const lineHTML = document.getElementById('line');

function generateText() {
    lineHTML.innerHTML = '';
    correctinputKey = [];
    switch (measure) {
        case 1:
            break;
        default:
            for (var i = 0; i < wordsMeasureDuration; i++) {
                const randomIndex = Math.floor(Math.random() * Characters.Characters.length);
                const wrapperDiv = document.createElement('div');
                wrapperDiv.className = 'characters-wrapper';
                lineHTML.appendChild(wrapperDiv);
                const pronouciationDiv = document.createElement('div');
                pronouciationDiv.className = 'character-pronouciation';
                wrapperDiv.appendChild(pronouciationDiv);
                let pronouciationAssist = '';
                if (initialStatus) {
                    pronouciationAssist += Characters.Characters[randomIndex]['Initial'];
                    Characters.Characters[randomIndex]['Initial'].split('').forEach(i => correctinputKey.push(i));
                }
                if (vowelStatus) {
                    pronouciationAssist += Characters.Characters[randomIndex]['Vowel'];
                    Characters.Characters[randomIndex]['Vowel'].split('').forEach(i => correctinputKey.push(i));
                }
                if (toneStatus) {
                    pronouciationAssist += Characters.Characters[randomIndex]['Tone'];
                    Characters.Characters[randomIndex]['Tone'].toString().split('').forEach(i => correctinputKey.push(i));
                }
                pronouciationDiv.innerHTML = '' + pronouciationAssist;
                const characterDiv = document.createElement('div');
                characterDiv.className = 'character';
                wrapperDiv.appendChild(characterDiv);
                characterDiv.textContent = '' + Characters.Characters[randomIndex]['Characters'];
                correctinputKey.push("");
            }
            break;
    }
}

function startGame() {

}

const typeDetectionZone = document.getElementById('typing-detection-zone');

typeDetectionZone.addEventListener('keyup', typing => {
    console.log(typing.key);
});

startGame();