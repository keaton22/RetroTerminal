document.onkeydown = function (e) {
    
    switch (e.keyCode) {
        case 38:                  // up arrow
            moveCursor("up");
            break;
        case 40:                  // down arrow
            moveCursor("down");
            break;
        case 27:
            window.history.back();
            hashChange();
        }
}

function moveCursor(direction) {
    
    if (document.querySelector(".list")) {
        
        var length = document.querySelectorAll(".list > *").length;     // get number of items in list
                
        if (direction == "down") {      // if key pressed is down arrow
            var current = document.querySelector(".list .item.selected");
            var next = document.querySelector(".list .item.selected").nextSibling;
            
            if (document.querySelector(".list .item.selected").nextSibling) {   // if not last of type
                current.className = "item";
                next.className += " selected";
                next.firstChild.focus();
                current = next;
            }
            else {
                next = document.querySelector(".list").firstChild;
                current.className = "item";
                next.className += " selected";
                next.firstChild.focus();
                current = next;
            }
        }
        
        if (direction == "up") {      // if key pressed is down arrow
            var current = document.querySelector(".list .item.selected");
            var next = document.querySelector(".list .item.selected").previousSibling;
            
            if (document.querySelector(".list .item.selected").previousSibling) {   // if not last of type
                current.className = "item";
                next.className += " selected";
                next.firstChild.focus();
                current = next;
            }
            else {
                next = document.querySelector(".list").lastChild;
                current.className = "item";
                next.className += " selected";
                next.firstChild.focus();
                current = next;
            }
        }
    }
}

//document.onkeydown = function(event) {
//    console.log(event);
//}