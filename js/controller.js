var data;                           // the json
var template;                       // the html
var meta = {};                      // allow passing of metadata between functions
var numRequiredTemplates;           // each page (json) has templates
var numTemplatesPopulated = 0;      // keep a count of those templates so we know when the page is complete
var contentHeight = 312;            // the height of the interface
var headerHeight = 54;              // the height of the header
var footerHeight = 40;              // the height of the footer (this value is altered slightly)
var welcomeTemplateHeight;          // the height of the welcome template
var noteTemplateHeight;             // the height of the note template
var remainingHeight;                // equal to contentHeight - (headerHeight + welcomeTemplateHeight + footerHeight)



// WORD WRAP HELPER FUNCTION

function wordWrap(str, width, brk, cut) {              // written by ARTsinn - http://jsfiddle.net/ARTsinn/sXKzZ/
    var regex = '\\n|.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

    if (!str) {
        return str;
    }

    if (!brk) {
        return str.match(RegExp(regex, 'g'));
    } else {
        return str.match(RegExp(regex, 'g')).join(brk);
    }
}



// AJAX HELPER FUNCTION

function ajax(file, method, callback, meta) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr, meta);
        }
    }
    xhr.open(method, file, true);
    xhr.send();
}



// DATA HANDLER (JSON)

function dataHandler(response) {
    data = JSON.parse(response.responseText);
    numRequiredTemplates = data.templates.length;

    console.groupCollapsed("got data from " + data.page + ".json");

    for(i = 0; i < data.templates.length; i++) {
        var type = data.templates[i].type;
        var value = data.templates[i].value;
        var source = data.source;                                       // source includes source.location and source.result

        meta = {"type": type, "value": value, "source": source};        // update meta information

        console.groupCollapsed("page has a " + type);

        templateHandler(meta)
    }
}



// TEMPLATE HANDLER (HTML)

function templateHandler(meta) {
    document.body.classList.add('template-' + meta.type);               // add a 'template-' class for each currently in-use template

    // run appropriate "write" function depending on template type ( writeWelcome(), writeMenu(), or writeNote() )
    eval("write" + meta.type.charAt(0).toUpperCase() + meta.type.slice(1) + "(meta);");

    console.groupEnd();
}



// WRITE WELCOME TEMPLATE

function writeWelcome(meta) {
    document.querySelector("." + meta.type).innerHTML = meta.value;

    welcomeTemplateHeight = document.querySelector("." + meta.type).offsetHeight;

    console.log("injected data into " + meta.type);

    templatePopulated();
}



// WRITE WELCOME MENU

function writeMenu(meta) {

    if (meta.source.location !== 'root') {                  // if the page's source location isn't 'root' (e.g. the page is not 'home')
        meta.value[meta.value.length] = {                   // add 'Back' as a new item to the menu
            'name': 'back',                                 // set its name
            'label': 'Back',                                // set its label
            'location': meta.source.location,               // set its location
            'result': meta.source.result                    // set its result text
        };
    }

    if (meta.source.location === '') {                      // if there's no source location
        meta.source.location = undefined;                       // set it as 'undefined'
    }

    for(i = 0; i < meta.value.length; i++) {

        var li = document.createElement("li");
        var text = document.createTextNode(meta.value[i].label);
        li.className = "item";

        li.setAttribute("data-name", (meta.value[i].name || ""));                                 // set name (required)
        li.setAttribute("data-label", (meta.value[i].label || ""));                               // set label (required)
        li.setAttribute("tabindex", ("-1"));                                                      // set tabindex (allows element to be focusable)

        // only allow the following attributes to be created if they exist in the json
        meta.value[i].location && li.setAttribute("data-location", meta.value[i].location);       // set location (like [href])
        meta.value[i].action && li.setAttribute("data-action", (meta.value[i].action));           // set action (like [onclick])
        meta.value[i].value && li.setAttribute("data-value", (meta.value[i].value));              // set value (if choosing between things)
        meta.value[i].result && li.setAttribute("data-result", (meta.value[i].result));           // set result (the feedback message)

        meta.value[i].location && li.addEventListener("click", function () {                      // click event for location

            var itemLocation = this.getAttribute('data-location');                                // track the item location
            setResult(this.getAttribute('data-result'));                                          // set the result text

            if (itemLocation === meta.source.location) {                                          // if this is a 'Back' item
                loadPage(this.getAttribute('data-location'), true);                                   // load the page, but don't create a new history state
            } else {                                                                              // if the page is not a 'Back' item
                loadPage(this.getAttribute('data-location'));                                         // set the location and create a new history state
            }
        });

        meta.value[i].location && li.addEventListener("keydown", function (e) {                   // keydown event for action
            if (e.which === 13 || e.which === 32) {                                               // if enter key is pressed

                var itemLocation = this.getAttribute('data-location');                            // track the item location
                setResult(this.getAttribute('data-result'));                                      // set the result text

                if (itemLocation === meta.source.location) {                                      // if this is a 'Back' item
                    loadPage(this.getAttribute('data-location'), true);                               // load the page, but don't create a new history state
                } else {                                                                          // if the page is not a 'Back' item
                    loadPage(this.getAttribute('data-location'));                                     // set the location and create a new history state
                }
            }
        });

        // click event listener for menu items with an action or location
        meta.value[i].action && li.addEventListener("click", function () {
            if(document.querySelector(".menu .item.selected")) {                        // if there's already a selected menu item
                document.querySelector(".menu .item.selected").className = "item";          // deselect it
            }
            this.className += " selected";                                              // and select the current menu item
            setResult(this.getAttribute('data-result'));                                // set the result text
            doAction(this);                                                             // do the thing the menu item says it does
        });

        // keydown event listener for menu items with an action or location
        meta.value[i].action && li.addEventListener("keydown", function (e) {
            if (e.which === 13 || e.which === 32) {                                     // if enter key or spacebar is pressed
                setResult(this.getAttribute('data-result'));                                // set the result text
                doAction(this);                                                             // do the thing the menu item says it does
            }
        });

        li.appendChild(text);                                                           // put text in <li> elements
        document.querySelector("." + meta.type).appendChild(li);                        // put <li> elements in .menu
        console.log("injected \"" + meta.value[i].label + "\" into " + meta.type);
    }

    document.querySelector("." + meta.type + " ." + li.className).className += " selected";
    document.querySelector("." + meta.type + " ." + li.className).focus();

    templatePopulated();
}



// WRITE NOTE TEMPLATE

function writeNote(meta) {

    if (meta.source.location === '') {                                      // if there's no source location
        meta.source.location = undefined;                                   // set it as 'undefined'
    }

    noteTemplateHeight = document.querySelector(".note").offsetHeight;                          // the height of full note (inclusive of heights of all sections)
    remainingHeight = contentHeight - (headerHeight + welcomeTemplateHeight + footerHeight);    // the available space for the note to show in
    document.querySelector(".note").style.height = remainingHeight + 'px';                      // set the .note height to the remainingHeight

    var noteLines = wordWrap(meta.value, 44, false, false);                 // create an array of each line of the note using wordWrap()
    var noteSections = [];                                                  // create an array for each section of the note
    var numNoteSections = 0;                                                // count how many sections the note has
    var numLinesPerNoteSection = Math.floor(remainingHeight / 12)           // how many text lines can fit in the remaining space? (12 = 12px line height)

    for(i = 0; i < noteLines.length; i++) {                                     // iterate through each line of the note

        if (noteSections[numNoteSections] === undefined) {                      // if the current section doesn't have anything in it yet
            noteSections[numNoteSections] = '';                                     // prevent it from prefixing that section with 'undefined'
        }

        noteSections[numNoteSections] += noteLines[i];                          // keep on appendin'

        if (((i + 1) % numLinesPerNoteSection === 0) || (i + 1 === noteLines.length)) {     // if it's the last line in the section OR if it's the very last line
            var span = document.createElement("span");                                          // make a <span> element
            var text = document.createTextNode(noteSections[numNoteSections]);                  // make a text node containing the text from the current section

            span.setAttribute("data-note-section", numNoteSections + 1);                        // number this note section ('+ 1' so we start the count at 1)
            span.appendChild(text);                                                             // put text node in <span> element
            document.querySelector('.note').appendChild(span);

            numNoteSections++;                                                                  // increment the number of note sections (final value will be
        }                                                                                       // 1 greater than it should, keep this in mind when labeling
    }                                                                                           // data-note-total-sections below because it won't need '+ 1')

    document.querySelector('.note [data-note-section="1"]').classList.add('active');            // set the '.active' class on the first section
    document.querySelector('.note').setAttribute('data-note-total-sections', numNoteSections);  // set total number of note sections (no '+ 1', see above)
    document.querySelector('.note').setAttribute("data-source-location", meta.source.location); // set source location
    document.querySelector('.note').setAttribute("data-source-result", meta.source.result);     // set source result text

    console.log("injected data into " + meta.type);

    templatePopulated();
}



// TEMPLATE POPULATED (TEMPLATE QUEUE)

function templatePopulated() {
    numTemplatesPopulated++;                                // increment the number of templates populated in the page

    if(numTemplatesPopulated === numRequiredTemplates) {    // once all page templates are populated
        numTemplatesPopulated = 0;                              // reset the count for populated page templates
        console.groupEnd();
        console.info('all data loaded successfully!');
        console.groupEnd();
        pageLoaded();                                           // do stuff
    }
}



// PAGE LOADED (AFTER ALL TEMPLATES ARE POPULATED)

function pageLoaded() {
    var colorName = localStorage.getItem("colorName") || "green";                   // get the colorName (or set to default)
    var colorValue = localStorage.getItem("colorValue") || "#1aff80";               // get the colorValue (or set to default)
    var difficultyLabel = localStorage.getItem("difficultyLabel") || 'None';        // get the difficultyLabel (or set to default)
    var difficultyValue = localStorage.getItem("difficultyValue") || 0;             // get the difficultyValue (or set to default)

    setColor(colorName, colorValue);                                                // set the colorName and colorValue
    setDifficulty(difficultyLabel, difficultyValue);                                // set the difficultyLabel and difficultyValue
}
