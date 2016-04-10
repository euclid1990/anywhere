import {Injectable} from 'angular2/core';

const USER_KEY = 'user';

declare var simpleStorage: any;

type User = {
    name: string;
}

@Injectable()
export class StorageService {

    private storage: any = null;

    constructor() {
        this.storage = simpleStorage;
    }

    getUser(): any {
        let user = this.storage.get(USER_KEY);
        if (typeof user == 'undefined') {
            return false;
        }
        return user;
    }

    setUser(user: User): any {
        return this.storage.set(USER_KEY, user);
    }

    removeUser(): any {
        return this.storage.deleteKey(USER_KEY);
    }
}