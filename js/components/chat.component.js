System.register(['angular2/core', '../directives/autosize.directive', '../directives/autoscroll.directive', '../services/database.service', '../services/emitter.service'], function(exports_1, context_1) {
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
    var core_1, autosize_directive_1, autoscroll_directive_1, database_service_1, emitter_service_1;
    var ChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (autosize_directive_1_1) {
                autosize_directive_1 = autosize_directive_1_1;
            },
            function (autoscroll_directive_1_1) {
                autoscroll_directive_1 = autoscroll_directive_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            },
            function (emitter_service_1_1) {
                emitter_service_1 = emitter_service_1_1;
            }],
        execute: function() {
            ChatComponent = (function () {
                function ChatComponent(elementRef, dbService) {
                    this.elementRef = elementRef;
                    this.dbService = dbService;
                    this.isLoading = true;
                    this.total = null;
                    this.sent = false;
                    this.messages = this.dbService.getMessages();
                    this.iMessage = null;
                    this.emitterAutoscroll = emitter_service_1.EmitterService.get('channel_autoscroll');
                }
                ChatComponent.prototype.ngOnInit = function () {
                    var self = this;
                    this.messages.subscribe(function (l) {
                        self.isLoading = false;
                        self.total = l.length;
                        self.emitterAutoscroll.emit(true);
                    });
                };
                ChatComponent.prototype.focus = function () {
                    $(this.elementRef.nativeElement).find('textarea').focus();
                };
                ChatComponent.prototype.send = function (message) {
                    message = message.replace(/^\s+|\s+$/g, '');
                    if (message.length) {
                        var self_1 = this;
                        var msgObj = {
                            user_id: this.user.id,
                            user_name: this.user.name,
                            content: message
                        };
                        this.dbService.saveMessage(msgObj).then(function (response) {
                        }, function (error) {
                            console.error(error);
                        });
                    }
                    this.iMessage = null;
                };
                ChatComponent.prototype.remove = function (key, userId) {
                    if (userId !== this.user.id || this.user.id == null) {
                        return false;
                    }
                    return this.dbService.deleteMessage(key).then(function (response) {
                    }, function (error) {
                        console.error(error);
                    });
                };
                ChatComponent.prototype.clearAll = function () {
                    return this.dbService.clearMessages();
                };
                __decorate([
                    core_1.Input('user'), 
                    __metadata('design:type', Object)
                ], ChatComponent.prototype, "user", void 0);
                ChatComponent = __decorate([
                    core_1.Component({
                        selector: 'div[name=chat]',
                        templateUrl: '/anywhere/partials/chat.html',
                        providers: [emitter_service_1.EmitterService],
                        directives: [autosize_directive_1.AutosizeDirective, autoscroll_directive_1.AutoscrollDirective],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, database_service_1.DatabaseService])
                ], ChatComponent);
                return ChatComponent;
            }());
            exports_1("ChatComponent", ChatComponent);
        }
    }
});
