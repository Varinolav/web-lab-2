"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgManager = /** @class */ (function () {
    function SvgManager(dataManager, resultTableManager) {
        this.dataManager = dataManager;
        this.resultTableManager = resultTableManager;
    }
    SvgManager.prototype.drawTempPoint = function () {
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
            _this.drawTempPoint();
        });
    };
    SvgManager.prototype.drawPoint = function (x, y, r, result) {
        var svgCenterX = 250;
        var svgCenterY = 250;
        var coordinateX = svgCenterX + parseFloat(x) / parseFloat(r) * 100;
        var coordinateY = svgCenterY - parseFloat(y) / parseFloat(r) * 100;
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", coordinateX.toString());
        circle.setAttribute("cy", coordinateY.toString());
        circle.setAttribute("r", "3");
        var success = result ? "pointer__success" : "pointer__failure";
        circle.setAttribute("class", success);
        $("svg").append(circle);
    };
    SvgManager.prototype.initializePointsDrawOnStart = function () {
        var _this = this;
        jQuery(function () {
            _this.redrawPoints();
        });
    };
    SvgManager.prototype.redrawPoints = function () {
        var _this = this;
        var items = this.resultTableManager.getItems();
        items.forEach(function (item) {
            _this.drawPoint(item.x, item.y, item.r, item.hit);
        });
    };
    SvgManager.prototype.clearPoints = function () {
        $(".pointer__success, .pointer__failure").remove();
    };
    return SvgManager;
}());
exports.default = SvgManager;
