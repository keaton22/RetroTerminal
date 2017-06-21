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
    document.querySelector("body").className = name;
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

function submitActionsForm(element, e) {
    e = e || window.event;
    var action = element.getAttribute("data-action");
    var result = element.getAttribute("data-result");
    
    if (e.which == 32 || e.which == 13 || e.which == 1) {   // if enter or spacebar is pressed (or by pressing either a mouse click is sumulated)
        ajax("php/actions.php?action=" + action, "GET", function (response) {

            // handle actions
            switch (action) {
                case "playFallout":
                    setResult(result);
                    break;
                case "resetMinigame":
                    setResult(result);
                    break;
                case "exitToDesktop":
                    setResult(result);
                    break;
                case "reboot":
                    setResult(result);
                    break;
                case "shutdown":
                    setResult(result);
                    break;
                case "setColorGreen":
                    setColor('green', '#1aff80');
                    setResult(result);
                    //setColor('#1aff80');
                    break;
                case "setColorBlue":
                    setColor('blue', '#2ecfff');
                    setResult(result);
                    //setColor('#2ecfff');
                    break;
                case "setColorAmber":
                    setColor('amber', '#ffb642');
                    setResult(result);
                    //setColor('#ffb642');
                    break;
                case "setColorWhite":
                    setColor('white', '#c0ffff');
                    setResult(result);
                    //setColor('#c0ffff');
                    break;
                case "setDifficultyEasy":
                    setDifficulty('easy');
                    setResult(result);
                    break;
                case "setDifficultyMedium":
                    setDifficulty('medium');
                    setResult(result);
                    break;
                case "setDifficultyHard":
                    setDifficulty('hard');
                    setResult(result);
                    break;
                case "setDemoMenuItemButton":
                    setResult(result);
                    break;
                case "setDemoMenuItemLink":
                    setResult(result);
                    break;
            }
        });    
    }
}