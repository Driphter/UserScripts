// ==UserScript==
// @name         CodeCombat Enhancements
// @namespace    https://github.com/Driphter/UserScripts
// @version      0.1
// @description  Some things intended to enhance my CodeCombat experience.
// @author       Driphter
// @match        *codecombat.com/play/level/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @updateURL    https://github.com/Driphter/UserScripts/raw/master/codecombat-enhancements.user.js
// @downloadURL  https://github.com/Driphter/UserScripts/raw/master/codecombat-enhancements.user.js
// ==/UserScript==

window.addEventListener ("DOMContentLoaded", function() {
    
    /// Utility Stuff

    var cachedElements = {};    
    var getCachedElementByClass = function(className) {
        if (cachedElements[className])
            return cachedElements[className];
        var ele = unsafeWindow.document.getElementsByClassName(className)[0];
        cachedElements[className] = ele;
        return ele;
    };
    
    
    /// Autoclick Start Level button
    
    var startLevelInterval = window.setInterval(function(){
        var startLevelButton = getCachedElementByClass("start-level-button");
        if (startLevelButton && startLevelButton.style.display == "inline-block") {
            unsafeWindow.currentView.loadingView.onClickStartLevel(); 
            unsafeWindow.currentView.loadingView.startUnveiling();
            window.clearInterval(startLevelInterval);
        }
    }, 500);
    

    /// Script Autoupdater

    var levelName = /[^/]*$/.exec(window.location.pathname)[0];
    var scriptURL = "http://localhost:8080/" + levelName + "-output.js";

    window.setInterval(function(){
        if (!unsafeWindow.currentView || 
            !unsafeWindow.currentView.tome || 
            !unsafeWindow.currentView.tome.spellView || 
            !unsafeWindow.currentView.tome.spellView.ace)
            return;
        GM_xmlhttpRequest({
            method: "GET",
            url: scriptURL,
            onload: function(response) {
                var localCode = response.responseText;
                if (!localCode)
                    return;
                var aceEditor = unsafeWindow.currentView.tome.spellView.ace;
                var cocoCode = aceEditor.getValue();
                if (cocoCode.replace(/\r/g, "").replace(/\n/g, "") != localCode.replace(/\r/g, "").replace(/\n/g, "")) {
                    //console.debug(cocoCode);
                    //console.debug(localCode);
                    aceEditor.setValue(localCode);
                    unsafeWindow.currentView.tome.spellView.recompile(_, false);
                }
            }});
    }, 5000);


    /// Execution Count Display

    var addCommas = function(num) {
        num += '';
        x = num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    window.setInterval(function(){
        var statementCountLabelDiv = getCachedElementByClass("method-label");
        if (statementCountLabelDiv) 
            statementCountLabelDiv.innerHTML = "Statement Execution Count";

        var statementCountDiv = getCachedElementByClass("method-signature");
        if (statementCountDiv) 
            statementCountDiv.innerHTML = addCommas(unsafeWindow.currentView.tome.spellView.spellThang.castAether.metrics.statementsExecuted);
    }, 1000);

});
