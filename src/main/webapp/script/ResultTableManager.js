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
