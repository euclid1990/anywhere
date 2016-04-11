System.register(["angular2/core", 'angular2/platform/browser', './components/app.component', './services/storage.service', './services/database.service', 'angularfire2'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, browser_1, app_component_1, storage_service_1, database_service_1, angularfire2_1;
    var providers;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (storage_service_1_1) {
                storage_service_1 = storage_service_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            },
            function (angularfire2_1_1) {
                angularfire2_1 = angularfire2_1_1;
            }],
        execute: function() {
            providers = [
                storage_service_1.StorageService,
                database_service_1.DatabaseService,
                angularfire2_1.FIREBASE_PROVIDERS,
                angularfire2_1.defaultFirebase(database_service_1.DatabaseService.dbRef),
                angularfire2_1.AngularFire
            ];
            core_1.enableProdMode();
            browser_1.bootstrap(app_component_1.AppComponent, providers);
        }
    }
});
