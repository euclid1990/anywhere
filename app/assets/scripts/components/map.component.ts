import {Component, EventEmitter, Input, Inject, ElementRef} from 'angular2/core';
import {OnInit, AfterViewInit} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import * as types from '../types';
import {DatabaseService} from '../services/database.service';
import {StorageService} from '../services/storage.service';
import {EmitterService} from '../services/emitter.service';

declare var $: any;
declare var document: any;
declare var google: any;

@Component({
    selector: 'div[name=map]',
    templateUrl: '/partials/map.html',
})

export class MapComponent implements OnInit, AfterViewInit {

    public mapId: string = 'map';
    public map: any;

    constructor(public elementRef: ElementRef,
                public dbService: DatabaseService,
                public storageService: StorageService) {

    }

    ngOnInit() {
        let self = this;
        self.initMap();
    }

    ngAfterViewInit() {
        let self = this;
    }

    initMap() {
        let self = this;
        this.map = new google.maps.Map(document.getElementById(self.mapId), {
          center: {lat: 21.0227732, lng: 105.8019441},
          zoom: 12
        });
     }

    getLocation() {

    }
}