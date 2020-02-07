let analyzeButton = document.getElementById('StartAnalyze')
let jumpButton = document.getElementById('jumpToOptions')
if (analyzeButton) {
    analyzeButton.onclick = function () {
        chrome.tabs.getSelected(function (tab) {
            chrome.windows.get(tab.windowId!, (wd) => { })
        })
    }
}

if (jumpButton) {
    jumpButton.onclick = function () {
        chrome.tabs.create({ url: './options.html' })
    }
}