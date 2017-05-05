function submitActionsForm(element, e) {
    e = e || window.event;
    //console.log(e.which);
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
                    setColor('green');
                    setFeedback(feedback);
                    //setColor('#1aff80');
                    break;
                case "setColorBlue":
                    setColor('blue');
                    setFeedback(feedback);
                    //setColor('#2ecfff');
                    break;
                case "setColorAmber":
                    setColor('amber');
                    setFeedback(feedback);
                    //setColor('#ffb642');
                    break;
                case "setColorWhite":
                    setColor('white');
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
                
function setColor(color) {
    document.querySelector("body").className = color;
    localStorage.setItem("color", color);
    console.log('Color set to ' + color)
    //document.documentElement.style.setProperty('--color', color);
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