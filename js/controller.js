var page;                           // the page json
var numRequiredTemplates;           // each page (json) has templates
var numTemplatesPopulated = 0;      // keep a count of those templates so we know when the page is complete
var contentHeight = 312;            // the height of the interface
var headerHeight = 54;              // the height of the header
var footerHeight = 40;              // the height of the footer (this value is altered slightly)
//var welcomeTemplateHeight;          // the height of the welcome template
//var menuTemplateHeight;             // the height of the menu template
var noteTemplateHeight;             // the height of the note template
// var remainingHeight;                // equal to contentHeight - (headerHeight + welcomeTemplateHeight + footerHeight)
var availableHeight;                // equal to contentHeight - (headerHeight + welcomeTemplateHeight + footerHeight)
var menuItemHeight = 24;            // the height of each menu item
var noteLineHeight = 12;            // the height of each note line



// BUILD THE PAGE

function pageBuilder(response) {
    page = JSON.parse(response.responseText);                       // get the page data [JSON]
    numRequiredTemplates = Object.keys(page.templates).length;      // find all property names within an object, make an array of them, then count them

    console.groupCollapsed('got data from ' + page.name + '.json');

    if (page.templates.welcome) {                             // if the page has a welcome template
        console.groupCollapsed('page has a welcome template');
        document.body.classList.add('template-welcome');            // add 'template-welcome' class to the <body>
        writeWelcome();                                             // build the welcome template
        console.groupEnd();
    }

    if (page.templates.menu) {                                // if the page has a menu template
        console.groupCollapsed('page has a menu template');
        document.body.classList.add('template-menu');               // add 'template-menu' class to the <body>
        writeMenu();                                                // build the menu template
        console.groupEnd();
    }

    if (page.templates.note) {                                // if the page has a note template
        console.groupCollapsed('page has a note template');
        document.body.classList.add('template-note');               // add 'template-note' class to the <body>
        writeNote();                                                // build the note template
        console.groupEnd();
    }
}



// WRITE WELCOME TEMPLATE

function writeWelcome() {
    var welcome = page.templates.welcome;

    document.querySelector('.welcome').innerHTML = welcome.text;

    page.templates.welcome.height = document.querySelector('.welcome').offsetHeight;

    console.log('injected data into welcome');

    templatePopulated();
}



// WRITE WELCOME MENU

function writeMenu() {
    var menu = page.templates.menu;
    var items = menu.items;

    if (page.source.location === '') {                                          // if there's no source location
        console.error('the "' + page.name + '" page has no source location')        // throw an error
    }

    menu.height = document.querySelector('.menu').offsetHeight;                     // the height of full menu (inclusive of the heights of all items)
    availableHeight = calculateAvailableHeight();                                   // the available space for the menu to show in
    document.querySelector('.menu').style.height = availableHeight + 'px';          // set the menu height to the availableHeight

    if (page.source.location !== 'root') {                  // if the page's source location isn't 'root' (e.g. the page is not 'home')
        items.push({                                            // insert 'Back' at the end of the menu
            'name': 'back',                                         // set its name
            'label': 'Back',                                        // set its label
            'location': page.source.location,                       // set its location
            'result': page.source.result                            // set its result text
        });
    }

    var numMenuSections = 0;                                                        // how many menu sections are there?
    var numItemsPerMenuSection = Math.floor(availableHeight / menuItemHeight);      // how many menu items can fit in the available space?

    for (i = 0; i < items.length; i++) {                    // the for loop that determines where to put 'Next' and 'Previous' menu items

        if ((((i + 1) % numItemsPerMenuSection) === 0) && (items.length > numItemsPerMenuSection)) {    // if a new section is needed

            items.splice(i, 0, {                            // insert 'Next' item at the current index
                'name': 'next',                                 // set its name
                'label': 'Next',                                // set its label
                'action': 'moveCursor',                         // set its action to moveCursor
                'value': '0',                                   // set its value to 0 (e.g. moveCursor(0))
            });

            items.splice((i + 1), 0, {                      // insert 'Previous' item at the index after the current index
                'name': 'previous',                             // set its name
                'label': 'Previous',                            // set its label
                'action': 'moveCursor',                         // set its action to moveCursor
                'value': '1',                                   // set its value to 0 (e.g. moveCursor(1))
            });

            i += 2;                                         // add 2 to the count to make up for the two menu items just added
        }
    }

    for (i = 0; i < items.length; i++) {                    // the for loop that builds the menu items

        var li = document.createElement('li');
        var text = document.createTextNode(items[i].label);
        li.classList.add('item');

        li.setAttribute('data-name', (items[i].name || ''));                    // set name (required)
        li.setAttribute('data-label', (items[i].label || ''));                  // set label (required)
        li.setAttribute('data-menu-section', (numMenuSections + 1));            // set menu section (first section is 1, not 0)
        li.setAttribute('tabindex', '-1');                                      // set tabindex (allows element to be focusable)

        if (numMenuSections === 0) {                                            // if this is the only menu section
            li.classList.add('visible');                                            // make its items visible
        }

        // only allow the following attributes to be created if they exist in the json
        items[i].location && li.setAttribute('data-location', items[i].location);       // set location (like [href])
        items[i].action && li.setAttribute('data-action', items[i].action);             // set action (like [onclick])
        items[i].value && li.setAttribute('data-value', items[i].value);                // set value (if choosing between things)
        items[i].result && li.setAttribute('data-result', items[i].result);             // set result (the feedback message)

        items[i].location && li.addEventListener('keydown', function (e) {              // keydown event listener for location
            if (e.which === 13 || e.which === 32) {                                         // if enter key is pressed

                setResult(this.getAttribute('data-result'));                                    // set the result text

                var itemLocation = this.getAttribute('data-location');                          // track the item location

                loadPage(itemLocation);                                                         // load the page and create a new history state
            }
        });

        items[i].action && li.addEventListener('keydown', function (e) {                // keydown event listener for action
            if (e.which === 13 || e.which === 32) {                                         // if enter key or spacebar is pressed
                setResult(this.getAttribute('data-result'));                                    // set the result text
                doAction(this);                                                                 // do the thing the menu item says it does
            }
        });

        li.appendChild(text);                                                           // put text in <li> elements
        document.querySelector('.menu').appendChild(li);                                // put <li> elements in .menu
        console.log('injected "' + items[i].label + '" into menu');

        if ((i + 1) % numItemsPerMenuSection === 0) {                                   // if it's the last menu item in the section
            numMenuSections++;                                                              // increment numMenuSections
        }
    }

    document.querySelector('.menu').setAttribute('data-menu-current-section', 1);                   // set the first menu section to the current menu section
    document.querySelector('.menu').setAttribute('data-menu-total-sections', numMenuSections + 1);  // set total number of menu sections
    document.querySelector('.menu .item').classList.add('selected');                                // add .selected to the first menu item
    document.querySelector('.menu .item').focus();                                                  // put :focus on the first menu item

    templatePopulated();
}



// WRITE NOTE TEMPLATE

function writeNote() {
    var note = page.templates.note;

    if (page.source.location === '') {                                          // if there's no source location
        console.error('the "' + page.name + '" page has no source location')        // throw an error
    }

    note.height = document.querySelector('.note').offsetHeight;                     // the height of full note (inclusive of heights of all sections)
    availableHeight = calculateAvailableHeight();                                   // the available space for the note to show in
    document.querySelector('.note').style.height = availableHeight + 'px';          // set the note height to the availableHeight

    var noteLines = wordWrap(note.text, 44, false, false);                         // create an array of each line of the note using wordWrap()
    var noteSections = [];                                                          // create an array for each section of the note
    var numNoteSections = 0;                                                        // count how many sections the note has
    var numLinesPerNoteSection = Math.floor(availableHeight / noteLineHeight);      // how many text lines can fit in the remaining space?

    for (i = 0; i < noteLines.length; i++) {                                        // iterate through each line of the note

        if (noteSections[numNoteSections] === undefined) {                          // if the current section doesn't have anything in it yet
            noteSections[numNoteSections] = '';                                         // prevent it from prefixing that section with 'undefined'
        }

        noteSections[numNoteSections] += noteLines[i];                                  // keep on appendin'

        if (((i + 1) % numLinesPerNoteSection === 0) || ((i + 1) === noteLines.length)) {   // if it's the section's last line OR if it's the very last line
            var span = document.createElement('span');                                          // make a <span> element
            var text = document.createTextNode(noteSections[numNoteSections]);                  // make a text node containing the text from the current section

            span.setAttribute('data-note-section', numNoteSections + 1);                        // number this note section ('+ 1' so we start the count at 1)
            span.appendChild(text);                                                             // put text node in <span> element
            document.querySelector('.note').appendChild(span);

            numNoteSections++;                                                                  // increment the number of note sections (final value will be
        }                                                                                       // 1 greater than it should, keep this in mind when labeling
    }                                                                                           // data-note-total-sections below because it won't need '+ 1')

    document.querySelector('.note [data-note-section="1"]').classList.add('active');            // set the 'active' class on the first section
    document.querySelector('.note').setAttribute('data-note-total-sections', numNoteSections);  // set total number of note sections (no '+ 1', see above)
    document.querySelector('.note').setAttribute('data-source-location', page.source.location); // set source location
    document.querySelector('.note').setAttribute('data-source-result', page.source.result);     // set source result text

    console.log('injected data into note');

    templatePopulated();
}



// TEMPLATE POPULATED (TEMPLATE QUEUE)

function templatePopulated() {
    numTemplatesPopulated++;                                // increment the number of templates populated in the page

    if (numTemplatesPopulated === numRequiredTemplates) {    // once all page templates are populated
        numTemplatesPopulated = 0;                              // reset the count for populated page templates
        console.groupEnd();
        console.info('all data loaded successfully!');
        console.groupEnd();
        pageLoaded();                                           // do stuff
    }
}



// PAGE LOADED (AFTER ALL TEMPLATES ARE POPULATED)

function pageLoaded() {
    var color = getColor();                                     // get the color
    var difficulty = getDifficulty();                           // get the difficulty

    setColor(color.name, color.value);                          // set the color's name and value
    setDifficulty(difficulty.name, difficulty.value);           // set the difficulty's name and value
    drawFavicon();
}



// AJAX HELPER FUNCTION

function ajax(file, method, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr);
        }
    }
    xhr.open(method, file, true);
    xhr.send();
}



// CALCULATE AVAILABLE HEIGHT HELPER

function calculateAvailableHeight() {
    return (contentHeight - (headerHeight + page.templates.welcome.height + footerHeight));     // calculate the available space for the menu to show in
}



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
