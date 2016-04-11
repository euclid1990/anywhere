var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('rxjs/Observable');
var FirebaseObjectObservable = (function (_super) {
    __extends(FirebaseObjectObservable, _super);
    function FirebaseObjectObservable(subscribe, _ref) {
        _super.call(this, subscribe);
        this._ref = _ref;
    }
    FirebaseObjectObservable.prototype.lift = function (operator) {
        var observable = new FirebaseObjectObservable();
        observable.source = this;
        observable.operator = operator;
        observable._ref = this._ref;
        return observable;
    };
    return FirebaseObjectObservable;
})(Observable_1.Observable);
exports.FirebaseObjectObservable = FirebaseObjectObservable;
//# sourceMappingURL=firebase_object_observable.js.map