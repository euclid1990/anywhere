import {Component} from 'angular2/core';
import {ChatComponent} from './chat.component';
import {MapComponent} from './map.component';

@Component({
    selector: 'app',
    templateUrl: '/partials/app.html',
    directives: [ChatComponent, MapComponent]
})

export class AppComponent {}