System.register(['angular2/core', '../directives/modal.directive', '../services/database.service', '../services/storage.service', '../pipes/datetime.pipe', './chat.component', './map.component'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, modal_directive_1, database_service_1, storage_service_1, datetime_pipe_1, chat_component_1, map_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modal_directive_1_1) {
                modal_directive_1 = modal_directive_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (datetime_pipe_1_1) {
                datetime_pipe_1 = datetime_pipe_1_1;
            },
            function (chat_component_1_1) {
                chat_component_1 = chat_component_1_1;
            },
            function (map_component_1_1) {
                map_component_1 = map_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(elementRef, dbService, storageService) {
                    this.dbService = dbService;
                    this.storageService = storageService;
                    this.signupAction = modal_directive_1.ModalDirective.CLOSE;
                    var user = this.storageService.getUser();
                    if (!user) {
                        this.user = { id: null, name: null, lat: null, lng: null };
                        this.signupAction = modal_directive_1.ModalDirective.OPEN;
                    }
                    else {
                        this.user = user;
                    }
                    this.clock = Date.now();
                }
                AppComponent.prototype.ngOnInit = function () {
                    var self = this;
                    $(document).foundation();
                    if (this.user.id) {
                        this.dbService.findUser(this.user.id, function (snapshot) {
                            if (!snapshot.exists()) {
                                self.storageService.removeUser();
                                self.signupAction = modal_directive_1.ModalDirective.OPEN;
                            }
                        });
                    }
                    this.intervalId = setInterval(function () {
                        self.clock = Date.now();
                    }, 1000);
                };
                AppComponent.prototype.ngAfterViewInit = function () {
                    if (this.signupAction == modal_directive_1.ModalDirective.CLOSE) {
                        this._chatComponent.focus();
                    }
                };
                AppComponent.prototype.stopInterval = function () {
                    clearInterval(this.intervalId);
                };
                AppComponent.prototype.setUser = function () {
                    var self = this;
                    this.signupAction = modal_directive_1.ModalDirective.CLOSE;
                    this.dbService.saveUser(this.user).then(function (response) {
                        self.user.id = response.key();
                        self.storageService.setUser(self.user);
                        self._chatComponent.focus();
                    }, function (error) {
                        console.error(error);
                    });
                };
                __decorate([
                    core_1.ViewChild(chat_component_1.ChatComponent), 
                    __metadata('design:type', chat_component_1.ChatComponent)
                ], AppComponent.prototype, "_chatComponent", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: '/anywhere/partials/app.html',
                        directives: [chat_component_1.ChatComponent, map_component_1.MapComponent, modal_directive_1.ModalDirective],
                        pipes: [datetime_pipe_1.DatetimePipe]
                    }),
                    __param(0, core_1.Inject(core_1.ElementRef)), 
                    __metadata('design:paramtypes', [core_1.ElementRef, database_service_1.DatabaseService, storage_service_1.StorageService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
