import {Component, EventEmitter, Input, Inject, ElementRef} from 'angular2/core';
import {OnInit, AfterViewInit, ViewChild} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import * as types from '../types';
import {DatabaseService} from '../services/database.service';
import {StorageService} from '../services/storage.service';
import {EmitterService} from '../services/emitter.service';
import {MapDirective} from '../directives/map.directive';

@Component({
    selector: 'div[name=map]',
    templateUrl: '/partials/map.html',
    directives: [MapDirective],
})

export class MapComponent implements OnInit, AfterViewInit {

    @ViewChild(MapDirective) private _mapDirective: MapDirective;
    @Input('user') user: any;
    public map: any;
    public geolocationLoading: boolean = false;
    public positions: Array<any> = [];
    emitter: EventEmitter<any> = EmitterService.get('channel_map');

    constructor(public elementRef: ElementRef,
                public dbService: DatabaseService,
                public storageService: StorageService) {
    }

    ngOnInit() {
        let self = this;
        this.dbService.observerUser((snapshot: any) => {
            let items = snapshot.val();
            self.positions = [];
            for (let key in items) {
                let item = items[key];
                if ((typeof item.lat != 'undefined') && (typeof item.lng != 'undefined')) {
                    let pos: types.Location = {
                        lat: item.lat,
                        lng: item.lng
                    };
                    self.positions.push(pos);
                }
            }
            self.emitter.emit(self.positions);
        });
    }

    ngAfterViewInit() {
        let self = this;
        if (self.user.lat && this.user.lng) {
            this._mapDirective.geolocation();
        }
    }

    getLocation() {
        this.geolocationLoading = true;
        this._mapDirective.geolocation();
    }

    setLocation(pos: types.Location) {
        let self = this;
        this.user.lat = pos.lat;
        this.user.lng = pos.lng;
        this.dbService.updateUser(this.user.id, this.user, (error: any) => {
            if (error) {
            } else {
                self.storageService.setUser(self.user);
                self.geolocationLoading = false;
            }
        });
    }
}