function submitActionsForm(action, e) {
    e = e || window.event;
    console.log(e.which);
    
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
                    //setColor('#1aff80');
                    break;
                case "setColorBlue":
                    setColor('blue');
                    //setColor('#2ecfff');
                    break;
                case "setColorAmber":
                    setColor('amber');
                    //setColor('#ffb642');
                    break;
                case "setColorWhite":
                    setColor('white');
                    //setColor('#c0ffff');
                    break;
            }
        });    
    }
}
                
function setColor(color) {
    document.querySelector("body").className = color;
    localStorage.setItem("color", color);
    
    //document.documentElement.style.setProperty('--color', color);
}