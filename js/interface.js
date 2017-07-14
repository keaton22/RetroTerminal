document.onkeydown = function (e) {
    //console.info("Key pressed: " + e.which);

    switch (e.which || e.keyCode) {
        case 38:                    // up arrow
            moveCursor(1);
            break;
        case 40:                    // down arrow
            moveCursor(0);
            break;
        case 27:                    // ESC key
        case 8:                     // Backspace key
            window.history.back();
            hashChange();
        case 9:                     // Tab key
            e.preventDefault();
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

//document.onkeydown = function(event) {
//    console.log(event);
//}
