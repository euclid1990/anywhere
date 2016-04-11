var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var auth_backend_1 = require('./auth_backend');
var tokens_1 = require('../tokens');
var utils_1 = require('../utils/utils');
var Firebase = require('firebase');
var FirebaseSdkAuthBackend = (function (_super) {
    __extends(FirebaseSdkAuthBackend, _super);
    function FirebaseSdkAuthBackend(_fbRef, _webWorkerMode) {
        if (_webWorkerMode === void 0) { _webWorkerMode = false; }
        _super.call(this);
        this._fbRef = _fbRef;
        this._webWorkerMode = _webWorkerMode;
    }
    FirebaseSdkAuthBackend.prototype.onAuth = function (onComplete) {
        this._fbRef.onAuth(onComplete);
    };
    FirebaseSdkAuthBackend.prototype.getAuth = function () {
        return this._fbRef.getAuth();
    };
    FirebaseSdkAuthBackend.prototype.unauth = function () {
        this._fbRef.unauth();
    };
    FirebaseSdkAuthBackend.prototype.authWithCustomToken = function (token, options) {
        var _this = this;
        var p = new Promise(function (res, rej) {
            _this._fbRef.authWithCustomToken(token, _this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    };
    FirebaseSdkAuthBackend.prototype.authAnonymously = function (options) {
        var _this = this;
        var p = new Promise(function (res, rej) {
            _this._fbRef.authAnonymously(_this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    };
    FirebaseSdkAuthBackend.prototype.authWithPassword = function (credentials, options) {
        var _this = this;
        var p = new Promise(function (res, rej) {
            _this._fbRef.authWithPassword(credentials, _this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthPopup = function (provider, options) {
        var _this = this;
        var p = new Promise(function (res, rej) {
            _this._fbRef.authWithOAuthPopup(_this._providerToString(provider), _this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthRedirect = function (provider, options) {
        var _this = this;
        var p = new Promise(function (res, rej) {
            _this._fbRef.authWithOAuthRedirect(_this._providerToString(provider), _this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    };
    FirebaseSdkAuthBackend.prototype.authWithOAuthToken = function (provider, credentialsObj, options) {
        var _this = this;
        var p = new Promise(function (res, rej) {
            var credentials = utils_1.isPresent(credentialsObj.token)
                ? credentialsObj.token
                : credentialsObj;
            _this._fbRef.authWithOAuthToken(_this._providerToString(provider), credentials, _this._handleFirebaseCb(res, rej, options), options);
        });
        return p;
    };
    FirebaseSdkAuthBackend.prototype._handleFirebaseCb = function (res, rej, options) {
        var _this = this;
        return function (err, auth) {
            if (err) {
                return rej(err);
            }
            else {
                if (!_this._webWorkerMode)
                    return res(auth_backend_1.authDataToAuthState(auth));
                else {
                    if (utils_1.isPresent(options) && utils_1.isPresent(options.remember)) {
                        auth.remember = options.remember;
                    }
                    return res(auth);
                }
            }
        };
    };
    FirebaseSdkAuthBackend.prototype._providerToString = function (provider) {
        switch (provider) {
            case auth_backend_1.AuthProviders.Github:
                return 'github';
            case auth_backend_1.AuthProviders.Twitter:
                return 'twitter';
            case auth_backend_1.AuthProviders.Facebook:
                return 'facebook';
            case auth_backend_1.AuthProviders.Google:
                return 'google';
            default:
                throw new Error("Unsupported firebase auth provider " + provider);
        }
    };
    FirebaseSdkAuthBackend = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(tokens_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, Object])
    ], FirebaseSdkAuthBackend);
    return FirebaseSdkAuthBackend;
})(auth_backend_1.AuthBackend);
exports.FirebaseSdkAuthBackend = FirebaseSdkAuthBackend;
//# sourceMappingURL=firebase_sdk_auth_backend.js.map