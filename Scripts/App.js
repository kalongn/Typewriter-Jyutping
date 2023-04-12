function startWeb() {
    webpageTheme = true;
}

window.addEventListener("load", function () {
    let loader = document.getElementById("loading-screen-wrapper");
    let mainpage = document.getElementById("main-page-wrapper");
    console.log(loader.classList);
    loader.classList.toggle("fade");
    setTimeout(function () { loader.remove(); mainpage.style.display = "grid"; }, 800);
})

let webpageTheme;
const currentTheme = document.getElementById("themes");

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
    return false;
}

const restartButton = document.getElementById("restart-test-button");

function restartButtonFunction() { }

function restartTestEvent(event) {
    if (event.key === 'R' && event.shiftKey && event.type == 'keydown' || event.key === 'Shift' && event.type === 'keyup') {
        restartButton.classList.remove('selected');
    } else if (event.key === 'Shift' && event.type === 'keydown') {
        restartButton.classList.add('selected');
    }
}
document.addEventListener('keydown', restartTestEvent);
document.addEventListener('keyup', restartTestEvent);

function selectDifficulties(id) {
    const difficulties = document.getElementById(id);
    difficulties.classList.toggle('selected');
}

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