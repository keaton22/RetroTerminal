var setResultTimeout;                                                       // a timer for removing the result text
var drawFaviconInterval;                                                    // a recurring task to make the favicon blink


// GET COLOR

function getColor() {                                                       // a function for getting the current theme color
    var name = localStorage.getItem('colorName');                               // get the color's name
    var value = localStorage.getItem('colorValue');                             // get the color's value (hex, rgb, or whatever the value was stored as)

    return {'name': name, 'value': value};                                      // return an array of the color's name and value
}



// SET COLOR

function setColor(name, value) {

    // remove all css classes from <body> that start with 'color-' and add css class for the new color being set
    var matchedColorClass = new RegExp('color-(.*)+', 'g');                 // declare regex variable for 'color-'

    for (var i = 0; i < document.body.classList.length; i++) {               // iterate through all css classes applied to the <body>
        if (matchedColorClass.test(document.body.classList[i])) {            // if the current css class starts with 'color-'
            document.body.classList.remove(document.body.classList[i]);     // remove that css class
        }
    }
    document.body.classList.add('color-' + name);                           // add a 'color-' class for each currently in-use template

    document.querySelector('STYLE').innerHTML = 'html { color: ' + value + ' !important; }';        // set color

    localStorage.setItem('colorName', name);
    localStorage.setItem('colorValue', value);

    drawFavicon();

    console.log('%ccolor set to ' + name + ' (' + value + ')', 'color: ' + value + '; background-image: linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,.8) 100%); background-color: ' + value + '; padding: 2px;');
}

function setDifficulty(label, value) {
    localStorage.setItem('difficultyLabel', label);                 // get the label (the item's name displayed in the menu)
    localStorage.setItem('difficultyValue', parseInt(value));       // get the value and convert it to an integer

    if (parseInt(value) === 0) {
        console.log('difficulty turned off (' + value + ')');
    } else {
        console.log('difficulty set to ' + value + ' (' + label + ')');
    }

    console.groupEnd();
}



// SET RESULT TEXT

function setResult(status) {

    if (status) {
        document.querySelector('.result .status').innerHTML = status;
        clearTimeout(setResultTimeout);
        setResultTimeout = setTimeout(function () {
            clearResult();
        }, 5000);
    }
}



// CLEAR RESULT TEXT

function clearResult() {
    document.querySelector('.result .status').innerHTML = '';
}



// DRAW FAVICON

function drawFavicon() {                                        // draw (or redraw) the page's favicon
    var faviconBlinkToggler = true;

    clearInterval(drawFaviconInterval);

    drawFaviconInterval = setInterval(function () {
        var canvas = document.createElement('canvas');                  // create a new canvas in the DOM (but not in the page because that's not necessary)
        var ctx = canvas.getContext('2d');                              // give the canvas a 2D context
        canvas.width = 16;                                              // set the pixel width of the canvas
        canvas.height = 16;                                             // set the pixel height of the canvas

        ctx.fillStyle = getColor().value;                               // set the fill color to the theme color
        ctx.fillRect(0, 0, 15, 15);                                     // draw a full-size square in the favicon using the theme color
        ctx.fillStyle = 'rgba(0,0,0,.8)';                               // set the fill color to transparent black
        ctx.fillRect(0, 0, 15, 15);                                     // draw a full-size square in the favicon using the transparent black

        ctx.strokeStyle = getColor().value;                             // set the fill color to the theme color
        ctx.beginPath();                                                // initialize the path for the angle bracket shape
        ctx.moveTo(2, 8);                                               // starting poing for the angle bracket shape
        ctx.lineTo(4, 10);                                              // connect starting point and middle point
        ctx.lineTo(2, 12);                                              // connect middle point and end point
        ctx.stroke();                                                   // apply stroke color to the finished angle bracket shape

        if (faviconBlinkToggler) {                                      // the "on" state for the blink
            ctx.fillStyle = getColor().value;                               // set the fill color to the theme color
        } else {                                                        // the "off" state for the blink
            ctx.fillStyle = 'transparent';                                  // set the fill color to transparent
        }
        ctx.fillRect(7, 7, 6, 6);                                       // draw a blinking square in the bottom-right corner of the favicon using the theme color

        faviconBlinkToggler = !faviconBlinkToggler;                     // toggle the blink state

        var data = canvas.toDataURL('image/png');                       // get the base64 data for the graphics drawn above (in a PNG format)
        document.querySelector('#favicon').setAttribute('href', data)   // write that base64 data to the href of the #favicon element inside the page's <head>
    }, 415);
}



// DO ACTION (ACTION PROVIDED BY A MENU ITEM)

function doAction(elem) {                                   // a menu item has been pressed (via enter key)/clicked on
    var name = elem.getAttribute('data-name');
    var label = elem.getAttribute('data-label');
    var action = elem.getAttribute('data-action') || '';
    var value = elem.getAttribute('data-value') || '';

    switch (action) {
        case 'playFallout':
        case 'lockTerminal':
        case 'exitToDesktop':
        case 'reboot':
        case 'shutdown':
            ajax('php/actions.php?action=' + action, 'GET', function (response) {});
            break;
        case 'moveCursor':
            moveCursor(parseInt(value));
            break;
        case 'setColor':
            setColor(name, value);
            break;
        case 'setDifficulty':
            setDifficulty(label, value);
            break;
    }
}
