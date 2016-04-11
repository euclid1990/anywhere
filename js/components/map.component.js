System.register(['angular2/core', '../services/database.service', '../services/storage.service', '../services/emitter.service', '../directives/map.directive'], function(exports_1, context_1) {
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
    var core_1, core_2, database_service_1, storage_service_1, emitter_service_1, map_directive_1;
    var MapComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (emitter_service_1_1) {
                emitter_service_1 = emitter_service_1_1;
            },
            function (map_directive_1_1) {
                map_directive_1 = map_directive_1_1;
            }],
        execute: function() {
            MapComponent = (function () {
                function MapComponent(elementRef, dbService, storageService) {
                    this.elementRef = elementRef;
                    this.dbService = dbService;
                    this.storageService = storageService;
                    this.geolocationLoading = false;
                    this.positions = [];
                    this.emitter = emitter_service_1.EmitterService.get('channel_map');
                }
                MapComponent.prototype.ngOnInit = function () {
                    var self = this;
                    this.dbService.observerUser(function (snapshot) {
                        var items = snapshot.val();
                        self.positions = [];
                        for (var key in items) {
                            var item = items[key];
                            if ((typeof item.lat != 'undefined') && (typeof item.lng != 'undefined')) {
                                var pos = {
                                    lat: item.lat,
                                    lng: item.lng
                                };
                                self.positions.push(pos);
                            }
                        }
                        self.emitter.emit(self.positions);
                    });
                };
                MapComponent.prototype.ngAfterViewInit = function () {
                    var self = this;
                    if (self.user.lat && this.user.lng) {
                        this._mapDirective.geolocation();
                    }
                };
                MapComponent.prototype.getLocation = function () {
                    this.geolocationLoading = true;
                    this._mapDirective.geolocation();
                };
                MapComponent.prototype.setLocation = function (pos) {
                    var self = this;
                    this.user.lat = pos.lat;
                    this.user.lng = pos.lng;
                    this.dbService.updateUser(this.user.id, this.user, function (error) {
                        if (error) {
                        }
                        else {
                            self.storageService.setUser(self.user);
                            self.geolocationLoading = false;
                        }
                    });
                };
                __decorate([
                    core_2.ViewChild(map_directive_1.MapDirective), 
                    __metadata('design:type', map_directive_1.MapDirective)
                ], MapComponent.prototype, "_mapDirective", void 0);
                __decorate([
                    core_1.Input('user'), 
                    __metadata('design:type', Object)
                ], MapComponent.prototype, "user", void 0);
                MapComponent = __decorate([
                    core_1.Component({
                        selector: 'div[name=map]',
                        templateUrl: '/anywhere/partials/map.html',
                        directives: [map_directive_1.MapDirective],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, database_service_1.DatabaseService, storage_service_1.StorageService])
                ], MapComponent);
                return MapComponent;
            }());
            exports_1("MapComponent", MapComponent);
        }
    }
});
