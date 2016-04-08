import {Component, OnInit, Inject, ElementRef} from 'angular2/core';
import {ChatComponent} from './chat.component';
import {MapComponent} from './map.component';
import {ModalDirective} from './modal.directive';
import {StorageService} from './storage.service';
import {DatabaseService} from './database.service';

declare var $: any;
type User = {
    id: string;
    name: string;
}

@Component({
    selector: 'app',
    templateUrl: '/partials/app.html',
    directives: [ChatComponent, MapComponent, ModalDirective]
})

export class AppComponent implements OnInit {

    public user: User;
    public signupAction: string = ModalDirective.CLOSE;
    public elementRef: ElementRef;

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
        $(document).foundation();
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