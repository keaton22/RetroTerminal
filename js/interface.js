
// IF ANY KEY IS PRESSED

document.onkeydown = function (e) {

    switch (e.which || e.keyCode) {

        case 38:    // up arrow

            moveCursor(1);
            break;

        case 40:    // down arrow

            moveCursor(0);
            break;

        case 27:    // ESC key
        case 8:     // Backspace key

            if (document.body.classList.contains('template-note')) {                                                     // if note template
                var currentNoteSection = document.querySelector('.note .active');                                               // get the current section
                var currentNoteSectionIndex = parseInt(currentNoteSection.getAttribute('data-note-section'));                   // get the current section's index

                if (currentNoteSectionIndex === 1) {                                                                            // if it's is the first section
                    setResult(document.querySelector('.note').getAttribute('data-source-result'));                                  // set result text
                    loadPage(document.querySelector('.note').getAttribute('data-source-location'), true);                           // go to source page
                } else {                                                                                                        // if it's not the first section
                    currentNoteSection.classList.remove('active');                                                                  // remove '.active' class
                    document.querySelector('.note [data-note-section=\"' + (currentNoteSectionIndex - 1) + '\"]').classList.add('active');// new '.active' section
                }

            } else if (document.querySelector('.menu .item[data-name=back]')) {                                          // else if menu template but not home page
                setResult(document.querySelector('.menu .item[data-name=back]').getAttribute('data-result'));                   // set source-result
                loadPage(document.querySelector('.menu .item[data-name=back]').getAttribute('data-location'), true);            // set source-location

            } else {                                                                                                        // else
                e.preventDefault();                                                                                             // prevent default
                history.back();                                                                                                 // and go back
            }
            break;

        case 13:    // Enter key
        case 32:    // Spacebar

            if (document.body.classList.contains('template-note')) {                                                         // if note template
                var noteTemplate = document.querySelector('.note');                                                             // get the note template
                var currentNoteSection = document.querySelector('.note .active');                                               // get the current section
                var lastSectionIndex = parseInt(noteTemplate.getAttribute('data-note-total-sections'));                         // get the final section's index
                var currentNoteSectionIndex = parseInt(currentNoteSection.getAttribute('data-note-section'));                   // get the current section's index

                if (currentNoteSectionIndex === lastSectionIndex) {                                                             // if it's the final section
                    setResult(document.querySelector('.note').getAttribute('data-source-result'));                                  // set result text
                    loadPage(document.querySelector('.note').getAttribute('data-source-location'), true);                           // go to source page
                } else {                                                                                                        // if it's not the final section
                    currentNoteSection.classList.remove('active');                                                                  // remove '.active' class
                    document.querySelector('.note [data-note-section=\"' + (currentNoteSectionIndex + 1) + '\"]').classList.add('active'); // new '.active' section
                }
            } else if (document.body.classList.contains('template-menu')) {
                document.querySelector('.menu .item.selected').focus();
            }
            break;

        case 9:     // Tab key

            e.preventDefault();
            break;
    }
}



// MOVE CURSOR (CHANGE THE HIGHLIGHTED ITEM IN MENUS)

function moveCursor(direction) {

    if (document.querySelector('.menu')) {

        var currentMenuSectionItems = document.querySelectorAll('.menu > .item.visible');                               // get number of items in current menu section
        var currentMenuSection = parseInt(document.querySelector('.menu').getAttribute('data-menu-current-section'));   // get numerical value of current menu section

        if (direction === 0) {                                                      // if the down arrow is pressed
            var current = document.querySelector('.menu .item.selected');               // set the selected item as the current one
            var next = current.nextSibling;                                             // set the item after the first selected item as the next one

            if (document.querySelector('.menu .item.selected').nextSibling) {           // if it's not the very last item in the menu

                if (next.classList.contains('visible')) {       // if it's not the last item in the section
                    current.classList.remove('selected');           // deselect the currently selected item
                    next.classList.add('selected');                 // select the new currently selected item
                    next.focus();                                   // put :focus on the new currently selected item
                } else {                                        // if it is the last item in the section
                    var nextMenuSectionItems = document.querySelectorAll('.menu .item[data-menu-section=\"' + (currentMenuSection + 1) + '\"]'); // items in next section

                    for (i = 0; i < currentMenuSectionItems.length; i++) {                                          // find all the items in the current section
                        currentMenuSectionItems[i].classList.remove('visible');                                         // and remove the .visible class from each
                    }

                    for (i = 0; i < nextMenuSectionItems.length; i++) {                                             // find all the items in the next section
                        nextMenuSectionItems[i].classList.add('visible');                                               // and add the .visible class to each
                    }

                    document.querySelector('.menu').setAttribute('data-menu-current-section', (currentMenuSection + 1));    // set new current section

                    current.classList.remove('selected');                           // remove the .selected class from the current item
                    next = document.querySelector('.menu .item.visible');           // set the next item as the first item in the next section
                    next.classList.add('selected');                                 // set the next item as the currently selected item
                    next.focus();                                                   // put :focus on the next item
                }
            } else {                                                    // if it's the very last item in the menu
                next = document.querySelector('.menu .item.visible');       // set the next item as the first visible item in the section
                current.classList.remove('selected');                       // deselect the currently selected item
                next.classList.add('selected');                             // select the new currently selected item
                next.focus();                                               // put :focus on the new currently selected item
            }
        }

        if (direction === 1) {                                                      // if the up arrow is pressed
            var current = document.querySelector('.menu .item.selected');               // set the selected item as the current one
            var next = current.previousSibling;                                         // set the item before the first selected item as the next one

            if (document.querySelector('.menu .item.selected').previousSibling) {       // if it's not the very first item in the menu

                if (next.classList.contains('visible')) {       // if it's not the last item in the section
                    current.classList.remove('selected');           // deselect the currently selected item
                    next.classList.add('selected');                 // select the new currently selected item
                    next.focus();                                   // put :focus on the new currently selected item
                } else {                                        // if it is the last item in the section
                    var nextMenuSectionItems = document.querySelectorAll('.menu .item[data-menu-section=\"' + (currentMenuSection - 1) + '\"]'); // items in next section
                    var nextMenuSectionLength = nextMenuSectionItems.length;

                    for (i = 0; i < currentMenuSectionItems.length; i++) {                                          // find all the items in the current section
                        currentMenuSectionItems[i].classList.remove('visible');                                         // and remove the .visible class from each
                    }

                    for (i = 0; i < nextMenuSectionItems.length; i++) {                                             // find all the items in the next section
                        nextMenuSectionItems[i].classList.add('visible');                                               // and add the .visible class to each
                    }

                    document.querySelector('.menu').setAttribute('data-menu-current-section', (currentMenuSection - 1));    // set new current section

                    current.classList.remove('selected');                                               // remove the .selected class from the current item
                    next = document.querySelectorAll('.menu .item.visible')[nextMenuSectionLength - 1]; // set the next item as the last item in the next section
                    next.classList.add('selected');                                                     // set the next item as the currently selected item
                    next.focus();                                                                       // put :focus on the next item
                }
            } else {                                                                                // if it's the very first item in the menu
                var currentMenuSectionLength = document.querySelectorAll('.menu .item.visible').length; // make an array of all the items in the current section
                next = document.querySelectorAll('.menu .item.visible')[currentMenuSectionLength - 1];  // set the next item as the last visible item in the section
                current.classList.remove('selected');                                                   // deselect the currently selected item
                next.classList.add('selected');                                                         // select the new currently selected item
                next.focus();                                                                           // put :focus on the new currently selected item
            }
        }
    }
}
