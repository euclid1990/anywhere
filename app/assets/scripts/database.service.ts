import {Injectable, Inject} from 'angular2/core';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, FirebaseListObservable, FirebaseRef} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

const DATABASE_REFERENCE = 'https://anywhere-app.firebaseio.com';
const TABLE_NAMES = ['users', 'messages'];

type tableDetail = {
    name: string;
}

type User = {
    name: string;
}

type Message = {
    user_id: string;
    user_name: string;
    content: string;
}

interface tableArray<T> {
    [index: string]: T;
}

@Injectable()
export class DatabaseService {

    public static dbRef: string = DATABASE_REFERENCE;

    public tables: tableArray<tableDetail> = { };
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
        for (let name of TABLE_NAMES) {
            this.tables[name] = <tableDetail>({ name: name });
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

    saveUser(user: User) {
        return this.users.add(user);
    }

    getMessages(): FirebaseListObservable<any[]> {
        return this.messages;
    }

    saveMessage(message: Message) {
        return this.messages.add(message);
    }
}