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
    var core_1, core_2;
    var AutosizeDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            AutosizeDirective = (function () {
                function AutosizeDirective(el, renderer) {
                    this.selector = $(el.nativeElement);
                    if (typeof autosize != 'undefined') {
                        autosize(this.selector);
                    }
                }
                Object.defineProperty(AutosizeDirective.prototype, "content", {
                    set: function (value) {
                        if ((typeof autosize != 'undefined') && (value == null)) {
                            autosize.update(this.selector);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                AutosizeDirective.prototype.changeAutosize = function ($event) {
                    /*
                    if (typeof autosize != 'undefined') {
                        autosize(this.selector);
                        this.selector.val('');
                    }
                    */
                };
                __decorate([
                    core_2.Input('autosizeUpdate'), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], AutosizeDirective.prototype, "content", null);
                AutosizeDirective = __decorate([
                    core_1.Directive({
                        selector: '[autosize]',
                        host: {
                            '(keyup.enter)': 'changeAutosize($event)'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], AutosizeDirective);
                return AutosizeDirective;
            }());
            exports_1("AutosizeDirective", AutosizeDirective);
        }
    }
});
