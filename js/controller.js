var data;                           // the json
var template;                       // the html
var meta = {};                      // allow passing of metadata between functions
var requiredTemplates;              // each page (json) has templates
var templatesLoaded = 0;            // keep a count of those templates so we know when the page is complete

// make an ajax call
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

// handle data (json)
function dataHandler(response) {
    data = JSON.parse(response.responseText);
    console.groupCollapsed("got data from " + data.page + ".json");

    for(i = 0; i < data.templates.length; i++) {
        var type = data.templates[i].type;
        var value = data.templates[i].value;
        var source = data.source;

        // run "ajax" function to get correct template, replaces switch statement
        ajax(baseURL + "/html/_" + type + ".html", "GET", templateHandler, {"type": type, "value": value, "source": source});
        console.log("page has a " + type);
    }
    requiredTemplates = data.templates.length;
}

// handle template (html)
function templateHandler(response, meta) {
    template = response.responseText;
    console.groupCollapsed("got template _" + meta.type + ".html");

    document.body.classList.add('template-' + meta.type);               // add a 'template-' class for each currently in-use template

    // run appropriate "write" function depending on template type ( writeWelcome(), writeMenu(), or writeNote() )
    eval("write" + meta.type.charAt(0).toUpperCase() + meta.type.slice(1) + "(template, meta);");

    console.log("injected _" + meta.type + ".html into page");
    templateLoaded();
    console.groupEnd();
}

// write welcome
function writeWelcome(template, meta) {
    document.querySelector("#main").innerHTML += template;
    document.querySelector("." + meta.type).innerHTML = meta.value;
    console.log("injected data into " + meta.type);
}

// write menu
function writeMenu(template, meta) {
    document.querySelector("#main").innerHTML += template;

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
            loadPage(this.getAttribute("data-location"));
        });

        meta.value[i].location && li.addEventListener("keydown", function (e) {                   // keydown event for action
            if (e.which == 13) {                                                                  // if enter key is pressed
                loadPage(this.getAttribute("data-location"));
            }
        });

        // click event listener for menu items with an action or location
        (meta.value[i].action || meta.value[i].location) && li.addEventListener("click", function () {
            if(document.querySelector(".menu .item.selected")) {                        // if there's already a selected menu item
                document.querySelector(".menu .item.selected").className = "item";      // deselect it
            }
            this.className += " selected";                                              // and select the current menu item
            menuItemSelected(this);                                                     // do the thing the menu item says it does
        });

        // keydown event listener for menu items with an action or location
        (meta.value[i].action || meta.value[i].location) && li.addEventListener("keydown", function (e) {
            if (e.which == 13) {                                                        // if enter key is pressed
                menuItemSelected(this);                                                 // do the thing the menu item says it does
            }
        });

        li.appendChild(text);                                                           // put text in <li> elements
        document.querySelector("." + meta.type).appendChild(li);                        // put <li> elements in .menu
        console.log("injected \"" + meta.value[i].label + "\" into " + meta.type);
    }

    document.querySelector("." + meta.type + " ." + li.className).className += " selected";
    document.querySelector("." + meta.type + " ." + li.className).focus();
}

function writeNote(template, meta) {
    document.querySelector("#main").innerHTML += template;
    document.querySelector("." + meta.type).innerHTML = meta.value;
    document.querySelector("." + meta.type).setAttribute("data-source", meta.source);
    console.log("injected data into " + meta.type);
}

function templateLoaded() {
    templatesLoaded++;

    if(templatesLoaded === requiredTemplates) {
        templatesLoaded = 0;
        console.groupEnd();
        console.info('all templates loaded successfully!');
        console.groupEnd();
        pageLoaded();
    }
}
