
// ==UserScript==
// @name         Remove Specific Event Listeners
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Block visibilitychange, resize, blur, hashchange, and orientationchange event listeners.
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Danh sách các sự kiện cần chặn
    const blockedEvents = ['visibilitychange', 'resize', 'blur', 'hashchange', 'orientationchange'];

    // Ghi đè hàm addEventListener để chặn các sự kiện
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (type, listener, options) {
        if (blockedEvents.includes(type)) {
            console.log(`Blocked ${type} listener`);
            return; // Không cho phép thêm sự kiện
        }
        originalAddEventListener.call(this, type, listener, options);
    };

    // Ghi đè hàm removeEventListener để ghi log
    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.removeEventListener = function (type, listener, options) {
        console.log(`Removed ${type} listener`);
        originalRemoveEventListener.call(this, type, listener, options);
    };

    console.log(`Tampermonkey script running. Blocked events: ${blockedEvents.join(', ')}`);
})();
