// ==UserScript==
// @name         pikpak_changer
// @namespace    https://github.com/LmonZero/Tampermonkey-Script/pikpak.js
// @version      0.1
// @description  try to take over the world!
// @author       lmon
// @match        https://mypikpak.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_cookie
// ==/UserScript==

function onload(funcs) {
    for (let func of funcs) {
        if (document.readyState === "complete") {
            func();
        } else {
            window.addEventListener("load", func)
        }
    }

}

async function cookie() {
    const deviceid = await GM.cookie.list({ name: "deviceid" });

    let uuid = crypto.randomUUID();
    let deviceid_value = deviceid[0].value;

    let newDeviceid = deviceid_value.slice(0, 24) + uuid.slice(24) + deviceid_value.slice(36);

    await GM_cookie.delete({ name: deviceid[0].name });

    await GM.cookie.set({
        name: deviceid[0].name,
        domain: deviceid[0].domain,
        path: deviceid[0].path,
        value: newDeviceid
    })

    console.log("change ok !!!!!!!!!!!");

}
(function () {
    'use strict';

    // Your code here...
    onload([cookie]);

})();