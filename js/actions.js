//function setColor(name, value) {
    //document.querySelector("body").className = name;
    //document.querySelector("body").style.color = value;
    //document.querySelector("body").style.backgroundColor = value;
    //document.querySelector(".description").style.borderBottomColor = value;
    //document.querySelector(".list .item.selected").style.backgroundColor = value;
    
    //document.querySelectorAll("li").style.color = value;
    
    //localStorage.setItem("colorName", name);
    //localStorage.setItem("colorValue", value);
    //console.log('%ccolor set to ' + name + " (" + value + ")", "color: " + value + "; background-image: linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.8) 100%); background-color: " + value + "; padding: 2px;");
    //document.documentElement.style.setProperty('--color', color);
//}

function setColor(name, value) {
    document.querySelector("body").className = name;
    document.querySelector('STYLE').innerHTML = '<style>html{}body{color:' + value + ' !important;background-color:' + value + ';}.description{border-bottom-color:' + value + ';}.list .item.selected{background-color:' + value + ';}</style>';
    localStorage.setItem("colorName", name);
    localStorage.setItem("colorValue", value);
    console.log('%ccolor set to ' + name + " (" + value + ")", "color: " + value + "; background-image: linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.8) 100%); background-color: " + value + "; padding: 2px;");
}

function setDifficulty(difficulty) {
    localStorage.setItem("difficulty", difficulty);
    console.log('Color difficulty to ' + difficulty)
}

function setFeedback(status) {
    document.querySelector(".feedback .status").innerHTML = status;
    window.setTimeout(function () {
        clearFeedback();
    }, 5000);
}

function clearFeedback() {
    document.querySelector(".feedback .status").innerHTML = "";
}

function submitActionsForm(element, e) {
    e = e || window.event;
    var action = element.getAttribute("data-action");
    var feedback = element.getAttribute("data-feedback");
    
    if (e.which == 32 || e.which == 13 || e.which == 1) {   // if enter or spacebar is pressed (or by pressing either a mouse click is sumulated)
        ajax("php/actions.php?action=" + action, "GET", function (response) {

            // handle actions
            switch (action) {
                case "playFallout":
                    setFeedback(feedback);
                    break;
                case "resetMinigame":
                    setFeedback(feedback);
                    break;
                case "exitToDesktop":
                    setFeedback(feedback);
                    break;
                case "logOut":
                    setFeedback(feedback);
                    break;
                case "reboot":
                    setFeedback(feedback);
                    break;
                case "shutdown":
                    setFeedback(feedback);
                    break;
                case "setColorGreen":
                    setColor('green', '#1aff80');
                    setFeedback(feedback);
                    //setColor('#1aff80');
                    break;
                case "setColorBlue":
                    setColor('blue', '#2ecfff');
                    setFeedback(feedback);
                    //setColor('#2ecfff');
                    break;
                case "setColorAmber":
                    setColor('amber', '#ffb642');
                    setFeedback(feedback);
                    //setColor('#ffb642');
                    break;
                case "setColorWhite":
                    setColor('white', '#c0ffff');
                    setFeedback(feedback);
                    //setColor('#c0ffff');
                    break;
                case "setDifficultyEasy":
                    setDifficulty('easy');
                    setFeedback(feedback);
                    break;
                case "setDifficultyMedium":
                    setDifficulty('medium');
                    setFeedback(feedback);
                    break;
                case "setDifficultyHard":
                    setDifficulty('hard');
                    setFeedback(feedback);
                    break;
            }
        });    
    }
}