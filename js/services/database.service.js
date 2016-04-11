System.register(['angular2/core', 'angularfire2'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, angularfire2_1;
    var DATABASE_REFERENCE, TABLE_NAMES, DatabaseService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angularfire2_1_1) {
                angularfire2_1 = angularfire2_1_1;
            }],
        execute: function() {
            DATABASE_REFERENCE = 'https://anywhere-app.firebaseio.com';
            TABLE_NAMES = ['users', 'messages'];
            DatabaseService = (function () {
                function DatabaseService(angularFire, firebaseRef) {
                    this.angularFire = angularFire;
                    this.firebaseRef = firebaseRef;
                    this.tables = Object.create(null);
                    this.refs = Object.create(null);
                    this.mapTable();
                    this.init();
                }
                DatabaseService.prototype.init = function () {
                    var ref = this.firebaseRef;
                    var _loop_1 = function(table) {
                        ref.child(table).once('value', function (snapshot) {
                            if (!snapshot.exists()) {
                                var struct = new Object;
                                struct[table] = {};
                                ref.child(table).set(struct);
                            }
                        });
                        this_1[table] = this_1.angularFire.list('/' + table);
                    };
                    var this_1 = this;
                    for (var table in this.tables) {
                        _loop_1(table);
                    }
                };
                DatabaseService.prototype.mapTable = function () {
                    var ref = this.firebaseRef;
                    for (var _i = 0, TABLE_NAMES_1 = TABLE_NAMES; _i < TABLE_NAMES_1.length; _i++) {
                        var name_1 = TABLE_NAMES_1[_i];
                        this.tables[name_1] = ({ name: name_1 });
                        this.refs[name_1] = ref.child("/" + name_1);
                    }
                };
                DatabaseService.prototype.fire = function () {
                    return this.angularFire;
                };
                DatabaseService.prototype.ref = function () {
                    return this.firebaseRef;
                };
                DatabaseService.prototype.getUsers = function () {
                    return this.users;
                };
                DatabaseService.prototype.observerUser = function (callback) {
                    return this.refs['users'].on('value', callback);
                };
                DatabaseService.prototype.findUser = function (key, callback) {
                    return this.refs['users'].child("/" + key).once('value', callback);
                };
                DatabaseService.prototype.saveUser = function (user) {
                    return this.users.add(user);
                };
                DatabaseService.prototype.updateUser = function (key, data, callback) {
                    return this.refs['users'].child("/" + key).update(data, callback);
                };
                DatabaseService.prototype.getMessages = function () {
                    return this.messages;
                };
                DatabaseService.prototype.saveMessage = function (message) {
                    return this.messages.add(message);
                };
                DatabaseService.prototype.deleteMessage = function (key) {
                    return this.messages.remove(key);
                };
                DatabaseService.prototype.clearMessages = function () {
                    return this.refs['messages'].remove();
                };
                DatabaseService.dbRef = DATABASE_REFERENCE;
                DatabaseService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(angularfire2_1.FirebaseRef)), 
                    __metadata('design:paramtypes', [angularfire2_1.AngularFire, Object])
                ], DatabaseService);
                return DatabaseService;
            }());
            exports_1("DatabaseService", DatabaseService);
        }
    }
});
