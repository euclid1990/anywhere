var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = require('rxjs/Observable');
var FirebaseListObservable = (function (_super) {
    __extends(FirebaseListObservable, _super);
    function FirebaseListObservable(subscribe, _ref) {
        _super.call(this, subscribe);
        this._ref = _ref;
    }
    FirebaseListObservable.prototype.lift = function (operator) {
        var observable = new FirebaseListObservable();
        observable.source = this;
        observable.operator = operator;
        observable._ref = this._ref;
        return observable;
    };
    FirebaseListObservable.prototype.add = function (val) {
        if (!this._ref) {
            throw new Error('No ref specified for this Observable!');
        }
        return this._ref.push(val);
    };
    FirebaseListObservable.prototype.remove = function (item) {
        if (typeof item === 'string') {
            return this._ref.child(item).remove();
        }
        else if (item instanceof Firebase) {
            return item.remove();
        }
        else if (typeof item.key === 'function') {
            return item.ref().remove();
        }
        else if (typeof item.$key === 'string') {
            return this._ref.child(item.$key).remove();
        }
        throw new Error("FirebaseListObservable.remove requires a key, snapshot, reference, or unwrapped snapshot. Got: " + typeof item);
    };
    return FirebaseListObservable;
})(Observable_1.Observable);
exports.FirebaseListObservable = FirebaseListObservable;
//# sourceMappingURL=firebase_list_observable.js.map