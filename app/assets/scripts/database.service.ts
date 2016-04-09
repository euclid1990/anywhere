import {Injectable, Inject} from 'angular2/core';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, FirebaseListObservable, FirebaseRef} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import * as types from './types';

const DATABASE_REFERENCE = 'https://anywhere-app.firebaseio.com';
const TABLE_NAMES = ['users', 'messages'];

type tableDetail = {
    name: string;
}

interface tableArray<T> {
    [index: string]: T;
}

interface refArray {
    [index: string]: any;
}

@Injectable()
export class DatabaseService {

    public static dbRef: string = DATABASE_REFERENCE;

    public tables: tableArray<tableDetail> = Object.create(null);
    public refs: refArray = Object.create(null);
    public users: FirebaseListObservable<any[]>;
    public messages: FirebaseListObservable<any[]>;

    constructor(private angularFire: AngularFire, @Inject(FirebaseRef) private firebaseRef: any) {
        this.mapTable();
        this.init();
    }

    init() {
        let ref = this.firebaseRef;
        for (let table in this.tables) {
            ref.child(table).once('value', function(snapshot) {
                if (!snapshot.exists()) {
                    let struct = new Object;
                    struct[table] = {};
                    ref.child(table).set(struct);
                }
            });
            this[table] = this.angularFire.list('/' + table);
        }
    }

    mapTable() {
        let ref = this.firebaseRef;
        for (let name of TABLE_NAMES) {
            this.tables[name] = <tableDetail>({ name: name });
            this.refs[name] = ref.child(`/${name}`);
        }
    }

    fire() {
        return this.angularFire;
    }

    ref() {
        return this.firebaseRef;
    }

    getUsers(): FirebaseListObservable<any[]> {
        return this.users;
    }

    findUser(key: string, callback: (snapshot: any) => any) {
        return this.refs['users'].child(`/${key}`).once('value', callback);
    }

    saveUser(user: types.User) {
        return this.users.add(user);
    }

    getMessages(): FirebaseListObservable<any[]> {
        return this.messages;
    }

    saveMessage(message: types.Message) {
        return this.messages.add(message);
    }

    deleteMessage(key: string) {
        console.log(key);
        return this.messages.remove(key);
    }

    clearMessages() {
        return this.refs['messages'].remove();
    }
}