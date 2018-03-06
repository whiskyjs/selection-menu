webpackJsonp([1],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
chrome.runtime.onMessage.addListener(function (message, _sender, _response) {
    switch (message.type) {
        case "action.perform":
            if (message.payload.kind === "open-tab") {
                chrome.tabs.create({
                    active: true,
                    url: message.payload.url
                });
            }
            break;
    }
});

/***/ })

},[11]);