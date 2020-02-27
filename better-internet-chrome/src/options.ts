let dis = document.getElementById('displayPanel')!

chrome.storage.local.get(items => {
    let pac = items['pac'] as RawRecord[]
    let domains = sortRequests(pac)
    //let txt = pac.map(item => `{${item.requestID}: ${item.statusCode}: ${item.timeStamp}: ${item.url}}`).join('\n')
    let txt = ""
    for (const it of domains) {
        txt += it + '\n'
    }
    dis.innerText = txt
})

function sortRequests(recs: RawRecord[]) {
    let st: DomainStatistics = {}
    let tmp = recs.map(item => getDomain(item.url))
    let domains = new Set(tmp)
    return domains
}

function getDomain(url: string) {
    let a = url.split('//')[1]?.split('/')[0]
    return a == undefined ? 'invalid' : a
}