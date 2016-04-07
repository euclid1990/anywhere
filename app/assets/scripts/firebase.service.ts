import {Component, Injectable} from 'angular2/core';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

const DATABASE_REFERENCE = 'https://anywhere-app.firebaseio.com';

@Injectable()
export class FirebaseService {

    constructor(private angularFire: AngularFire) {
        console.log(angularFire);
    }
}