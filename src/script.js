﻿//@ts-check
/// <reference path="../node_modules/@types/jquery/index.d.ts" />

console.log('aaa')

$(function () {
    page_overview();
});

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
// @ts-ignore
injectScript(chrome.extension.getURL('/dashboard.js'), 'body');

function page_overview() {
    if (location.pathname !== '/dashboard/overview') {
        return;
    }

    const clickReadmoreButtonIfExist = setInterval(() => {
        if ($('p button').length) {
            $('p button').click();
            clearInterval(clickReadmoreButtonIfExist);
        }
    }, 1000);
}