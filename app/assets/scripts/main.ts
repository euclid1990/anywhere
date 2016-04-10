import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './components/app.component';
import {StorageService} from './services/storage.service';
import {DatabaseService} from './services/database.service';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, FirebaseRef} from 'angularfire2';

const providers: any[] = [
    StorageService,
    DatabaseService,
    FIREBASE_PROVIDERS,
    defaultFirebase(DatabaseService.dbRef),
    AngularFire
];

bootstrap(AppComponent, providers);