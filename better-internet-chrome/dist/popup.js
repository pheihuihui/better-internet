"use strict";
let currentButtonState = 'ready';
let collectButton = document.getElementById('collectButton');
let tmppac = [];
chrome.storage.local.set({ 'traffic': [] });
if (collectButton) {
    chrome.storage.local.get(items => {
        let cur = items['state'];
        if (cur == 'ready') {
            collectButton.style.fill = 'green';
            collectButton.onclick = () => {
                collectButton.style.fill = 'red';
                chrome.storage.local.set({ 'pac': [] });
                chrome.storage.local.set({ 'state': 'collecting' });
            };
        }
        else {
            collectButton.style.fill = 'red';
            collectButton.onclick = () => {
                collectButton.style.fill = 'green';
                chrome.storage.local.set({ 'state': 'ready' });
                chrome.tabs.create({ url: './options.html' });
            };
        }
    });
}
