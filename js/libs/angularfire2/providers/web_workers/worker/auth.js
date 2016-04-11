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
var client_message_broker_1 = require('angular2/src/web_workers/shared/client_message_broker');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var channels_1 = require('../shared/channels');
var tokens_1 = require('../../../tokens');
var auth_backend_1 = require('../../auth_backend');
var utils_1 = require('../../../utils/utils');
var Firebase = require('firebase');
var WebWorkerFirebaseAuth = (function (_super) {
    __extends(WebWorkerFirebaseAuth, _super);
    function WebWorkerFirebaseAuth(_fbRef, brokerFactory, bus) {
        var _this = this;
        _super.call(this);
        this._fbRef = _fbRef;
        this._authMetadata = {};
        this._authCbs = [];
        this._gotAuth = false;
        this._messageBroker = brokerFactory.createMessageBroker(channels_1.AUTH_CHANNEL);
        var args = new client_message_broker_1.UiArguments('getAuth');
        this._messageBroker.runOnService(args, serializer_1.PRIMITIVE).then(function (authData) {
            _this._gotAuth = true;
            if (authData != null) {
                _this._handleAuthPromise(authData);
            }
        });
    }
    WebWorkerFirebaseAuth.prototype.onAuth = function (onComplete) {
        var _this = this;
        this._fbRef.onAuth(function (authData) {
            if (!_this._gotAuth)
                return false;
            if (utils_1.isPresent(authData) && utils_1.isPresent(_this._authMetadata[authData.token])) {
                authData = _this._authMetadata[authData.token];
            }
            onComplete(authData);
        });
    };
    WebWorkerFirebaseAuth.prototype.getAuth = function () {
        return this._fbRef.getAuth();
    };
    WebWorkerFirebaseAuth.prototype.authAnonymously = function (options) {
        var args = new client_message_broker_1.UiArguments('authAnonymously', [new client_message_broker_1.FnArg(options, serializer_1.PRIMITIVE)]);
        var uiAuthPromise = this._messageBroker.runOnService(args, serializer_1.PRIMITIVE);
        return this._doAuth(uiAuthPromise);
    };
    WebWorkerFirebaseAuth.prototype.authWithCustomToken = function (token, options) {
        var _this = this;
        return new Promise(function (res, rej) {
            _this._fbRef.authWithCustomToken(token, function (err, authData) {
                if (err)
                    return rej(err);
                else
                    return res(auth_backend_1.authDataToAuthState(authData));
            });
        });
    };
    WebWorkerFirebaseAuth.prototype.authWithPassword = function (credentials, options) {
        var args = new client_message_broker_1.UiArguments('authWithPassword', [new client_message_broker_1.FnArg(credentials, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(options, serializer_1.PRIMITIVE)]);
        var uiAuthPromise = this._messageBroker.runOnService(args, serializer_1.PRIMITIVE);
        return this._doAuth(uiAuthPromise);
    };
    WebWorkerFirebaseAuth.prototype.authWithOAuthPopup = function (provider, options) {
        var args = new client_message_broker_1.UiArguments('authWithOAuthPopup', [new client_message_broker_1.FnArg(provider, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(options, serializer_1.PRIMITIVE)]);
        var uiAuthPromise = this._messageBroker.runOnService(args, serializer_1.PRIMITIVE);
        return this._doAuth(uiAuthPromise);
    };
    WebWorkerFirebaseAuth.prototype.authWithOAuthRedirect = function (provider, options) {
        var args = new client_message_broker_1.UiArguments('authWithOAuthRedirect', [new client_message_broker_1.FnArg(provider, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(options, serializer_1.PRIMITIVE)]);
        var uiAuthPromise = this._messageBroker.runOnService(args, serializer_1.PRIMITIVE);
        return this._doAuth(uiAuthPromise);
    };
    WebWorkerFirebaseAuth.prototype.authWithOAuthToken = function (provider, credentialsObj, options) {
        var args = new client_message_broker_1.UiArguments('authWithOAuthToken', [new client_message_broker_1.FnArg(provider, serializer_1.PRIMITIVE),
            new client_message_broker_1.FnArg(credentialsObj, serializer_1.PRIMITIVE),
            new client_message_broker_1.FnArg(options, serializer_1.PRIMITIVE)]);
        var uiAuthPromise = this._messageBroker.runOnService(args, serializer_1.PRIMITIVE);
        return this._doAuth(uiAuthPromise);
    };
    WebWorkerFirebaseAuth.prototype.unauth = function () {
        var args = new client_message_broker_1.UiArguments('unauth');
        this._messageBroker.runOnService(args, null);
        this._fbRef.unauth();
    };
    WebWorkerFirebaseAuth.prototype._doAuth = function (promise) {
        var _this = this;
        return promise.then(function (data) { return _this._handleAuthPromise(data); });
    };
    WebWorkerFirebaseAuth.prototype._handleAuthPromise = function (authData) {
        var _this = this;
        this._authMetadata[authData.token] = authData;
        return new Promise(function (res, rej) {
            _this._fbRef.authWithCustomToken(authData.token, function (err, _) {
                if (err)
                    return rej(err);
                else
                    return res(auth_backend_1.authDataToAuthState(authData));
            }, { remember: authData.remember });
        });
    };
    WebWorkerFirebaseAuth = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(tokens_1.FirebaseRef)), 
        __metadata('design:paramtypes', [Firebase, client_message_broker_1.ClientMessageBrokerFactory, message_bus_1.MessageBus])
    ], WebWorkerFirebaseAuth);
    return WebWorkerFirebaseAuth;
})(auth_backend_1.AuthBackend);
exports.WebWorkerFirebaseAuth = WebWorkerFirebaseAuth;
//# sourceMappingURL=auth.js.map