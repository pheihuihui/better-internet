
chrome.storage.local.get(items => {
    let pac = items['pac'] as RawRecord[]
    let dis = document.getElementById('displayPanel')!
    let st = sortRequests(pac)
    //ReactDOM.render(<UrlList domains={st} pac={[]} />, document.getElementById('displayPanel'))
})



function sortRequests(recs: RawRecord[]) {
    let st: DomainStatistics = {}
    let tmp = recs.map(item => getDomain(item.url))
    let latest = 0
    if (recs.length > 1) {
        latest = recs.map(item => item.timeStamp).reduce((a, b) => a > b ? a : b)
    }
    let domains = new Set(tmp)
    for (const domain of domains) {
        let filteredRecs = recs.filter(u => getDomain(u.url) == domain)
        let tmpids = filteredRecs.map(u => u.requestID)
        let ids = new Set(tmpids)
        for (const id of ids) {
            let pair = filteredRecs.filter(u => u.requestID == id)
            let detail = getDetailsFromPair(pair, latest)
            if (st.hasOwnProperty(domain)) {
                st[domain].push(detail)
            } else {
                st[domain] = [detail]
            }
        }
    }
    return st
}

function getDomain(url: string) {
    let a = url.split('//')[1]?.split('/')[0]
    return a == undefined ? 'invalid' : a
}

function getDetailsFromPair(recs: RawRecord[], current: number): RequestDetails {
    let size = recs.length
    if (size == 0) {
        return {
            requestID: -1,
            url: 'empty',
            timeSpent: -1,
            resultStatus: 'error'
        }
    } else if (size == 1) {
        let rec = recs[0]
        return {
            requestID: Number(rec.requestID),
            url: rec.url,
            timeSpent: current - rec.timeStamp,
            resultStatus: 'error',
            comments: recs
        }
    } else if (size == 2) {
        let id = recs[0].requestID
        let tmp = recs[0].timeStamp - recs[1].timeStamp
        let time = tmp < 0 ? -tmp : tmp
        let codes = recs.map(u => u.statusCode).filter(u => u != undefined && u > 400) as number[]
        let err = codes.length > 1
        if (err) {
            return {
                requestID: Number(id),
                url: recs[0].url,
                timeSpent: time,
                resultStatus: 'error',
                comments: recs
            }
        } else return {
            requestID: Number(id),
            url: recs[0].url,
            timeSpent: time,
            resultStatus: 'success'
        }
    } else {
        let id = recs[0].requestID
        return {
            requestID: Number(id),
            url: recs[0].url,
            timeSpent: -1,
            resultStatus: 'error',
            comments: recs
        }
    }
}

function printDetails(detail: RequestDetails) {
    return `${detail.requestID}: \n\t${detail.timeSpent}\t${detail.resultStatus} \n\t${detail.url}\n`
}

function sortDomains(list: string[]) {
    return list.sort((a, b) => {
        let fst = a.split('.').reverse()
        let scd = b.split('.').reverse()
        while (fst.length <= 8) {
            fst.push('')
        }
        while (scd.length <= 8) {
            scd.push('')
        }
        fst.reverse()
        scd.reverse()
        let res = 0
        let cur = 1
        for (let u = 0; u <= 8; u++) {
            res += fst[u].localeCompare(scd[u]) * cur
            cur *= 2
        }
        return res
    })
}
