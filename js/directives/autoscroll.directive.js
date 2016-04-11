System.register(['angular2/core', '../services/emitter.service'], function(exports_1, context_1) {
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
    var core_1, core_2, emitter_service_1;
    var AutoscrollDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (emitter_service_1_1) {
                emitter_service_1 = emitter_service_1_1;
            }],
        execute: function() {
            AutoscrollDirective = (function () {
                function AutoscrollDirective(el, renderer) {
                    this.emitter = emitter_service_1.EmitterService.get('channel_autoscroll');
                    var self = this;
                    this.selector = $(el.nativeElement);
                    this.autoscroll(this.selector);
                    this.emitter.subscribe(function (update) {
                        if (update) {
                            self.autoscroll(self.selector);
                        }
                    });
                }
                Object.defineProperty(AutoscrollDirective.prototype, "content", {
                    set: function (value) {
                        if (value) {
                            this.autoscroll(this.selector);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                AutoscrollDirective.prototype.autoscroll = function (selector) {
                    selector.animate({ scrollTop: selector.prop('scrollHeight') }, 0);
                };
                __decorate([
                    core_2.Input('autoscrollUpdate'), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], AutoscrollDirective.prototype, "content", null);
                AutoscrollDirective = __decorate([
                    core_1.Directive({
                        selector: '[autoscroll]'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], AutoscrollDirective);
                return AutoscrollDirective;
            }());
            exports_1("AutoscrollDirective", AutoscrollDirective);
        }
    }
});
