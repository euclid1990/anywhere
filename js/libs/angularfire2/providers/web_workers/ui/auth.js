var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var worker_render_1 = require('angular2/platform/worker_render');
var channels_1 = require('../shared/channels');
var firebase_sdk_auth_backend_1 = require('../../firebase_sdk_auth_backend');
var MessageBasedFirebaseAuth = (function () {
    function MessageBasedFirebaseAuth(_sdkBackend, _brokerFactory) {
        this._sdkBackend = _sdkBackend;
        this._brokerFactory = _brokerFactory;
    }
    MessageBasedFirebaseAuth.prototype.start = function () {
        var broker = this._brokerFactory.createMessageBroker(channels_1.AUTH_CHANNEL);
        broker.registerMethod('authAnonymously', [worker_render_1.PRIMITIVE], this._sdkBackend.authAnonymously.bind(this._sdkBackend), worker_render_1.PRIMITIVE);
        broker.registerMethod('authWithPassword', [worker_render_1.PRIMITIVE, worker_render_1.PRIMITIVE], this._sdkBackend.authWithPassword.bind(this._sdkBackend), worker_render_1.PRIMITIVE);
        broker.registerMethod('authWithOAuthPopup', [worker_render_1.PRIMITIVE, worker_render_1.PRIMITIVE], this._sdkBackend.authWithOAuthPopup.bind(this._sdkBackend), worker_render_1.PRIMITIVE);
        broker.registerMethod('authWithOAuthRedirect', [worker_render_1.PRIMITIVE, worker_render_1.PRIMITIVE], this._sdkBackend.authWithOAuthRedirect.bind(this._sdkBackend), worker_render_1.PRIMITIVE);
        broker.registerMethod('authWithOAuthToken', [worker_render_1.PRIMITIVE, worker_render_1.PRIMITIVE, worker_render_1.PRIMITIVE], this._sdkBackend.authWithOAuthToken.bind(this._sdkBackend), worker_render_1.PRIMITIVE);
        broker.registerMethod('getAuth', null, this._getAuth.bind(this), worker_render_1.PRIMITIVE);
        broker.registerMethod('unauth', null, this._sdkBackend.unauth.bind(this._sdkBackend));
    };
    MessageBasedFirebaseAuth.prototype._getAuth = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            res(_this._sdkBackend.getAuth());
        });
    };
    MessageBasedFirebaseAuth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [firebase_sdk_auth_backend_1.FirebaseSdkAuthBackend, worker_render_1.ServiceMessageBrokerFactory])
    ], MessageBasedFirebaseAuth);
    return MessageBasedFirebaseAuth;
})();
exports.MessageBasedFirebaseAuth = MessageBasedFirebaseAuth;
//# sourceMappingURL=auth.js.map