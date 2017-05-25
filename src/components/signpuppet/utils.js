var utils = {
    each: function (obj, t) {
        var i;
        for (i in obj) {
            if (obj.hasOwnProperty(i) && t(i, obj[i]) === false) {
                return;
            }
        }
    },
    defaultTo: function (a, b) {
        if (a === undefined) {
            return b;
        }
        return a;
    },
    constructor: function (f, p) {
        if (typeof f !== 'function') {
            p = f;
            f = function () { };
        }
        f.prototype = p;
        return f;
    }
}