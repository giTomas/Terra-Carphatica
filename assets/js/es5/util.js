'use strict';

// utils
var getType = function getType(el) {
  return Object.prototype.toString.call(el).slice(8, -1);
};

var isObject = function isObject(elem) {
  return getType(elem) === 'Object';
};

var isFunction = function isFunction(elem) {
  return getType(elem) === "Function";
};

function forEachEl_2(els, fn) {
  var len = els.length;
  for (var i = 0; i < len; i++) {
    if (els[i]) {
      els[i].addEventListener('click', fn, false);
    }
  }
}

function forEachEl(els, fn) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = els[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;
      if (el) {
        el.addEventListener('click', fn, false);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function findData(arr, prop, data) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === data) {
      return arr[i];
    }
  }
}

// definitly in this case this is better, it's faster, more concise, not so complicated
// BEAWARE probably if array contains more identical properties it will return array
// traverse whole array callback is executed for every item in array
// IE not support
function findValue(_ref) {
  var arr = _ref.arr,
      _ref$prop = _ref.prop,
      prop = _ref$prop === undefined ? 'id' : _ref$prop,
      data = _ref.data;

  return arr.find(function (el, i) {
    return el[prop] === data;
  });
}

//NEAT!!!
// maps array -> make new array from properties
// indexing array of these properties
// use index to find object in array
// probably works in most browsers
function findValueByIndex(arr, prop, val) {
  return arr[arr.map(function (el) {
    return el[prop];
  }).indexOf(val)];
}

function findItem(arr, prop, val) {
  return arr.reduce(function (x, y) {
    return x[prop] === val ? x : y;
  });
}

//haluz ale je to dost DIRTY; Note comma operator!
function findValue2(arr, prop, data) {
  var result = null;
  arr.some(function (el, i) {
    return el[prop] === data ? (result = el, true) : false;
  });
  return result;
}

//function overloading

var dispatch = function dispatch() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = fns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var fn = _step2.value;

        var result = fn.apply(undefined, arguments);
        if (exists(result)) {
          return result;
        }
        // return result !== undefined ? result : undefined;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };
};
// find nevrati vysledok funkcie, ale iba funkciu samotnu, ktora splna podmienku , mozno by sa to dalo riesit data streamom!
// map find do the work!!
// interesting possiblity to do this with filter function returns array of results. Could by applicated to functions that works with same args
// rozdiel oproti function composition vyberie sa jedna funkcia, ktora sa pouzije
// stream 1) find 2) execute function ale tym padom bude funckia exec dvakrat, ale na druhej strane nemusia byt exec vsetky funckie ako pri map-filter
var dispatch_f = function dispatch_f() {
  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return [].concat(fns).map(function (fn) {
      return fn.apply(undefined, args);
    }).find(function (result) {
      return result !== undefined;
    });
  };
};

// 1) find 2) execute
// Could be refactored?
var dispatch_f2 = function dispatch_f2() {
  for (var _len4 = arguments.length, fns = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    fns[_key4] = arguments[_key4];
  }

  return function () {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return [].concat(fns).map(function (fn) {
      return fn.apply(undefined, args);
    }).find(function (result) {
      return result !== undefined;
    });
  };
};

function notExists(value) {
  return value === undefined;
}
function exists(value) {
  return value !== undefined;
}

//function composition
var compose = function compose() {
  for (var _len6 = arguments.length, funcs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    funcs[_key6] = arguments[_key6];
  }

  return function (value) {
    return funcs.reduce(function (v, fn) {
      return fn(v);
    }, value);
  };
};
var pipe = function pipe() {
  for (var _len7 = arguments.length, funcs = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    funcs[_key7] = arguments[_key7];
  }

  return function (value) {
    return funcs.reduce(function (v, fn) {
      return fn(v);
    }, value);
  };
};

//curry
function curry(fn) {
  for (var _len8 = arguments.length, args1 = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
    args1[_key8 - 1] = arguments[_key8];
  }

  return function () {
    for (var _len9 = arguments.length, args2 = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args2[_key9] = arguments[_key9];
    }

    return fn.apply(undefined, args1.concat(args2));
  };
}

//parial