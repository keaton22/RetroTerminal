function submitActionsForm(action, e) {
    e = e || window.event;
    
    if (e.which == 32 || e.which == 13 || e.which == 1) {   // if enter or spacebar is pressed (or by pressing either a mouse click is sumulated)
        ajax("scripts/actions.php?action=" + action, "GET", function (response) {

            // handle actions
            switch (action) {
                case "playFallout":
                    alert(response.responseText);
                    break;
                case "resetMinigame":
                    alert("Resetting minigame...");
                    break;
                case "exitToDesktop":
                    alert(response.responseText);
                    break;
                case "logOut":
                    alert(response.responseText);
                    break;
                case "reboot":
                    alert(response.responseText);
                    break;
                case "shutdown":
                    alert(response.responseText);
                    break;
                case "setColorGreen":
                    setColor('green');
                    setFeedback("Color changed to green...", 2000);
                    //setColor('#1aff80');
                    break;
                case "setColorBlue":
                    setColor('blue');
                    setFeedback("Color changed to blue...", 2000);
                    //setColor('#2ecfff');
                    break;
                case "setColorAmber":
                    setColor('amber');
                    setFeedback("Color changed to amber...", 2000);
                    //setColor('#ffb642');
                    break;
                case "setColorWhite":
                    setColor('white');
                    setFeedback("Color changed to white...", 2000);
                    //setColor('#c0ffff');
                    break;
                case "setDifficultyEasy":
                    setDifficulty('easy');
                    setFeedback("Difficulty changed to easy...", 2000);
                    break;
                case "setDifficultyMedium":
                    setDifficulty('medium');
                    setFeedback("Difficulty changed to medium...", 2000);
                    break;
                case "setDifficultyHard":
                    setDifficulty('hard');
                    setFeedback("Difficulty changed to hard...", 2000);
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

function setFeedback(status, timeout) {
    document.querySelector(".feedback .status").innerHTML = status;
}

function clearFeedback() {
    document.querySelector(".feedback .status").innerHTML = "";
}