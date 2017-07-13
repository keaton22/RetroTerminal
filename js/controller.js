var data;
var template;
var meta = new Object();
var requiredTemplates;
var templatesLoaded = 0;

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

// handle data
function dataHandler(response) {
    data = JSON.parse(response.responseText);
    console.groupCollapsed("got data from " + data.page + ".json");

    for(i = 0; i < data.templates.length; i++) {
        var type = data.templates[i].type;
        var value = data.templates[i].value;
        var source = data.source;

        // run "ajax" function to get correct template, replaces switch statement
        ajax("html/_" + type +".html", "GET", templateHandler, {"type": type, "value": value, "source": source});
        console.log("page has a " + type);
    }
    requiredTemplates = data.templates.length;
}

// handle template
function templateHandler(response, meta) {
    template = response.responseText;
    console.groupCollapsed("got template _" + meta.type + ".html");

    // run correct "write" function, replaces switch statement
    eval("write" + meta.type.charAt(0).toUpperCase() + meta.type.slice(1) + "(template, meta);");
    document.body.className += " template-" + meta.type;
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

        li.setAttribute("data-name", (meta.value[i].name || ""));                                     // set name (required)

        // the logic below only allows attributes that exist to be created
        meta.value[i].location && li.setAttribute("data-location", meta.value[i].location);           // set location
        meta.value[i].action && li.setAttribute("data-action", (meta.value[i].action));               // set action
        meta.value[i].value && li.setAttribute("data-value", (meta.value[i].value));                  // set value
        meta.value[i].result && li.setAttribute("data-result", (meta.value[i].result));               // set result

        meta.value[i].action && li.addEventListener("click", function () {                            // click event for action
            menuItemSelected(this);
        });

        meta.value[i].action && li.addEventListener("keydown", function (e) {                         // keydown event for action
            if (e.which == 13) {                                                                      // if enter key is pressed
                menuItemSelected(this);
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
