System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var DatetimePipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DatetimePipe = (function () {
                function DatetimePipe() {
                }
                DatetimePipe.prototype.transform = function (value, _a) {
                    var exponent = _a[0];
                    var dt = new Date(value), d = this.twodigit(dt.getDate()), m = this.twodigit(dt.getMonth() + 1), y = dt.getFullYear(), h = this.twodigit(dt.getHours()), i = this.twodigit(dt.getMinutes()), s = this.twodigit(dt.getSeconds());
                    return (d + "/" + m + "/" + y + " " + h + ":" + i + ":" + s);
                };
                DatetimePipe.prototype.twodigit = function (value) {
                    return ("0" + value).slice(-2);
                };
                DatetimePipe = __decorate([
                    core_1.Pipe({ name: 'datetime' }), 
                    __metadata('design:paramtypes', [])
                ], DatetimePipe);
                return DatetimePipe;
            }());
            exports_1("DatetimePipe", DatetimePipe);
        }
    }
});
