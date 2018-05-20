/*function setColor(name, value) {
    document.querySelector("body").className = name;
    document.querySelector("body").style.color = value;
    document.querySelector("body").style.backgroundColor = value;
    document.querySelector(".welcome").style.borderBottomColor = value;
    document.querySelector(".menu .item.selected").style.backgroundColor = value;

    document.querySelectorAll("li").style.color = value;

    localStorage.setItem("colorName", name);
    localStorage.setItem("colorValue", value);
    console.log('%ccolor set to ' + name + " (" + value + ")", "color: " + value + "; background-image: linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.8) 100%); background-color: " + value + "; padding: 2px;");
    document.documentElement.style.setProperty('--color', color);
}*/

function setColor(name, value) {

    // remove all css classes from <body> that start with 'color-' and add css class for the new color being set
    var matchedColorClass = new RegExp('color-(.*)+', 'g');                 // declare regex variable for 'color-'

    for(var i = 0; i < document.body.classList.length; i++) {               // iterate through all css classes applied to the <body>
        if(matchedColorClass.test(document.body.classList[i])) {            // if the current css class starts with 'color-'
            document.body.classList.remove(document.body.classList[i]);     // remove that css class
        }
    }
    document.body.classList.add('color-' + name);               // add a 'color-' class for each currently in-use template

    document.querySelector('STYLE').innerHTML = '<style>html{}body{color:' + value + ' !important;background-color:' + value + ';}.welcome{border-bottom-color:' + value + ';}.menu .item.selected{background-color:' + value + ';}</style>';
    localStorage.setItem("colorName", name);
    localStorage.setItem("colorValue", value);
    
    console.log('%ccolor set to ' + name + " (" + value + ")", "color: " + value + "; background-image: linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.8) 100%); background-color: " + value + "; padding: 2px;");
}

function setDifficulty(label, value) {
    localStorage.setItem("difficultyLabel", label);                 // get the label (the item's name displayed in the menu)
    localStorage.setItem("difficultyValue", parseInt(value));       // get the value and convert it to an integer

    if(parseInt(value) === 0) {
        console.log('difficulty turned off (' + value + ')');
    } else {
        console.log('difficulty set to ' + value + ' (' + label + ')');
    }

    console.groupEnd();
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
    var name = elem.getAttribute("data-name");
    var label = elem.getAttribute("data-label");
    var action = elem.getAttribute("data-action") || '';
    var value = elem.getAttribute("data-value") || '';

    switch (action) {
        case "playFallout":
        case "lockTerminal":
        case "exitToDesktop":
        case "reboot":
        case "shutdown":
            ajax("php/actions.php?action=" + action, "GET", function (response) {});
            break;
        case "setColor":
            setColor(name, value);
            break;
        case "setDifficulty":
            setDifficulty(label, value);
            break;
    }

    setResult(elem.getAttribute("data-result"));
}
