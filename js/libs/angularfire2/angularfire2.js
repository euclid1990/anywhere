var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var auth_1 = require('./providers/auth');
exports.FirebaseAuth = auth_1.FirebaseAuth;
exports.firebaseAuthConfig = auth_1.firebaseAuthConfig;
var Firebase = require('firebase');
var firebase_list_observable_1 = require('./utils/firebase_list_observable');
exports.FirebaseListObservable = firebase_list_observable_1.FirebaseListObservable;
var firebase_object_observable_1 = require('./utils/firebase_object_observable');
exports.FirebaseObjectObservable = firebase_object_observable_1.FirebaseObjectObservable;
var firebase_list_factory_1 = require('./utils/firebase_list_factory');
var firebase_object_factory_1 = require('./utils/firebase_object_factory');
var tokens_1 = require('./tokens');
var auth_backend_1 = require('./providers/auth_backend');
exports.AuthMethods = auth_backend_1.AuthMethods;
exports.AuthProviders = auth_backend_1.AuthProviders;
var firebase_sdk_auth_backend_1 = require('./providers/firebase_sdk_auth_backend');
var AngularFire = (function () {
    function AngularFire(fbUrl, auth) {
        this.fbUrl = fbUrl;
        this.auth = auth;
    }
    AngularFire.prototype.list = function (url, opts) {
        return firebase_list_factory_1.FirebaseListFactory(getAbsUrl(this.fbUrl, url), opts);
    };
    AngularFire.prototype.object = function (url, opts) {
        return firebase_object_factory_1.FirebaseObjectFactory(getAbsUrl(this.fbUrl, url), opts);
    };
    AngularFire = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(tokens_1.FirebaseUrl)), 
        __metadata('design:paramtypes', [String, auth_1.FirebaseAuth])
    ], AngularFire);
    return AngularFire;
})();
exports.AngularFire = AngularFire;
function getAbsUrl(root, url) {
    if (!(/^[a-z]+:\/\/.*/.test(url))) {
        url = root + url;
    }
    return url;
}
exports.COMMON_PROVIDERS = [
    core_1.provide(tokens_1.FirebaseRef, {
        useFactory: function (url) { return new Firebase(url); },
        deps: [tokens_1.FirebaseUrl] }),
    auth_1.FirebaseAuth,
    AngularFire
];
exports.FIREBASE_PROVIDERS = [
    exports.COMMON_PROVIDERS,
    core_1.provide(auth_backend_1.AuthBackend, {
        useFactory: function (ref) { return new firebase_sdk_auth_backend_1.FirebaseSdkAuthBackend(ref, false); },
        deps: [tokens_1.FirebaseRef]
    })
];
exports.defaultFirebase = function (url) {
    return core_1.provide(tokens_1.FirebaseUrl, {
        useValue: url
    });
};
var tokens_2 = require('./tokens');
exports.FirebaseUrl = tokens_2.FirebaseUrl;
exports.FirebaseRef = tokens_2.FirebaseRef;
exports.FirebaseAuthConfig = tokens_2.FirebaseAuthConfig;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    providers: exports.FIREBASE_PROVIDERS
};
//# sourceMappingURL=angularfire2.js.map