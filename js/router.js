var pageNameURL = new RegExp('\/index\.html.*');                    // a regex matcher for everything from 'index.html' onward
var baseURL = window.location.href.replace(pageNameURL, '');        // the page URL excluding everything from 'index.html' onward



// LISTEN FOR THE 'POPSTATE'

window.addEventListener('popstate', function(e) {
    loadPage(e.state, true);
});



// LOAD PAGE (WHEN A NEW PAGE IS REQUESTED)

function loadPage(page, popstateUsed) {
    page = page || 'home';                      // set the default page to "home" if no other page is set
    popstateUsed = popstateUsed || false;       // set the default value for

    if (!popstateUsed) {                         // if loadPage() is called WITHOUT using the 'popstate' event
        history.pushState(page, null, 'index.html?page=' + page);      // create a new history state with pushState()
    }

    console.groupCollapsed('go to \"' + page + '\" page');

    cleanPage();                                // clean the page

    ajax(baseURL + '/json/' + page + '.json', 'GET', dataHandler);      // ask the server for the new page's [JSON] data

    console.info('%cnew page loaded', 'background: rgba(0,0,255,0.2); color: rgba(0,0,255,1); padding: 2px;');
    console.groupEnd();
}



// CLEAN PAGE (REMOVE THE CONTENTS OF THE OLD PAGE)

function cleanPage() {
    var welcome = document.querySelector('.welcome');
    var menu = document.querySelector('.menu');
    var note = document.querySelector('.note');

    while (welcome.hasChildNodes()) {                       // clean the welcome template
        welcome.removeChild(welcome.lastChild);
    }

    while (menu.hasChildNodes()) {                          // clean the menu template
        menu.removeChild(menu.lastChild);
    }

    while (note.hasChildNodes()) {                          // clean the note template
        note.removeChild(note.lastChild);
    }

    // remove all css classes from <body> (ideally just ones that start with 'template-' or 'color-', but I couldn't get that to work)
    document.body.className = '';

    console.groupCollapsed('changing pages...');
    console.info('%cold page cleaned', 'background: rgba(0,0,255,0.2); color: rgba(0,0,255,1); padding: 2px;');
}
