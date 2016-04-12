import {Directive, ElementRef, Renderer} from 'angular2/core';
import {Input, Output, EventEmitter} from 'angular2/core';
import {EmitterService} from '../services/emitter.service';
import {Observable} from 'rxjs/Rx';
import * as types from '../types';

declare var $: any;
declare var document: any;
declare var google: any;
declare var navigator: any;

const HANOI = { lat: 21.0227732, lng: 105.8019441 }

@Directive({
    selector: '[id=map]'
})

export class MapDirective {

    public map: any;
    public infoWindow: any;
    public myMarker: any = null;
    public markers: Array<any>;
    private selector: any;
    // Map listens for directive event
    @Output() onGeolocationChange = new EventEmitter<types.Location>();
    emitter: EventEmitter<any> = EmitterService.get('channel_map');

    constructor(public el: ElementRef, renderer: Renderer) {
        let self = this;
        this.selector = $(el.nativeElement);
        this.map = new google.maps.Map(self.el.nativeElement, {
            center: HANOI,
            zoom: 12
        });
        this.emitter.subscribe(positions => {
            self.clearMarkers();
            for (let position of positions) {
                self.addMarker(position, "other", self.map);
            }
        });
    }

    geolocation() {
        let self = this;
        try {
            navigator.geolocation.getCurrentPosition(function(position) {
                let pos: types.Location = {
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
            }, function() {
                self.handleLocationError(true, self.map);
            });
        } catch (e) {
            self.handleLocationError(false, self.map);
        }
    }

    handleLocationError(browserHasGeolocation: boolean, map: any) {
        this.infoWindow = !this.infoWindow ? new google.maps.InfoWindow({ map: map }) : this.infoWindow;
        this.infoWindow.setPosition(map.getCenter());
        this.infoWindow.setContent(browserHasGeolocation ?
            'Error: Location service is not allowed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

    addMarker(pos: types.Location, title: string, map: any) {
        let marker = new google.maps.Marker({
            position: pos,
            map: map
        });
        this.markers.push(marker);
    }

    setMapOnAll(map) {
        for (let i in this.markers) {
            this.markers[i].setMap(map);
        }
    }

    clearMarkers() {
        this.setMapOnAll(null);
        this.markers = [];
    }
}