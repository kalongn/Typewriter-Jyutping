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
            currentTheme.alt = "Dark Mode";
        }, 150);

    } else {
        setTimeout(function () {
            currentTheme.src = "../Img/sun_icon.png";
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