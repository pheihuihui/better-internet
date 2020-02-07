"use strict";
var analyzeButton = document.getElementById('StartAnalyze');
var jumpButton = document.getElementById('jumpToOptions');
if (analyzeButton) {
    analyzeButton.onclick = function () {
        chrome.tabs.getSelected(function (tab) {
            chrome.windows.get(tab.windowId, function (wd) { });
        });
    };
}
if (jumpButton) {
    jumpButton.onclick = function () {
        chrome.tabs.create({ url: './options.html' });
    };
}
