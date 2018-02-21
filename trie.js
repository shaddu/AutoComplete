function wordToLtrsArr(w) {
    return w.split('')
}

function tail(arr) {
    return arr.slice(1)
}

function goTo(o, wp) {
    if (!wp.length) {
        return o
    }

    var firstLetter = wp[0];
    var point = o[firstLetter];

    return point ? goTo(point, tail(wp)) : {};
}

var endSym = Symbol.for('end')

var TrieProto = {
    insert(w) {
        var point = this.tree;
        wordToLtrsArr(w).forEach(function (e, i) {

            if (!point[e]) {
                point[e] = {};
            }
            point = point[e];
            if (w.length - 1 === i) {
                point[endSym] = true
            }
        });
    },
    autoComplete(wp) {
        var point = goTo(this.tree, wp);
        var stack = [];

        function reduceObjToArr(o, trace) {
            for (k in o) {
                if (o[k][endSym]) {
                    stack.push(trace + k)
                }
                reduceObjToArr(o[k], trace + k)
            }
        }
        reduceObjToArr(point, '')
        return stack.map(function (e) {
            return wp + e
        });
    }
};

var TrieDesc = {
    tree: {
        value: {},
        enumerable: true
    }
}

function createTrie() {
    return Object.create(TrieProto, TrieDesc);
}
