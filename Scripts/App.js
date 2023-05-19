'use strict';
/**
 * set alias to The other JS which contains the actual JSON variable.
 */
const Characters = AllDatas;

/**
 * typing answer
 */
let correctinputKey, indexOfCorrectinputKey, currentCharacterInputKey;

let topMost;

let mistakesCount, currentCharacterIndex, amountOfCorrectWords, amountOfKeyStrokes;

window.timer = null;
window.gameStarted = null;
/**
 * This function will be call when loading the webpage.
 */
function startWeb() {
    webpageTheme = true;
    if(localStorage.getItem('isDarkMode') == 1 ) {
        switchThemes();
    }
    measure = 1;
    timeMeasureDuration = 15;
    wordsMeasureDuration = 10;
    initialStatus = true;
    vowelStatus = true;
    toneStatus = true;
    correctinputKey = [];
    currentCharacterInputKey = [];
    indexOfCorrectinputKey = 0;
    topMost = 0;
    mistakesCount = 0;
    currentCharacterIndex = 0;
    amountOfCorrectWords = 0;
    amountOfKeyStrokes = 0;
    startGame();
}

//This is an event listener to detect whether the pages is fully loaded yet.
window.addEventListener("load", function () {
    let loader = document.getElementById("loading-screen-wrapper");
    let mainpage = document.getElementById("main-page-wrapper");
    toggleClass(loader, "fade");
    setTimeout(function () { loader.remove(); mainpage.style.display = "grid"; }, 800);
})

/**
 * Add a class to an element.
 * @param {*} el 
 *      the html element selected.
 * @param {*} name 
 *      the name of the class to be added.
 */
function addClass(el, name) {
    el.classList.add(name);
}

/**
 * Toggle a class to an element.
 * @param {*} el 
 *      the html element selected.
 * @param {*} name 
 *      the name of the class to be toggled.
 */
function toggleClass(el, name) {
    el.classList.toggle(name);
}

/**
 * Remove a class from an element.
 * @param {*} el 
 *      the html element selected.
 * @param {*} name 
 *      the name of the class to be added.
 */
function removeClass(el, name) {
    el.classList.remove(name);
}

//Theme of the webpages
let webpageTheme; // true -> light mode, false -> dark mode.
const currentTheme = document.getElementById("themes"); //the icon to indicate which mode the user is in.
const body = document.body;
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
            addClass(body, 'dark');
            localStorage.setItem('isDarkMode', 1);
        }, 150);

    } else {
        setTimeout(function () {
            currentTheme.src = "../Img/sun_icon.png";
            currentTheme.srcset = "../Img/sun_icon.svg";
            currentTheme.alt = "Light Mode";
            removeClass(body, 'dark');
            localStorage.setItem('isDarkMode', 0);
        }, 150);
    }
    setTimeout(function () {
        removeClass(currentTheme, 'swap');
    }, 300);
    webpageTheme = !webpageTheme;
}

//Restart button items
const restartButton = document.getElementById("restart-test-button");

/**
 * To be implemented restartButton Functions, should be call once actiavted by keybind or clicked.
 */
function restartButtonFunction() {
    clearInterval(window.timer);
    startGame();
}

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
    toggleClass(difficulties, 'selected');
}

let measure; //the measure that the user selected. 1: timer or 2: words
let timeMeasureDuration; //the duration of the time selected;
let wordsMeasureDuration; //the duration of the words selected;
const durationDisplay = document.getElementById('duration-counter'); //duration-counter
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
        durationDisplay.innerHTML = "0 / " + wordsMeasureDuration;
    } else {
        measure = 1;
        otherMeasures = document.getElementById('words')
        document.getElementById('timer-options').style.display = 'flex';
        document.getElementById('words-options').style.display = 'none';
        durationDisplay.innerHTML = timeMeasureDuration;
    }
    toggleClass(measures, 'selected');
    toggleClass(otherMeasures, 'selected');
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
    if (currentDurations.classList.contains('selected')) {
        return;
    }
    allDurationsIDs.forEach(function (x) {
        const currentEl = document.getElementById(x);
        if (currentEl.classList.contains('selected')) {
            toggleClass(currentEl, 'selected');
        }
        if (x === id) {
            toggleClass(currentEl, 'selected');
            switch (measure) {
                case 1:
                    timeMeasureDuration = durations[allDurationsIDs.indexOf(x)];
                    durationDisplay.innerHTML = timeMeasureDuration;
                    break;
                default:
                    wordsMeasureDuration = durations[allDurationsIDs.indexOf(x)];
                    durationDisplay.innerHTML = "0 / " + wordsMeasureDuration;
                    break;
            }
        }
    })
    generateText();
}

const lineHTML = document.getElementById('line'); //the line element in HTML

/**
 * Generate the text pn the screen base on the measure value, 1 (timer option) or 2 (word options)
 * 
 */
function generateText() {
    lineHTML.innerHTML = '';
    correctinputKey = [];
    indexOfCorrectinputKey = 0;
    switch (measure) {
        case 1:
            generateTextAmount(150);
            break;
        default:
            generateTextAmount(wordsMeasureDuration);
            break;
    }
    document.getElementById('typing-detection-zone').focus();
    addClass(document.querySelector('.characters-wrapper'), 'current');
}

/**
 * Generate the amount of text from the Character.js base on the amount input (integer).
 * <div class="characters-wrapper">
 *      <div class="character-pronouciation">
 *          ji6
 *      </div>
 *      <div class="character">
 *          義
 *      </div>
 * </div>
 * @param {*} amount 
 *      input amount of character should generate.
 */
function generateTextAmount(amount) {
    for (var i = 0; i < amount; i++) {
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
        }
        if (vowelStatus) {
            pronouciationAssist += Characters.Characters[randomIndex]['Vowel'];
        }
        if (toneStatus) {
            pronouciationAssist += Characters.Characters[randomIndex]['Tone'];
        }
        Characters.Characters[randomIndex]['Initial'].split('').forEach(i => correctinputKey.push(i));
        Characters.Characters[randomIndex]['Vowel'].split('').forEach(i => correctinputKey.push(i));
        Characters.Characters[randomIndex]['Tone'].toString().split('').forEach(i => correctinputKey.push(i));
        pronouciationDiv.textContent = '' + pronouciationAssist;
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        wrapperDiv.appendChild(characterDiv);
        characterDiv.textContent = '' + Characters.Characters[randomIndex]['Characters'];
        correctinputKey.push(' ');
    }
}

const typeDetectionZone = document.getElementById('typing-detection-zone');
let remainsWord = wordsMeasureDuration;
let timePassed = 0;

//This following codes are for the typing
typeDetectionZone.addEventListener('keyup', typing => {
    if (topMost === 0) {
        topMost = lineHTML.getBoundingClientRect().top;
    }
    const key = typing.key;
    const expect = correctinputKey[indexOfCorrectinputKey];
    const currentCharacter = document.querySelector('.characters-wrapper.current');
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackSpace = key === 'Backspace';

    if (document.querySelector('.main-typing-area-wrapper.over')) {
        return;
    }

    amountOfKeyStrokes++;

    // console.log(key, expect);
    switch (measure) {
        case 1:
            if (!window.timer && isLetter) {
                window.timer = setInterval(() => {
                    if (!window.gameStarted) {
                        window.gameStarted = (new Date()).getTime();
                    }
                    const currentTime = (new Date()).getTime();
                    const msPassed = currentTime - window.gameStarted;
                    const sPassed = Math.round(msPassed / 1000);
                    const sLeft = timeMeasureDuration - sPassed;
                    durationDisplay.innerHTML = sLeft;
                    if (sLeft <= 0) {
                        gameOver();
                    }
                }, 1000)
            }
            break;
        default:
            if (!window.timer && isLetter) {
                window.timer = setInterval(() => {
                    if (!window.gameStarted) {
                        window.gameStarted = (new Date()).getTime();
                    }
                    if (remainsWord <= 0) {
                        const currentTime = (new Date()).getTime();
                        const msPassed = currentTime - window.gameStarted;
                        timePassed = Math.round(msPassed / 1000);
                        gameOver();
                    }
                    durationDisplay.innerHTML = "" + (wordsMeasureDuration - remainsWord) + " / " + wordsMeasureDuration;
                }, 1000)
            }
            break;
    }

    //Ignored invalid input
    if (!isLetter && !isSpace && !isBackSpace) {
        return;
    }

    //letters
    if (isLetter) {
        if (key !== expect) {
            addClass(currentCharacter, 'incorrect');
            mistakesCount++;
        } else {
            indexOfCorrectinputKey++;
        }
        currentCharacterInputKey.push(key);
    }

    //handling spaces
    if (isSpace) {
        if (indexOfCorrectinputKey === 0) {
            return;
        }
        if (expect === ' ' && !currentCharacter.classList.contains('incorrect')) {
            addClass(currentCharacter, 'correct');
            amountOfCorrectWords++;
        } else {
            addClass(currentCharacter, 'incorrect');
            while (correctinputKey[indexOfCorrectinputKey] !== ' ') {
                indexOfCorrectinputKey++;
            }
            mistakesCount++;
        }
        currentCharacterInputKey = [];
        removeClass(currentCharacter, 'current');
        if (currentCharacter.nextSibling !== null) {
            addClass(currentCharacter.nextSibling, 'current');
        }
        indexOfCorrectinputKey++;
        currentCharacterIndex++;
        if (measure !== 1) {
            remainsWord--;
            durationDisplay.innerHTML = "" + (wordsMeasureDuration - remainsWord) + " / " + wordsMeasureDuration;
        }
    }

    //Adjust scrolling down effect.
    if (isLetter || isSpace) {
        if (currentCharacter.getBoundingClientRect().top > topMost + 70) {
            const margin = parseInt(lineHTML.style.marginTop || '0px');
            lineHTML.style.marginTop = (margin - 71) + 'px';
        }
    }

    if (isBackSpace) {
        //if this is the first character
        if (indexOfCorrectinputKey == 0 && currentCharacterInputKey.length == 0) {
            return;
        }
        //if the character is a single character
        // Need to think about how backspacing detect the "wrong character"
        /*
            Can use like a stack implement by array.
                if detect a wrong character, stack stores the input immediately
                    backsapce pop sthe stack and decremenet the index by one 
                if the item poped == wrong character, remove current character incorrect class. 
        */
        if (!(correctinputKey[indexOfCorrectinputKey - 1] === ' ')) {
            indexOfCorrectinputKey = Math.max(0, indexOfCorrectinputKey - 1);
            if (correctinputKey[indexOfCorrectinputKey] !== currentCharacterInputKey.pop()) {
                removeClass(currentCharacter, 'incorrect');
            }
            return;
        }
        //if the previous character is correct, backspae should do nothing.
        if (currentCharacter.previousSibling.classList.contains('correct')) {
            return;
        }

        //if the previous character is wrong, this will allows to backtrack go back and delete previous character.
        indexOfCorrectinputKey--;
        removeClass(currentCharacter, 'current');
        addClass(currentCharacter.previousSibling, 'current');
        removeClass(currentCharacter.previousSibling, 'incorrect');
        while (indexOfCorrectinputKey !== 0 && correctinputKey[indexOfCorrectinputKey - 1] !== ' ') {
            indexOfCorrectinputKey--;
        }
        currentCharacterIndex--;
        if (measure !== 1) {
            remainsWord++;
            durationDisplay.innerHTML = "" + (wordsMeasureDuration - remainsWord) + " / " + wordsMeasureDuration;
        }

        //Adjust scroll backup stuff.
        const leftMost = lineHTML.getBoundingClientRect().left;
        if (currentCharacter.getBoundingClientRect().top <= topMost + 70 && leftMost + 20 >= currentCharacter.getBoundingClientRect().left) {
            const margin = parseInt(lineHTML.style.marginTop || '0px');
            if (margin >= 0) {
                return;
            }
            lineHTML.style.marginTop = (margin + 71) + 'px';
        }
    }
});

/**
 * Starts the game function.
 */
function startGame() {
    lineHTML.style.marginTop = '0px';
    window.timer = null;
    window.gameStarted = null;
    switch (measure) {
        case 1:
            durationDisplay.innerHTML = timeMeasureDuration;
            break;
        default:
            durationDisplay.innerHTML = "0" + " / " + wordsMeasureDuration
    }
    mistakesCount = 0;
    currentCharacterIndex = 0;
    amountOfCorrectWords = 0;
    amountOfKeyStrokes = 0;
    timePassed = 0;
    remainsWord = wordsMeasureDuration;
    removeClass(mainTypingArea, 'over');
    removeClass(fullTypingArea, 'disappear');
    removeClass(optionBarArea, 'disappear');
    removeClass(statArea, 'appear');
    generateText(); //this updated the lineHTML to have content.
}

const mainTypingArea = document.getElementById('main-typing-area-wrapper');
const fullTypingArea = document.getElementById('full-typing-area-wrapper');
const optionBarArea = document.getElementById('options-bar');
const statArea = document.getElementById('stat-wrapper');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');

/**
 * End the game.
 */
function gameOver() {
    clearInterval(window.timer);
    addClass(mainTypingArea, 'over');
    addClass(fullTypingArea, 'disappear');
    addClass(optionBarArea, 'disappear');
    addClass(statArea, 'appear');
    wpmDisplay.innerHTML = getWPM();
    accuracyDisplay.innerHTML = getAccuracy();
}

/**
 * 
 * @returns the correct WPM base on the user statistics and test method.
 */
function getWPM() {
    let result = 0;
    switch (measure) {
        case 1:
            result = (amountOfCorrectWords / timeMeasureDuration).toFixed(2) * 60;
            break;
        default:
            result = (amountOfCorrectWords / timePassed).toFixed(2) * 60;
            break;
    }
    return result;
}

/**
 * 
 * @returns the accuracy of user base on the amount of input and mistakes they've made.
 */
function getAccuracy() {
    return ((amountOfKeyStrokes - mistakesCount) / amountOfKeyStrokes).toFixed(2) * 100;
}

function voidButton() {
    alert("Features not yet implemented.");
    return false;
}