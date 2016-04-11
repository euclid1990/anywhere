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
    var ModalDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            ModalDirective = (function () {
                function ModalDirective(el, renderer) {
                    this.selector = $(el.nativeElement);
                }
                Object.defineProperty(ModalDirective.prototype, "activity", {
                    set: function (value) {
                        if (value !== ModalDirective.OPEN && value !== ModalDirective.CLOSE) {
                            return;
                        }
                        this.selector.foundation(value);
                        if (value == ModalDirective.OPEN) {
                            this.selector.find('input[name="username"]').focus();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ModalDirective.OPEN = 'open';
                ModalDirective.CLOSE = 'close';
                __decorate([
                    core_2.Input('modalActivity'), 
                    __metadata('design:type', String), 
                    __metadata('design:paramtypes', [String])
                ], ModalDirective.prototype, "activity", null);
                ModalDirective = __decorate([
                    core_1.Directive({
                        selector: '[modal]',
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], ModalDirective);
                return ModalDirective;
            }());
            exports_1("ModalDirective", ModalDirective);
        }
    }
});
