var core_1 = require('angular2/core');
var angularfire2_1 = require('./angularfire2');
var firebase_sdk_auth_backend_1 = require('./providers/firebase_sdk_auth_backend');
var tokens_1 = require('./tokens');
var auth_1 = require('./providers/web_workers/ui/auth');
exports.WORKER_RENDER_FIREBASE_PROVIDERS = [
    angularfire2_1.COMMON_PROVIDERS,
    core_1.provide(firebase_sdk_auth_backend_1.FirebaseSdkAuthBackend, {
        useFactory: function (ref) { return new firebase_sdk_auth_backend_1.FirebaseSdkAuthBackend(ref, true); },
        deps: [tokens_1.FirebaseRef]
    }),
    auth_1.MessageBasedFirebaseAuth
];
//# sourceMappingURL=angularfire2_worker_render.js.map