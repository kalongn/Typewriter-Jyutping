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