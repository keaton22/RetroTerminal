// listen for the 'popstate'
window.addEventListener('popstate', function(e) {
    loadPage(e.state, true);
});

// call this function anytime the page changes
function loadPage(page, popstateUsed) {
    page = page || 'home';                      // set the default page to "home" if no other page is set
    popstateUsed = popstateUsed || false;       // set the default value for

    if(!popstateUsed) {                         // if loadPage() is called WITHOUT using the 'popstate' event
        history.pushState(page, null, 'index.html?page=' + page);      // create a new history state with pushState()
    }

    console.groupCollapsed('go to \"' + page + '\" page');

    cleanPage();                                // clean the page

    ajax(baseURL + "/json/" + page + ".json", "GET", dataHandler);      // ask the server for the new page's [JSON] data

    console.info("%new page loaded", "background: rgba(0,0,255,0.2); color: rgba(0,0,255,1); padding: 2px;");
    console.groupEnd();
}

function cleanPage() {
    var main = document.querySelector("#main");

    while (main.hasChildNodes()) {
        main.removeChild(main.lastChild);
    }

    // remove all css classes from <body> that start with 'template-' or 'color-'
    var matchedTemplateClass = new RegExp('template-(.*)+', 'g');           // declare regex variable for 'template-'
    var matchedColorClass = new RegExp('color-(.*)+', 'g');                 // declare regex variable for 'color-'

    for(var i = 0; i < document.body.classList.length; i++) {               // iterate through all css classes applied to the <body>
        if(matchedTemplateClass.test(document.body.classList[i])) {         // if the current css class starts with 'template-'
            document.body.classList.remove(document.body.classList[i]);     // remove that css class
        }
        if(matchedColorClass.test(document.body.classList[i])) {            // if the current css class starts with 'color-'
            document.body.classList.remove(document.body.classList[i]);     // remove that css class
        }
    }

    console.groupCollapsed('changing pages...');
    console.info("%cold page cleaned", "background: rgba(0,0,255,0.2); color: rgba(0,0,255,1); padding: 2px;");
}
