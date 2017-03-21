// ==UserScript==
// @name         Youtube Big Theater Mode
// @namespace    https://github.com/Driphter/UserScripts
// @version      0.1
// @description  Make Theater Mode use space more efficiently. (super-hackey)
// @author       Driphter
// @match        https://www.youtube.com/watch?v=*
// @grant        none
// @updateURL    https://github.com/Driphter/UserScripts/raw/master/youtube-big-theater-mode.user.js
// @downloadURL  https://github.com/Driphter/UserScripts/raw/master/youtube-big-theater-mode.user.js
// ==/UserScript==
(function() {
    'use strict';
    window.setInterval(function() {
        var theaterMode = (document.getElementsByClassName("watch-non-stage-mode").length === 0);
        
        var bodyContainer = document.getElementById("body-container");
        if (bodyContainer === null) {
            console.error("Body Container Element not found.");
            return;
        }
        var mastheadContainer = document.getElementById("yt-masthead-container");
        if (mastheadContainer === null) {
            console.error("Masthead Container Element not found.");
            return;
        }
        var content = document.getElementById("content");
        if (content === null) {
            console.error("Content Element not found.");
            return;
        }
        var theaterBackground = document.getElementById("theater-background");
        if (theaterBackground === null) {
            console.error("Theater Background Element not found.");
            return;
        }
        var playerApi = document.getElementsByClassName("player-api");
        if (playerApi.length != 2) {
            console.error(playerApi.length + "Player API Elements found, should only be 2.");
            return;
        }
        var playerApi2 = playerApi[1];
        playerApi = playerApi[0];
        var placeholderPlayer = document.getElementById("placeholder-player");
        if (placeholderPlayer === null) {
            console.error("Placeholder Player Element not found.");
            return;
        }
        var moviePlayer = document.getElementById("movie_player");
        if (moviePlayer === null) {
            console.error("Movie Player Element not found.");
            return;
        }
        var video = document.getElementsByTagName("video");
        if (video.length != 1) {
            console.error(video.length + " video elements found, should only be 1.");
            return;
        }
        video = video[0];

        var winHeight = window.innerHeight - mastheadContainer.offsetHeight;
        var winWidth = bodyContainer.offsetWidth;
        var aspectRatio = video.clientWidth / video.clientHeight;
        var width = winHeight * aspectRatio;
        if (width > winWidth)
            width = winWidth;
        var height = Math.floor(width / aspectRatio) + "px";
        var margin = Math.floor((winWidth - width) / 2) + "px";
        width = Math.floor(width) + "px";
        
        var adjustSize = function(el, useMargin, lockWidth) {
            if (false){//!lol) {
                console.log(el);
                console.log("  height: " + el.style.height +
                            ", width: " + el.style.width +
                            ", Top: " + el.style.top +
                            ", Left: " + el.style.left +
                            ", mLeft: " + el.style.marginLeft +
                            ", mRight: " + el.style.marginRight +
                            ", mTop: " + el.style.marginTop +
                            ", mBottom: " + el.style.marginBottom);
            }
            el.style.marginLeft = theaterMode ? "0px" : null;
            el.style.marginRight = theaterMode ? "0px" : null;
            el.style.marginTop = theaterMode ? "0px" : null;
            if (theaterMode || el !== video) {
                el.style.height = theaterMode ? height : null;
                if (el !== theaterBackground) {
                    el.style.width = theaterMode ? width : null;
                    el.style.marginBottom = theaterMode ? "0px" : null;
                }
                if (el !== content)
                    el.style.top = theaterMode ? "0px" : null;
                if (el === playerApi || el === playerApi2)
                    el.style.left = theaterMode ? margin : null;
                else
                    el.style.left = theaterMode ? "0px" : null;
            }
        };
        
        adjustSize(content);
        adjustSize(theaterBackground, false, true);
        adjustSize(playerApi);
        adjustSize(placeholderPlayer);
        adjustSize(moviePlayer);
        adjustSize(video, true);
    }, 1000);
})();
