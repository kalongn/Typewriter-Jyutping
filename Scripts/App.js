/**
 * This function will be call when loading the webpage.
 */
function startWeb() {
    webpageTheme = true;
}

//This is an event listener to detect whether the pages is fully loaded yet.
window.addEventListener("load", function () {
    let loader = document.getElementById("loading-screen-wrapper");
    let mainpage = document.getElementById("main-page-wrapper");
    console.log(loader.classList);
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
    if (event.key === 'R' && event.shiftKey && event.type == 'keydown' || event.key === 'Shift' && event.type === 'keyup') {
        restartButton.classList.remove('selected');
    } else if (event.key === 'Shift' && event.type === 'keydown') {
        restartButton.classList.add('selected');
    }
}
//the event listner being added.
document.addEventListener('keydown', restartTestEvent);
document.addEventListener('keyup', restartTestEvent);

/**
 * When a button is clicked, the difficulties, it will selected or unselected. This is just here for CSS.
 * The later functionality will be added soon.
 * @param {*} id 
 *      The id of the html elements.
 */
function selectDifficulties(id) {
    const difficulties = document.getElementById(id);
    difficulties.classList.toggle('selected');
}

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
        otherMeasures = document.getElementById('timer')
        document.getElementById('words-options').style.display = 'flex';
        document.getElementById('timer-options').style.display = 'none';
    } else {
        otherMeasures = document.getElementById('words')
        document.getElementById('timer-options').style.display = 'flex';
        document.getElementById('words-options').style.display = 'none';
    }
    measures.classList.toggle('selected');
    otherMeasures.classList.toggle('selected');
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
        if (document.getElementById(x).classList.contains('selected')) {
            document.getElementById(x).classList.toggle('selected');
        }
        if (x === id) {
            document.getElementById(x).classList.toggle('selected');
        }
    })
}