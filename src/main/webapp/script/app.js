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
        this.svgManager.initializePointsDrawOnStart();
    };
    App.prototype.initializeInputButtons = function () {
        var _this = this;
        $("input[name=Y-input]").on("input", function (event) {
            _this.dataManager.y = $(event.target).val();
        });
        $("input[name=X-button]").on("click", function (event) {
            _this.dataManager.x = $(event.target).val();
        });
        $("input[name=R-radio]").on("click", function (event) {
            _this.dataManager.r = $(event.target).val();
        });
    };
    App.prototype.initializePointDrawing = function () {
        var _this = this;
        $("input[name=X-button]").on("click", function () { return _this.svgManager.drawTempPoint(); });
        $("input[name=R-button]").on("click", function () { return _this.svgManager.drawTempPoint(); });
        $("input[name=Y-input]").on("input", function () { return _this.svgManager.drawTempPoint(); });
    };
    App.prototype.initializeTableButtons = function () {
        var _this = this;
        $("#prev-btn").on("click", function () { return _this.tableManager.previousPage(); });
        $("#next-btn").on("click", function () { return _this.tableManager.nextPage(); });
        $("#clear-btn").on("click", function () {
            _this.tableManager.clearTable();
            _this.svgManager.clearPoints();
        });
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
                    _this.svgManager.drawPoint(data.x, data.y, data.r, response.result);
                },
                error: function (response) {
                    console.log(response);
                    alert(response.responseJSON.error);
                }
            });
        });
    };
    return App;
}());
exports.default = App;
