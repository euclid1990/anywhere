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
    var HANOI, MapDirective;
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
            HANOI = { lat: 21.0227732, lng: 105.8019441 };
            MapDirective = (function () {
                function MapDirective(el, renderer) {
                    this.el = el;
                    this.myMarker = null;
                    // Map listens for directive event
                    this.onGeolocationChange = new core_2.EventEmitter();
                    this.emitter = emitter_service_1.EmitterService.get('channel_map');
                    var self = this;
                    this.selector = $(el.nativeElement);
                    this.map = new google.maps.Map(self.el.nativeElement, {
                        center: HANOI,
                        zoom: 12
                    });
                    this.emitter.subscribe(function (positions) {
                        self.clearMarkers();
                        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
                            var position = positions_1[_i];
                            self.addMarker(position, "other", self.map);
                        }
                    });
                }
                MapDirective.prototype.geolocation = function () {
                    var self = this;
                    try {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            if (self.myMarker) {
                                self.myMarker.setMap(null);
                            }
                            self.myMarker = new google.maps.Marker({
                                position: pos,
                                map: self.map,
                                title: 'Me!'
                            });
                            self.map.setCenter(pos);
                            self.onGeolocationChange.emit(pos);
                        }, function () {
                            self.handleLocationError(true, self.map);
                        });
                    }
                    catch (e) {
                        self.handleLocationError(false, self.map);
                    }
                };
                MapDirective.prototype.handleLocationError = function (browserHasGeolocation, map) {
                    this.infoWindow = !this.infoWindow ? new google.maps.InfoWindow({ map: map }) : this.infoWindow;
                    this.infoWindow.setPosition(map.getCenter());
                    this.infoWindow.setContent(browserHasGeolocation ?
                        'Error: Location service is not allowed.' :
                        'Error: Your browser doesn\'t support geolocation.');
                };
                MapDirective.prototype.addMarker = function (pos, title, map) {
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map
                    });
                    this.markers.push(marker);
                };
                MapDirective.prototype.setMapOnAll = function (map) {
                    for (var i in this.markers) {
                        this.markers[i].setMap(map);
                    }
                };
                MapDirective.prototype.clearMarkers = function () {
                    this.setMapOnAll(null);
                    this.markers = [];
                };
                __decorate([
                    core_2.Output(),
                    __metadata('design:type', Object)
                ], MapDirective.prototype, "onGeolocationChange", void 0);
                MapDirective = __decorate([
                    core_1.Directive({
                        selector: '[id=map]'
                    }),
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], MapDirective);
                return MapDirective;
            }());
            exports_1("MapDirective", MapDirective);
        }
    }
});
