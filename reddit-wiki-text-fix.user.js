// ==UserScript==
// @name         Reddit Wiki Text Fix
// @namespace    https://github.com/Driphter/UserScripts
// @version      0.1.2
// @description  Fixes text in tables that becomes unreadable on Reddit wikis when night mode is enabled.
// @author       Driphter
// @match        https://*.reddit.com/r/*/wiki/*
// @grant        GM_addStyle
// @updateURL    https://github.com/Driphter/UserScripts/raw/master/reddit-wiki-text-fix.user.js
// @downloadURL  https://github.com/Driphter/UserScripts/raw/master/reddit-wiki-text-fix.user.js
// ==/UserScript==

(function(){
    
var DEFAULT_COLOR = "rgb(221,221,221)";

function toArray(arr) {
    return [].slice.call(arr);
}
   
function getTextColor() {
    var wikiDiv = toArray(document.getElementsByTagName("div"))
                      .filter(e => e.className == "md wiki")[0];
    
    if (!wikiDiv) return DEFAULT_COLOR;
    
    var p = document.createElement("p");
    wikiDiv.appendChild(p);
    var color = window.getComputedStyle(p).color;
    wikiDiv.removeChild(p);
    
    return color || DEFAULT_COLOR;
}

GM_addStyle(".md { color: " + getTextColor() + "; }");
    
})();
