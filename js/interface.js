
// IF ANY KEY IS PRESSED

document.onkeydown = function (e) {

    switch (e.which || e.keyCode) {

        case 38:                                                                                                        // up arrow

            moveCursor(1);
            break;

        case 40:                                                                                                        // down arrow

            moveCursor(0);
            break;

        case 27:                                                                                                        // ESC key
        case 8:                                                                                                         // Backspace key

            if(document.body.classList.contains('template-note')) {                                                     // if note template

                var currentSection = document.querySelector('.note .active');                                                   // get the current section
                var currentSectionIndex = parseInt(currentSection.getAttribute('data-note-section'));                           // get the current section's index

                if (currentSectionIndex === 1) {                                                                                // if it's is the first section
                    setResult(document.querySelector('.note').getAttribute('data-source-result'));                                  // set result text
                    loadPage(document.querySelector('.note').getAttribute('data-source-location'), true);                           // go to source page
                } else {                                                                                                        // if it's not the first section
                    currentSection.classList.remove('active');                                                                      // remove '.active' class
                    document.querySelector('.note [data-note-section="' + (currentSectionIndex - 1) + '"]').classList.add('active');// new '.active' section
                }

            } else if(document.querySelector('.menu .item[data-name=back]')) {                                              // else if menu template
                setResult(document.querySelector('.menu .item[data-name=back]').getAttribute('data-result'));                   // set source-result
                loadPage(document.querySelector('.menu .item[data-name=back]').getAttribute('data-location'), true);            // set source-location
            } else {                                                                                                        // else
                e.preventDefault();                                                                                             // prevent default
                history.back();                                                                                                 // and go back
            }
            break;

        case 13:                                                                                                        // Enter key
        case 32:                                                                                                        // Spacebar

            if(document.body.classList.contains('template-note')) {                                                         // if note template

                var noteTemplate = document.querySelector('.note');                                                             // get the note template
                var currentSection = document.querySelector('.note .active');                                                   // get the current section
                var lastSectionIndex = parseInt(noteTemplate.getAttribute('data-note-total-sections'));                         // get the final section's index
                var currentSectionIndex = parseInt(currentSection.getAttribute('data-note-section'));                           // get the current section's index

                if (currentSectionIndex === lastSectionIndex) {                                                                 // if it's the final section
                    setResult(document.querySelector('.note').getAttribute('data-source-result'));                                  // set result text
                    loadPage(document.querySelector('.note').getAttribute('data-source-location'), true);                           // go to source page
                } else {                                                                                                        // if it's not the final section
                    currentSection.classList.remove('active');                                                                      // remove '.active' class
                    document.querySelector('.note [data-note-section="' + (currentSectionIndex + 1) + '"]').classList.add('active');// new '.active' section
                }
            }
            break;

        case 9:                                                                                                         // Tab key

            e.preventDefault();
            break;
    }
}



// MOVE CURSOR (CHANGE THE HIGHLIGHTED ITEM IN MENUS)

function moveCursor(direction) {

    if (document.querySelector(".menu")) {

        var length = document.querySelectorAll(".menu > .item").length;     // get number of items in menu

        if (direction == 0) {      // if key pressed is down arrow
            var current = document.querySelector(".menu .item.selected");
            var next = current.nextSibling;

            if (document.querySelector(".menu .item.selected").nextSibling) {   // if not last of type
                current.className = "item";
                next.className += " selected";
                next.focus();
                current = next;
            } else {
                next = document.querySelector(".menu").firstChild;
                current.className = "item";
                next.className += " selected";
                next.focus();
                current = next;
            }
        }

        if (direction == 1) {      // if key pressed is up arrow
            var current = document.querySelector(".menu .item.selected");
            var next = document.querySelector(".menu .item.selected").previousSibling;

            if (document.querySelector(".menu .item.selected").previousSibling) {   // if not first of type
                current.className = "item";
                next.className += " selected";
                next.focus();
                current = next;
            }
            else {
                next = document.querySelector(".menu").lastChild;
                current.className = "item";
                next.className += " selected";
                next.focus();
                current = next;
            }
        }
    }
}
