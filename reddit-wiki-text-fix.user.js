// ==UserScript==
// @name         Reddit Wiki Text Fix
// @namespace    https://github.com/Driphter/UserScripts
// @version      0.1
// @description  Fixes text in tables that becomes unreadable on Reddit wikis when night mode is enabled.
// @author       Driphter
// @match        https://*.reddit.com/r/*/wiki/*
// @grant        GM_addStyle
// @updateURL    https://github.com/Driphter/UserScripts/raw/master/reddit-wiki-text-fix.user.js
// @downloadURL  https://github.com/Driphter/UserScripts/raw/master/reddit-wiki-text-fix.user.js
// ==/UserScript==

var defaultColor = "rgb(221,221,221)";

function toArray(arr) {
    return [].slice.call(arr);
}
   
function getTextColor() {
    var wikiDiv = toArray(document.getElementsByTagName("div"))
                      .filter(e => e.className == "md wiki")[0];
    
    if (!wikiDiv) return defaultColor;
    
    var p = document.createElement("p");
    wikiDiv.appendChild(p);
    var color = window.getComputedStyle(p).color;
    wikiDiv.removeChild(p);
    
    return color || defaultColor;
}

GM_addStyle(".md td, .md th { color: " + getTextColor() + "; }");
