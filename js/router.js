function cleanPage() {
    var main = document.querySelector("#main");
    
    while (main.hasChildNodes()) {
        main.removeChild(main.lastChild);
    }
    console.log("* page cleaned *");
}

// route based on hash change
function hashChange() {
    var hash = location.hash.slice(1) ? location.hash.slice(1) : "home";
    cleanPage();
    ajax("json/" + hash + ".json", "GET", dataHandler);
    console.log("* handled hash change *");
}

// check if browser supports location.hash
if (!("onhashchange" in window)) {  
    console.log("* The browser does not support the hashchange event :( *");
}