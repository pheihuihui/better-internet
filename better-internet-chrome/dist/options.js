"use strict";
let dis = document.getElementById('displayPanel');
chrome.storage.local.get(items => {
    let pac = items['pac'];
    let domains = sortRequests(pac);
    let txt = "";
    for (const it of domains) {
        txt += it + '\n';
    }
    dis.innerText = txt;
});
function sortRequests(recs) {
    let st = {};
    let tmp = recs.map(item => getDomain(item.url));
    let domains = new Set(tmp);
    return domains;
}
function getDomain(url) {
    var _a;
    let a = (_a = url.split('//')[1]) === null || _a === void 0 ? void 0 : _a.split('/')[0];
    return a == undefined ? 'invalid' : a;
}
