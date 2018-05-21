document.onkeydown = function (e) {
    //console.info("Key pressed: " + e.which);              // debug which key was pressed

    switch (e.which || e.keyCode) {
        case 38:                    // up arrow
            moveCursor(1);
            break;
        case 40:                    // down arrow
            moveCursor(0);
            break;
        case 27:                    // ESC key
        case 8:                     // Backspace key
            if(document.querySelector('.note').hasAttribute('data-source-location') && document.body.classList.contains('template-note')) {  // if note template
                setResult(document.querySelector('.note').getAttribute('data-source-result'));                                                 // set source-location
                loadPage(document.querySelector('.note').getAttribute('data-source-location'));                                                // set source-result
            } else if(document.querySelector('.menu .item[data-name=back]')) {                                                               // else if menu template
                setResult(document.querySelector('.menu .item[data-name=back]').getAttribute('data-result'));                                    // set source-result
                loadPage(document.querySelector('.menu .item[data-name=back]').getAttribute('data-location'));                                   // set source-location
            } else {                                                                                                                         // else
                e.preventDefault();                                                                                                              // prevent default
                history.back();                                                                                                                  // and go back
            }
            break;
        case 13:                    // Enter key
        case 32:                    // Spacebar
            if(document.querySelector('.note').hasAttribute('data-source-location') && document.body.classList.contains('template-note')) {  // if note template
                setResult(document.querySelector('.note').getAttribute('data-source-result'));                                                 // set source-location
                loadPage(document.querySelector('.note').getAttribute('data-source-location'));                                                // set source-result
            }
            break;
        case 9:                     // Tab key
            e.preventDefault();
            break;
        }
}

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
