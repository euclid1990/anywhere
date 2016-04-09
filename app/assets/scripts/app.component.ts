import {Component, OnInit, Inject, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {ChatComponent} from './chat.component';
import {MapComponent} from './map.component';
import {ModalDirective} from './modal.directive';
import {StorageService} from './storage.service';
import {DatabaseService} from './database.service';
import * as types from './types';

declare var $: any;

@Component({
    selector: 'app',
    templateUrl: '/partials/app.html',
    directives: [ChatComponent, MapComponent, ModalDirective]
})

export class AppComponent implements OnInit {

    public user: types.User;
    public signupAction: string = ModalDirective.CLOSE;
    public elementRef: ElementRef;
    public clock: number;
    public interval: any;

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
        this.interval = setInterval(() => {
            self.clock = Date.now();
        }, 1000);
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