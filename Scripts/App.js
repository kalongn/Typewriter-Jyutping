let webpageTheme;

function startWeb() {
    webpageTheme = true;
}

function switchThemes() {
    let currentTheme = document.getElementById("themes");
    if (webpageTheme) {
        currentTheme.classList.toggle("swap");
        setTimeout(function () {
            currentTheme.src = "../Img/moon_icon.png";
            currentTheme.alt = "Dark Mode";
        }, 150);
        setTimeout(function () {
            currentTheme.classList.remove("swap");
        }, 300);

    } else {
        currentTheme.classList.toggle("swap");
        setTimeout(function () {
            currentTheme.src = "../Img/sun_icon.png";
            currentTheme.alt = "Light Mode";
        }, 150);
        setTimeout(function () {
            currentTheme.classList.remove("swap");
        }, 300);
    }
    webpageTheme = !webpageTheme;
    return false;
}