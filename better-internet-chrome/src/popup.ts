
let currentButtonState: ButtonState = 'ready'

let collectButton = document.getElementById('collectButton') as SVGCircleElement | null

let tmppac: string[] = []

chrome.storage.local.set({ 'traffic': [] as string[] })

if (collectButton) {
    chrome.storage.local.get(items => {
        let cur = items['state'] as ButtonState
        if (cur == 'ready') {
            collectButton!.style.fill = 'green'
            collectButton!.onclick = () => {
                // chrome.tabs.getSelected(tab => {
                //     chrome.tabs.reload(tab.id!)
                // })
                collectButton!.style.fill = 'red'
                chrome.storage.local.set({ 'pac': [] })
                chrome.storage.local.set({ 'state': 'collecting' })
            }
        } else {
            collectButton!.style.fill = 'red'
            collectButton!.onclick = () => {
                collectButton!.style.fill = 'green'
                chrome.storage.local.set({ 'state': 'ready' })
                chrome.tabs.create({ url: './options.html' })
            }
        }
    })
}
