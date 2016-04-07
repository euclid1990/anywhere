import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';
import {FirebaseService} from './firebase.service';

const providers: any[] = [
    FirebaseService,
    FIREBASE_PROVIDERS,
    defaultFirebase('https://anywhere-app.firebaseio.com'),
    AngularFire
];

bootstrap(AppComponent, providers);