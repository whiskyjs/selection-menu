webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main types.
 */
var Action = /** @class */function () {
    function Action(text) {
        this.text = text;
    }
    Action.prototype.sendMessage = function (payload, type) {
        if (type === void 0) {
            type = "action.perform";
        }
        chrome.runtime.sendMessage({
            payload: payload,
            type: type
        });
    };
    return Action;
}();
exports.Action = Action;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(9);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = __webpack_require__(3);
var components_1 = __webpack_require__(4);
(function () {
    var mouseX;
    var mouseY;
    var selectionMenu;
    var showMenu = lib_1.debounce(function (_e) {
        var selection = window.getSelection();
        var text = selection.toString().trim();
        if (text && text.length > 1) {
            selectionMenu.show(mouseX, mouseY, text);
        }
    }, 200);
    document.addEventListener("DOMContentLoaded", function () {
        selectionMenu = new components_1.SelectionMenu();
        selectionMenu.attach();
        document.addEventListener("mousedown", function (_e) {
            selectionMenu.hide();
        });
        document.addEventListener("mouseup", function (e) {
            if (e.button === 0) {
                showMenu(e);
            }
        });
        document.addEventListener("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
    });
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
function debounce(fn, delay, combine) {
    if (combine === void 0) {
        combine = false;
    }
    var timeout;
    var args = [];
    var onComplete = function onComplete() {
        if (!combine) {
            fn.apply(void 0, __spread(args));
        } else {
            fn(args);
        }
        args = [];
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
    };
    return function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        if (!combine) {
            args = rest;
        } else {
            args.push(rest);
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(onComplete, delay);
    };
}
exports.debounce = debounce;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = __importDefault(__webpack_require__(6));
var SelectionMenu = /** @class */function () {
    function SelectionMenu() {
        this.outer = document.createElement("div");
        this.outer.dataset.chromeExtension = "selection-menu";
        this.shadowRoot = this.outer.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = SelectionMenu.containerTemplate.replace(/%inject\.css%/gm, chrome.runtime.getURL("styles/inject.css"));
        this.container = this.shadowRoot.querySelector(".container");
    }
    /**
     * Attach the root element to the document.
     */
    SelectionMenu.prototype.attach = function () {
        document.body.appendChild(this.outer);
    };
    /**
     * Show the container relative to the target coordinates. Handles edge cases.
     * @param x
     * @param y
     * @param text Currently selected text
     */
    SelectionMenu.prototype.show = function (x, y, text) {
        return __awaiter(this, void 0, void 0, function () {
            var left, top;
            return __generator(this, function (_a) {
                this.fillWithActions(text);
                if (y < this.container.offsetHeight + SelectionMenu.MARGIN_Y * 2) {
                    top = y + SelectionMenu.MARGIN_Y;
                } else {
                    top = y - SelectionMenu.MARGIN_Y - this.container.offsetHeight;
                }
                if (x < this.container.offsetWidth / 2 + SelectionMenu.MARGIN_X) {
                    left = x + SelectionMenu.CURSOR_WIDTH;
                    top = y - this.container.offsetHeight / 2;
                } else if (x + this.container.offsetWidth / 2 + SelectionMenu.MARGIN_X > window.innerWidth) {
                    left = x - this.container.offsetWidth - SelectionMenu.MARGIN_X - SelectionMenu.CURSOR_WIDTH;
                    top = y - this.container.offsetHeight / 2;
                } else {
                    left = x - this.container.offsetWidth / 2;
                }
                this.position(left, top);
                this.container.classList.add("container--visible");
                return [2 /*return*/];
            });
        });
    };
    /**
     * Hide the container outside viewport.
     */
    SelectionMenu.prototype.hide = function () {
        var _this = this;
        this.container.classList.remove("container--visible");
        setTimeout(function () {
            _this.position(-9999, -9999);
            _this.clearActions();
        }, 100);
    };
    /**
     * Set left and top of the container element.
     * @param x
     * @param y
     */
    SelectionMenu.prototype.position = function (x, y) {
        this.container.style.left = window.pageXOffset + x + "px";
        this.container.style.top = window.pageYOffset + y + "px";
    };
    /**
     * Fill the container with action elements and set event handlers.
     * The only currently supported action event is click.
     * @param text Currently selected text
     */
    SelectionMenu.prototype.fillWithActions = function (text) {
        var _this = this;
        var separator = this.createSeparator();
        var _loop_1 = function _loop_1(klass) {
            var action = new klass(text);
            var actionElement = document.createElement("a");
            actionElement.href = "#";
            actionElement.classList.add("container__action");
            var bound = action.bind(actionElement);
            if (!bound) {
                actionElement.textContent = chrome.i18n.getMessage("action_" + action.uid + "_name");
                try {
                    for (var _a = __values(["mousedown", "mouseup"]), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var event_1 = _b.value;
                        actionElement.addEventListener(event_1, this_1.silenceEvent);
                    }
                } catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                } finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    } finally {
                        if (e_1) throw e_1.error;
                    }
                }
                actionElement.addEventListener("click", function (e) {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    e.preventDefault();
                                    return [4 /*yield*/, action.perform()];
                                case 1:
                                    _a.sent();
                                    this.clearSelection();
                                    this.hide();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            this_1.container.appendChild(actionElement);
            if (klass !== actions_1.default[actions_1.default.length - 1]) {
                this_1.container.appendChild(separator.cloneNode(true));
            }
            var e_1, _c;
        };
        var this_1 = this;
        try {
            for (var actions_2 = __values(actions_1.default), actions_2_1 = actions_2.next(); !actions_2_1.done; actions_2_1 = actions_2.next()) {
                var klass = actions_2_1.value;
                _loop_1(klass);
            }
        } catch (e_2_1) {
            e_2 = { error: e_2_1 };
        } finally {
            try {
                if (actions_2_1 && !actions_2_1.done && (_a = actions_2.return)) _a.call(actions_2);
            } finally {
                if (e_2) throw e_2.error;
            }
        }
        var e_2, _a;
    };
    /**
     * Remove all action elements from the container.
     */
    SelectionMenu.prototype.clearActions = function () {
        this.container.innerHTML = "";
    };
    /**
     * Stop propagation of an event.
     * @param e
     */
    SelectionMenu.prototype.silenceEvent = function (e) {
        e.stopPropagation();
    };
    /**
     * Clear the selection in the document.
     */
    SelectionMenu.prototype.clearSelection = function () {
        window.getSelection().removeAllRanges();
    };
    /**
     * Creates separator element for action menu.
     */
    SelectionMenu.prototype.createSeparator = function () {
        var separatorElement = document.createElement("div");
        separatorElement.classList.add("container__separator");
        var separatorInnerElement = document.createElement("div");
        separatorInnerElement.classList.add("container__separator-inner");
        separatorElement.appendChild(separatorInnerElement);
        return separatorElement;
    };
    SelectionMenu.CURSOR_WIDTH = 20;
    SelectionMenu.MARGIN_Y = 8;
    SelectionMenu.MARGIN_X = 8;
    SelectionMenu.containerTemplate = "\n    <link rel=\"stylesheet\" type=\"text/css\" href=%inject.css%>\n    <div class=\"container\" style=\"opacity: 0\">\n    </div>\n    ";
    return SelectionMenu;
}();
exports.SelectionMenu = SelectionMenu;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var copy_to_clipboard_1 = __webpack_require__(7);
var search_in_google_1 = __webpack_require__(8);
exports.default = [search_in_google_1.SearchInGoogle,
// tslint:disable-next-line:object-literal-sort-keys
copy_to_clipboard_1.CopyToClipboardAction];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(0);
var CopyToClipboardAction = /** @class */function (_super) {
    __extends(CopyToClipboardAction, _super);
    function CopyToClipboardAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CopyToClipboardAction.prototype, "uid", {
        get: function get() {
            return "copy_to_clipboard";
        },
        enumerable: true,
        configurable: true
    });
    CopyToClipboardAction.prototype.bind = function (_a) {
        return false;
    };
    CopyToClipboardAction.prototype.perform = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                document.execCommand("copy");
                return [2 /*return*/];
            });
        });
    };
    return CopyToClipboardAction;
}(types_1.Action);
exports.CopyToClipboardAction = CopyToClipboardAction;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(0);
var SearchInGoogle = /** @class */function (_super) {
    __extends(SearchInGoogle, _super);
    function SearchInGoogle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SearchInGoogle.prototype, "uid", {
        get: function get() {
            return "search_in_google";
        },
        enumerable: true,
        configurable: true
    });
    SearchInGoogle.prototype.bind = function (_a) {
        return false;
    };
    SearchInGoogle.prototype.perform = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.sendMessage({
                    kind: "search",
                    url: SearchInGoogle.pattern.replace(/%term%/gm, encodeURIComponent(this.text))
                });
                return [2 /*return*/];
            });
        });
    };
    SearchInGoogle.pattern = "http://www.google.com/search?q=%term%";
    return SearchInGoogle;
}(types_1.Action);
exports.SearchInGoogle = SearchInGoogle;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "styles/inject.css";

/***/ })
],[1]);