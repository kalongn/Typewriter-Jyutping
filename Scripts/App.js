window.addEventListener("load", function () {
    let loader = document.getElementById("loading-screen-wrapper");
    let mainpage = document.getElementById("main-page-wrapper");
    console.log(loader.classList);
    loader.classList.toggle("fade");
    setTimeout(function () { loader.remove(); mainpage.style.display = "grid"; }, 800);
})

let webpageTheme;
const currentTheme = document.getElementById("themes");

function startWeb() {
    webpageTheme = true;
}

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
const hotkey = ['ShiftLeft', 'KeyR'];
const keysPressed = new Set();

function restartButtonFunction() {
    console.log("It works");
}

document.addEventListener('keydown', event => {
    keysPressed.add(event.code);
    if (event.code === 'ShiftLeft') {
        restartButton.classList.add('selected');
        document.addEventListener('keyup', event => {
            if (event.code === 'ShiftLeft') {
                restartButton.classList.remove('selected');
            }
        });
    }
    for (const key of hotkey) {
        if (!keysPressed.has(key)) {
            return;
        }
    }
    restartButton.click();
    restartButton.classList.remove('selected');
});
document.addEventListener('keyup', event => {
    keysPressed.delete(event.code);
});

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
    let allDurations;
    switch (measure) {
        case 1:
            allDurations = ['time-option-1', 'time-option-2', 'time-option-3', 'time-option-4'];
            break;
        default:
            allDurations = ['words-option-1', 'words-option-2', 'words-option-3', 'words-option-4'];
            break;
    }
    const currentDurations = document.getElementById(id);
    if (currentDurations.classList.contains('selected')) {
        return;
    }
    allDurations.forEach(function (x) {
        if (document.getElementById(x).classList.contains('selected')) {
            document.getElementById(x).classList.toggle('selected');
        }
        if (x === id) {
            document.getElementById(x).classList.toggle('selected');
        }
    })
}

function replyonClickID(id) {
    return id;
}