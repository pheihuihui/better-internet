"use strict";
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
                conditions: [new chrome.declarativeContent.PageStateMatcher({})],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }]);
    });
    chrome.storage.local.set({ 'pac': [] });
    chrome.storage.local.set({ 'state': 'ready' });
    chrome.webRequest.onBeforeRequest.addListener(listn_req, { urls: [] }, []);
    chrome.webRequest.onCompleted.addListener(listn_comp, { urls: [] }, []);
    chrome.webRequest.onErrorOccurred.addListener(listn_err, { urls: [] }, []);
    chrome.runtime.onConnect.addListener(() => {
        console.log('connect');
    });
});
let listn_req = (req) => {
    let st = chrome.storage.local.get(items => {
        let cur = items['state'];
        let pac = items['pac'];
        if (cur == 'collecting') {
            console.log('req');
            console.log(req);
            pac.push({
                requestID: req.requestId,
                recordType: 'start',
                url: req.url,
                timeStamp: req.timeStamp
            });
            chrome.storage.local.set({ 'pac': pac });
            console.log('');
        }
    });
};
let listn_comp = (detail) => {
    let st = chrome.storage.local.get(items => {
        let cur = items['state'];
        let pac = items['pac'];
        if (cur == 'collecting') {
            console.log('complete');
            console.log(detail);
            pac.push({
                requestID: detail.requestId,
                recordType: 'complete',
                url: detail.url,
                timeStamp: detail.timeStamp,
                statusCode: detail.statusCode
            });
            chrome.storage.local.set({ 'pac': pac });
            console.log('');
        }
    });
};
let listn_err = (detail) => {
    let st = chrome.storage.local.get(items => {
        let cur = items['state'];
        let pac = items['pac'];
        if (cur == 'collecting') {
            console.log('error');
            console.log(detail);
            pac.push({
                requestID: detail.requestId,
                recordType: 'error',
                url: detail.url,
                timeStamp: detail.timeStamp,
                statusCode: detail.statusCode
            });
            chrome.storage.local.set({ 'pac': pac });
            console.log('');
        }
    });
};
