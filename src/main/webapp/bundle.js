(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (process){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var ResultTableManager = /** @class */ (function () {
    function ResultTableManager(table) {
        this.pageSize = 5;
        this.curPage = 1;
        this.storageKey = 'results';
        this.allItems = [];
        this.table = table;
        this.updateFromBean();
        this.renderTable();
        this.updatePaginationButtons();
    }
    ResultTableManager.prototype.nextPage = function () {
        if (this.curPage < this.getTotalPages())
            this.curPage++;
        this.renderTable();
        this.updatePaginationButtons();
    };
    ResultTableManager.prototype.clearTable = function () {
        process.env;
        this.allItems = [];
        $.ajax({
            url: config_1.default.path + "action=clear",
            type: "GET",
            dataType: "json",
            success: function (response) {
                if (response.error != null) {
                    alert("Ответ не получен");
                    console.log(response);
                    return;
                }
            },
        });
        this.renderTable();
        this.updatePaginationButtons();
    };
    ResultTableManager.prototype.previousPage = function () {
        if (this.curPage > 1)
            this.curPage--;
        this.renderTable();
        this.updatePaginationButtons();
    };
    ResultTableManager.prototype.getTotalPages = function () {
        return Math.ceil(this.allItems.length / this.pageSize);
    };
    ResultTableManager.prototype.addData = function (data) {
        this.allItems.push(data);
        this.curPage = this.getTotalPages();
        this.renderTable();
        this.updatePaginationButtons();
    };
    ResultTableManager.prototype.getCurrentPageData = function () {
        var startIndex = (this.curPage - 1) * this.pageSize;
        var endIndex = startIndex + this.pageSize;
        return this.allItems.slice(startIndex, endIndex);
    };
    ResultTableManager.prototype.updateFromBean = function () {
        var tbody = this.table.querySelector('#result-tbody');
        if (!tbody)
            return;
        var rows = tbody.querySelectorAll('tr');
        var items = [].map.call(rows, function (row) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            var cells = row.querySelectorAll('td');
            return {
                x: (_c = (_b = (_a = cells[0]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '',
                y: (_f = (_e = (_d = cells[1]) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : '',
                r: (_j = (_h = (_g = cells[2]) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.trim()) !== null && _j !== void 0 ? _j : '',
                hit: ((_l = (_k = cells[3]) === null || _k === void 0 ? void 0 : _k.textContent) === null || _l === void 0 ? void 0 : _l.trim().toLowerCase()) === 'да',
                now: (_p = (_o = (_m = cells[4]) === null || _m === void 0 ? void 0 : _m.textContent) === null || _o === void 0 ? void 0 : _o.trim()) !== null && _p !== void 0 ? _p : ''
            };
        });
        this.allItems = items;
        tbody.innerHTML = '';
    };
    ResultTableManager.prototype.renderTable = function () {
        var tbody = this.table.querySelector('#result-tbody');
        tbody.innerHTML = '';
        var currentData = this.getCurrentPageData().sort(function (a, b) {
            var dateA = new Date(a.now);
            var dateB = new Date(b.now);
            return dateA.getTime() - dateB.getTime();
        });
        currentData.forEach(function (item) {
            var row = tbody.insertRow();
            row.insertCell(0).textContent = item.x;
            row.insertCell(1).textContent = item.y;
            row.insertCell(2).textContent = item.r;
            row.insertCell(3).textContent = item.hit ? 'Да' : 'Нет';
            row.insertCell(4).textContent = item.now;
        });
    };
    ResultTableManager.prototype.updatePaginationButtons = function () {
        var totalPages = this.getTotalPages();
        var prevBtn = $("#prev-btn");
        var nextBtn = $("#next-btn");
        var clearBtn = $("#clear-btn");
        if (this.curPage <= 1 || totalPages === 0) {
            prevBtn.prop('disabled', true);
            prevBtn.addClass("disabled");
        }
        else {
            prevBtn.prop('disabled', false);
            prevBtn.removeClass("disabled");
        }
        if (this.curPage >= totalPages || totalPages === 0) {
            nextBtn.prop('disabled', true);
            nextBtn.addClass("disabled");
        }
        else {
            nextBtn.prop('disabled', false);
            nextBtn.removeClass("disabled");
        }
        if (this.allItems.length === 0) {
            clearBtn.prop("disabled", true);
            clearBtn.addClass("disabled");
        }
        else {
            clearBtn.prop("disabled", false);
            clearBtn.removeClass("disabled");
        }
    };
    return ResultTableManager;
}());
exports.default = ResultTableManager;

}).call(this)}).call(this,require('_process'))
},{"./config":5,"_process":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgManager = /** @class */ (function () {
    function SvgManager(dataManager) {
        this.dataManager = dataManager;
    }
    SvgManager.prototype.drawPoint = function () {
        if (!this.dataManager.isValid()) {
            return;
        }
        var svgCenterX = 250;
        var svgCenterY = 250;
        var coordinateX = svgCenterX + parseFloat(this.dataManager.x) / parseFloat(this.dataManager.r) * 100;
        var coordinateY = svgCenterY - parseFloat(this.dataManager.y) / parseFloat(this.dataManager.r) * 100;
        var point = $("#pointer");
        point.attr('cx', "" + coordinateX);
        point.attr('cy', "" + coordinateY);
        point.attr('visibility', 'visible');
    };
    SvgManager.prototype.initializeSvgClick = function () {
        var _this = this;
        $("svg").on("click", function (event) {
            if (!_this.dataManager.r) {
                alert("Сначала выберите значение R");
                return;
            }
            var svg = event.currentTarget;
            var rect = svg.getBoundingClientRect();
            var svgX = event.clientX - rect.left;
            var svgY = event.clientY - rect.top;
            var svgCenterX = 250;
            var svgCenterY = 250;
            var scale = 100;
            var mathX = (svgX - svgCenterX) / scale * parseFloat(_this.dataManager.r);
            var mathY = (svgCenterY - svgY) / scale * parseFloat(_this.dataManager.r);
            _this.dataManager.x = mathX.toString();
            _this.dataManager.y = mathY.toString();
            _this.drawPoint();
        });
    };
    return SvgManager;
}());
exports.default = SvgManager;

},{}],4:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var App = /** @class */ (function () {
    function App(tableManager, dataManager, svgManager) {
        this.tableManager = tableManager;
        this.dataManager = dataManager;
        this.svgManager = svgManager;
    }
    App.prototype.initializeListeners = function () {
        this.initializeInputButtons();
        this.initializePointDrawing();
        this.initializeTableButtons();
        this.initializeInputButtonsSelection();
        this.initializeServerRequesting();
        this.svgManager.initializeSvgClick();
    };
    App.prototype.initializeInputButtons = function () {
        var _this = this;
        $("input[name=Y-input]").on("input", function (event) {
            _this.dataManager.y = $(event.target).val();
        });
        $("input[name=X-button]").on("click", function (event) {
            _this.dataManager.x = $(event.target).val();
        });
        $("input[name=R-button]").on("click", function (event) {
            _this.dataManager.r = $(event.target).val();
        });
    };
    App.prototype.initializePointDrawing = function () {
        var _this = this;
        $("input[name=X-button]").on("click", function () { return _this.svgManager.drawPoint(); });
        $("input[name=R-button]").on("click", function () { return _this.svgManager.drawPoint(); });
        $("input[name=Y-input]").on("input", function () { return _this.svgManager.drawPoint(); });
    };
    App.prototype.initializeTableButtons = function () {
        var _this = this;
        $("#prev-btn").on("click", function () { return _this.tableManager.previousPage(); });
        $("#next-btn").on("click", function () { return _this.tableManager.nextPage(); });
        $("#clear-btn").on("click", function () { return _this.tableManager.clearTable(); });
    };
    App.prototype.initializeInputButtonsSelection = function () {
        var _this = this;
        $("input[name=X-button]").on("click", function (event) {
            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                _this.dataManager.x = null;
            }
            else {
                $("input[name=X-button]").removeClass("selected");
                $(event.target).addClass("selected");
            }
        });
        $("input[name=R-button]").on("click", function (event) {
            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                _this.dataManager.r = null;
            }
            else {
                $("input[name=R-button]").removeClass("selected");
                $(event.target).addClass("selected");
            }
        });
    };
    App.prototype.initializeServerRequesting = function () {
        var _this = this;
        $("input[name=check-button]").on("click", function () {
            if (!_this.dataManager.isValid()) {
                alert("Некорректные данные");
                return;
            }
            var data = _this.dataManager.getData();
            data["action"] = "submit";
            $.ajax({
                url: config_1.default.path + $.param(data),
                type: "GET",
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response.statusCode !== 200) {
                        alert(response.error);
                        return;
                    }
                    var rowData = __assign(__assign({}, data), { hit: response.result, now: response.now });
                    _this.tableManager.addData(rowData);
                },
                error: function (response) {
                    alert(response.message);
                }
            });
        });
    };
    return App;
}());
exports.default = App;

},{"./config":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    path: '/server?'
};

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataManager = /** @class */ (function () {
    function DataManager() {
    }
    Object.defineProperty(DataManager.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (value) {
            this._r = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    DataManager.prototype.getData = function () {
        return { x: this.x, y: this.y, r: this.r };
    };
    DataManager.prototype.isValid = function () {
        return this.x !== null && this.r !== null && this.y != null && this.y != "";
    };
    return DataManager;
}());
exports.default = DataManager;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var dataManager_1 = require("./dataManager");
var ResultTableManager_1 = require("./ResultTableManager");
var SvgManager_1 = require("./SvgManager");
var dataManager = new dataManager_1.default();
var table = document.getElementById("result-table");
var tableManager = new ResultTableManager_1.default(table);
var svgManager = new SvgManager_1.default(dataManager);
new app_1.default(tableManager, dataManager, svgManager).initializeListeners();

},{"./ResultTableManager":2,"./SvgManager":3,"./app":4,"./dataManager":6}]},{},[7]);
