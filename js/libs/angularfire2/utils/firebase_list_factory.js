var firebase_list_observable_1 = require('./firebase_list_observable');
var Firebase = require('firebase');
function FirebaseListFactory(absoluteUrl, _a) {
    var preserveSnapshot = (_a === void 0 ? {} : _a).preserveSnapshot;
    var ref = new Firebase(absoluteUrl);
    return new firebase_list_observable_1.FirebaseListObservable(function (obs) {
        var arr = [];
        var hasInitialLoad = false;
        ref.once('value', function (snap) {
            hasInitialLoad = true;
            obs.next(preserveSnapshot ? arr : arr.map(unwrapMapFn));
        });
        ref.on('child_added', function (child, prevKey) {
            arr = onChildAdded(arr, child, prevKey);
            if (hasInitialLoad) {
                obs.next(preserveSnapshot ? arr : arr.map(unwrapMapFn));
            }
        });
        ref.on('child_removed', function (child) {
            arr = onChildRemoved(arr, child);
            if (hasInitialLoad) {
                obs.next(preserveSnapshot ? arr : arr.map(unwrapMapFn));
            }
        });
        ref.on('child_changed', function (child, prevKey) {
            arr = onChildChanged(arr, child, prevKey);
            if (hasInitialLoad) {
                obs.next(preserveSnapshot ? arr : arr.map(unwrapMapFn));
            }
        });
        return function () { return ref.off(); };
    }, ref);
}
exports.FirebaseListFactory = FirebaseListFactory;
function unwrapMapFn(snapshot) {
    var unwrapped = snapshot.val();
    if ((/string|number|boolean/).test(typeof unwrapped)) {
        unwrapped = {
            $value: unwrapped
        };
    }
    unwrapped.$key = snapshot.key();
    return unwrapped;
}
exports.unwrapMapFn = unwrapMapFn;
function onChildAdded(arr, child, prevKey) {
    if (!arr.length) {
        return [child];
    }
    return arr.reduce(function (accumulator, curr, i) {
        if (!prevKey && i === 0) {
            accumulator.push(child);
        }
        accumulator.push(curr);
        if (prevKey && prevKey === curr.key()) {
            accumulator.push(child);
        }
        return accumulator;
    }, []);
}
exports.onChildAdded = onChildAdded;
function onChildChanged(arr, child, prevKey) {
    return arr.reduce(function (accumulator, val, i) {
        if (!prevKey && i == 0) {
            accumulator.push(child);
            accumulator.push(val);
        }
        else if (val.key() === prevKey) {
            accumulator.push(val);
            accumulator.push(child);
        }
        else if (val.key() !== child.key()) {
            accumulator.push(val);
        }
        return accumulator;
    }, []);
}
exports.onChildChanged = onChildChanged;
function onChildRemoved(arr, child) {
    return arr.filter(function (c) { return c.key() !== child.key(); });
}
exports.onChildRemoved = onChildRemoved;
function onChildUpdated(arr, child, prevKey) {
    return arr.map(function (v, i, arr) {
        if (!prevKey && !i) {
            return child;
        }
        else if (i > 0 && arr[i - 1].key() === prevKey) {
            return child;
        }
        else {
            return v;
        }
    });
}
exports.onChildUpdated = onChildUpdated;
//# sourceMappingURL=firebase_list_factory.js.map