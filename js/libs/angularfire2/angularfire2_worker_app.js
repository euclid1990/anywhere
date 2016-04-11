var core_1 = require('angular2/core');
var angularfire2_1 = require('./angularfire2');
var auth_backend_1 = require('./providers/auth_backend');
var auth_1 = require('./providers/web_workers/worker/auth');
exports.WORKER_APP_FIREBASE_PROVIDERS = [
    angularfire2_1.COMMON_PROVIDERS,
    core_1.provide(auth_backend_1.AuthBackend, { useClass: auth_1.WebWorkerFirebaseAuth })
];
//# sourceMappingURL=angularfire2_worker_app.js.map