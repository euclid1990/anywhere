import {Component, OnInit, Inject, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import * as types from '../types';
import {ModalDirective} from '../directives/modal.directive';
import {DatabaseService} from '../services/database.service';
import {StorageService} from '../services/storage.service';
import {DatetimePipe} from '../pipes/datetime.pipe';
import {ChatComponent} from './chat.component';
import {MapComponent} from './map.component';

declare var $: any;

@Component({
    selector: 'app',
    templateUrl: '/partials/app.html',
    directives: [ChatComponent, MapComponent, ModalDirective],
    pipes: [DatetimePipe]
})

export class AppComponent implements OnInit {

    public user: types.User;
    public signupAction: string = ModalDirective.CLOSE;
    public elementRef: ElementRef;
    public clock: number;
    public intervalId: any;

    constructor(@Inject(ElementRef)  elementRef: ElementRef,
                public dbService: DatabaseService,
                public storageService: StorageService) {
        let user = this.storageService.getUser();
        if (!user) {
            this.user = { id: null, name: null };
            this.signupAction = ModalDirective.OPEN;
        } else {
            this.user = user;
        }
        this.clock = Date.now();
    }

    ngOnInit() {
        let self = this;
        $(document).foundation();
        if (this.user.id) {
            this.dbService.findUser(this.user.id, (snapshot: any) => {
                if (!snapshot.exists()) {
                    self.storageService.removeUser();
                    self.signupAction = ModalDirective.OPEN;
                }
            });
        }
        this.intervalId = setInterval(() => {
            self.clock = Date.now();
        }, 1000);
    }

    stopInterval()  {
        clearInterval(this.intervalId);
    }

    setUser() {
        let self = this;
        this.signupAction = ModalDirective.CLOSE;
        this.dbService.saveUser(this.user).then(function(response: any) {
            self.user.id = response.key();
            self.storageService.setUser(self.user);
        }, function(error) {
            console.error(error);
        });
    }
}