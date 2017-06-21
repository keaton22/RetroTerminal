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
        
        // run "ajax" function to get correct template, replaces switch statement
        ajax("html/_" + type +".html", "GET", templateHandler, {"type": type, "value": value});
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
        var elem = document.createElement(meta.value[i].type);
        var text = document.createTextNode(meta.value[i].label);
        li.className = "item";
        
        switch (meta.value[i].type) {
            case "a":
                elem.setAttribute("href", meta.value[i].location);
                elem.setAttribute("data-name", (meta.value[i].name || ""));
                elem.setAttribute("data-result", (meta.value[i].result || ""));
                break;
            case "button":
                elem.setAttribute("data-name", (meta.value[i].name || ""));
                elem.setAttribute("data-value", (meta.value[i].value || ""));
                elem.setAttribute("data-action", (meta.value[i].action || ""));
                elem.setAttribute("data-result", (meta.value[i].result || ""));
                break;
        }        
        
        elem.appendChild(text);
        li.appendChild(elem);
        document.querySelector("." + meta.type).appendChild(li);
        console.log("injected \"" + meta.value[i].label + "\" into menu");
    }
    
    document.querySelector(".menu .item").className += " selected";
    document.querySelector(".menu .item").firstChild.focus();
}

function writeNote(template, meta) {
    document.querySelector("#main").innerHTML += template;
    document.querySelector("." + meta.type).innerHTML = meta.value;
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