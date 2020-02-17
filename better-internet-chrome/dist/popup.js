"use strict";
var currentButtonState = 'ready';
var collectButton = document.getElementById('collectButton');
chrome.storage.local.set({ 'traffic': [] });
chrome.webRequest.onBeforeRequest.addListener(function (req) {
    console.log(req.url);
}, { urls: [] }, []);
if (collectButton) {
    collectButton.style.fill = 'green';
    collectButton.onclick = function () {
        if (currentButtonState == 'ready') {
            chrome.tabs.getSelected(function (tab) {
                chrome.tabs.reload(tab.id);
                collectButton.style.fill = 'red';
                currentButtonState = 'collecting';
            });
        }
        else if (currentButtonState == 'collecting') {
            currentButtonState = 'finished';
            collectButton.style.fill = 'blue';
        }
        else {
            chrome.storage.local.clear();
            chrome.storage.local.set({ 'mess': 'hello tab' });
            currentButtonState = 'ready';
            collectButton.style.fill = 'green';
            chrome.tabs.create({ url: './options.html' });
        }
    };
}
