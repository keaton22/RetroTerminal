//function setColor(name, value) {
    //document.querySelector("body").className = name;
    //document.querySelector("body").style.color = value;
    //document.querySelector("body").style.backgroundColor = value;
    //document.querySelector(".welcome").style.borderBottomColor = value;
    //document.querySelector(".menu .item.selected").style.backgroundColor = value;

    //document.querySelectorAll("li").style.color = value;

    //localStorage.setItem("colorName", name);
    //localStorage.setItem("colorValue", value);
    //console.log('%ccolor set to ' + name + " (" + value + ")", "color: " + value + "; background-image: linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.8) 100%); background-color: " + value + "; padding: 2px;");
    //document.documentElement.style.setProperty('--color', color);
//}

function setColor(name, value) {
    document.body.className += " color-" + name;
    document.querySelector('STYLE').innerHTML = '<style>html{}body{color:' + value + ' !important;background-color:' + value + ';}.welcome{border-bottom-color:' + value + ';}.menu .item.selected{background-color:' + value + ';}</style>';
    localStorage.setItem("colorName", name);
    localStorage.setItem("colorValue", value);
    console.groupEnd();
    console.log('%ccolor set to ' + name + " (" + value + ")", "color: " + value + "; background-image: linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.8) 100%); background-color: " + value + "; padding: 2px;");
}

function setDifficulty(value) {
    localStorage.setItem("difficulty", value);
    console.log('difficulty set to ' + value)
}

function setResult(status) {
    document.querySelector(".result .status").innerHTML = status;
    window.setTimeout(function () {
        clearResult();
    }, 5000);
}

function clearResult() {
    document.querySelector(".result .status").innerHTML = "";
}

function menuItemSelected(elem) {       // a menu item has been pressed (via enter key)/clicked on
    var action = elem.getAttribute("data-action") || "";
    var name = elem.getAttribute("data-name") || "";
    var value = elem.getAttribute("data-value") || "";

    if (action !== "") {        // if the items selected has an action

        switch (action) {
            case "playFallout":
            case "resetMinigame":
            case "exitToDesktop":
            case "reboot":
            case "shutdown":
                ajax("php/actions.php?action=" + action, "GET", function (response) {});
                break;
            case "setColor":
                setColor(name, value);
                break;
            case "setDifficulty":
                setDifficulty(value);
                break;
        }
    }

    setResult(elem.getAttribute("data-result"));
}
