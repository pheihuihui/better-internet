
let currentButtonState: ButtonState = 'ready'

let collectButton = document.getElementById('collectButton') as SVGCircleElement | null

chrome.storage.local.set({ 'traffic': [] as string[] })
chrome.webRequest.onBeforeRequest.addListener(req => {
    // chrome.storage.local.get(['traffic'], items => {

    // })
    console.log(req.url)
}, { urls: [] }, [])

if (collectButton) {
    collectButton.style.fill = 'green'
    collectButton.onclick = function () {
        if (currentButtonState == 'ready') {
            chrome.tabs.getSelected(function (tab) {
                chrome.tabs.reload(tab.id!)
                collectButton!.style.fill = 'red'
                //collecting
                currentButtonState = 'collecting'
                //alert(tab.id!)
            })
        } else if (currentButtonState == 'collecting') {
            currentButtonState = 'finished'
            collectButton!.style.fill = 'blue'
        } else {
            chrome.storage.local.clear()
            chrome.storage.local.set({ 'mess': 'hello tab' })
            currentButtonState = 'ready'
            collectButton!.style.fill = 'green'
            chrome.tabs.create({ url: './options.html' })
        }
    }
}
