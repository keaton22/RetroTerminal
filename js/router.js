function cleanPage() {
    var main = document.querySelector("#main");
    
    while (main.hasChildNodes()) {
        main.removeChild(main.lastChild);
    }
    console.groupCollapsed('changing pages...');
    console.info("%cpage cleaned", "background: rgba(0,0,255,0.2); color: rgba(0,0,255,1); padding: 2px;");
}

// route based on hash change
function hashChange() {
    var hash = location.hash.slice(1) ? location.hash.slice(1) : "home";
    cleanPage();
    ajax("json/" + hash + ".json", "GET", dataHandler);
    console.info("%chandled hash change", "background: rgba(0,0,255,0.2); color: rgba(0,0,255,1); padding: 2px;");
    console.groupEnd();
}

// check if browser supports location.hash
if (!("onhashchange" in window)) {  
    console.error("%cThe browser does not support the hashchange event :(", "background: rgba(255,0,0,0.2); color: rgba(255,0,0,1);");
}